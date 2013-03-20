jQuery(function($) {
  $.get("/ascii/yes/files.txt", function(data) {
    var files = data.split("\n");
    files = fisherYates(files);

    $.get("/mp3/mp3s.txt", function(data) {
      var mp3s = data.split("\n");
      mp3s = fisherYates(mp3s);

      for (var i=0; i <= mp3s.length; i++) {
        var file = files.pop();

        if ( typeof file === undefined || !file) {
          i--;
          continue;
        }

        $.get("/ascii/yes/" + file, function(data) {
          var ascii = data;
          var mp3 = mp3s.pop();

          if (typeof mp3 === undefined || !mp3) {
            return;
          }

          var $div = $('<div class="ascii" />')
            .html('<pre>' + ascii + '</pre>')
            .css({
              'color' : rand_hex_color(),
              'background-color' : rand_hex_color(),
          }).appendTo($('#content'));

          var song = mp3.replace(/\.mp3$/, '');
          var ogg = mp3.replace(/\.mp3$/, '\.ogg');
          song = song.replace(/_/g, ' ');
          // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
          song = song.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});

          var $mp3 = $('<div class="song" />')
            .html('<p><a style="color: '+ rand_hex_color()+';" href="mp3/'+ mp3 + '">' + song + '</a></p>' 
              + '<audio controls="controls" preload="metadata"><source src="mp3/'+ ogg +'" /><source src="mp3/'+ mp3 +'" /></audio>')
            .css({
              'z-index' : 10,
              'text-align' : 'center',
            }).appendTo($div);

          $div.hover(function() {
            $(this).everyTime(100, function() {
              $(this).css({
                'background-color' : rand_hex_color(),
                'color' : rand_hex_color(),
              });
            });
          }, function() {
            $(this).stopTime();
          });
        });
      }
    });
  });

  //$('body').everyTime(100, function() {
    $('body').css('background-color', rand_hex_color());
  //});
  $('body').css('opacity', '0.4');
  $('#content').masonry({
    itemSelector : '.ascii',
    //columnWidth : 50 
  });

}); 

function rand(i) {
  return Math.floor(Math.random()*i);
}

function rand_hex_color() {
  // http://paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+ ('000000' + rand(16777215).toString(16)).slice(-6);
}

function fisherYates ( arr ) {
  // http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
  var i = arr.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = arr[i];
     tempj = arr[j];
     arr[i] = tempj;
     arr[j] = tempi;
   }
  return arr;
}
