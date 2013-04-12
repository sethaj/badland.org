var application_root = __dirname,
  express = require( 'express' ),
  path = require( 'path' ),
  mongoose = require( 'mongoose' ),
  nconf = require('nconf');
    
var app = express();

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( application_root, 'public') ) );
  // Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

});

nconf.use('file', { file: './config.json' });
var user      = nconf.get('mongo:username');
var pass      = nconf.get('mongo:password');
var database  = nconf.get('mongo:database');
var host      = nconf.get('mongo:hostname');
var dsn = 'mongodb://' + user + ':' + pass + '@' + host + '/' + database;

mongoose.connect(dsn, function(err) {
  if (err) throw err;
});

var asciiSchema = mongoose.Schema({
  ascii: String
});
var Ascii = mongoose.model('ascii_images', asciiSchema );

var songSchema = mongoose.Schema({
  file: String,
  song: String,
  score: Number 
});
var Song = mongoose.model('songs', songSchema);


app.get('/', function(req, res) {
  var badlands = []
  Song.find({}).sort({score: -1}).execFind(function(err, songs) {
    i=0;
    songs.forEach(function(song) {   // TODO: forEach is blocking
      Ascii.count({}, function (err, count) {
        // Not recomended: http://stackoverflow.com/a/2824166
        Ascii.findOne().limit(-1).skip(Math.floor(Math.random()*count)).exec(function(err, ascii) {
          i++;
          badlands.push({
            id:     song['_id'],
            file:   song['file'],
            ogg:    song['file'].replace(/\.mp3$/, ".ogg"),
            song:   song['song'],
            ascii:  ascii['ascii']
          });
          if (i==153) { // 153 songs
            res.render('index.jade', { b: badlands });
          }
        });
      });
    });
  });
});

var port = 8081;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
