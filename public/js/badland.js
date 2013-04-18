jQuery(function($) {
  $('.ascii').each(function(index) {
    $(this).css({
      'color' : rand_hex_color(),
      'background-color' : rand_hex_color(),
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
      $(this).css({
        'background-color' : rand_hex_color(),
        'color' : rand_hex_color(),
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
