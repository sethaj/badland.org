jQuery(function($) {
  $('.ascii').each(function(index) {
    var txt = rand_hex_color();
    var bg  = rand_hex_color();
    $(this).css({
      'color' : txt,
      'background-color' : bg,
    });
    $(this).children('.score').css({
      'background-color' : txt,
      'color': bg,
    });
  });

  $('.song').css({
    'z-index' : 10,
    'text-align' : 'center',
  });
  $('.song p a').each(function(index) {
    $(this).css({ 'color': rand_hex_color() });
  });

  $('.ascii').hover(function() {
    $(this).everyTime(100, function() {
      var txt = rand_hex_color();
      var bg  = rand_hex_color();
      $(this).css({
        'background-color' : bg,
        'color' : txt,
      });
      $(this).children('.score').css({
        'background-color' : txt,
        'color': bg,
      });
    });
  }, function() {
    $(this).stopTime();
  });

  $('body').css('background-color', rand_hex_color());
  $('body').css('opacity', '0.4');
  $('#content').masonry({
    itemSelector : '.ascii',
    //columnWidth : 50 
  });

  $('.score p').click(function() {
    var id = this.id;
    $.get('update/'+id, function(result) {
      $('#'+id).text('+ ' + result.score);
    });
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
