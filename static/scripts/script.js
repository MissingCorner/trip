(function($){
  var touch = {}, touchTimeout;

  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode;
  }

  function swipeDirection(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
    if (xDelta >= yDelta) {
      return (x1 - x2 > 0 ? 'Left' : 'Right');
    } else {
      return (y1 - y2 > 0 ? 'Up' : 'Down');
    }
  }

  $(document).ready(function(){
    $(document.body).bind('touchstart', function(e){
      var now = Date.now(), delta = now - (touch.last || now);
      touch.target = parentIfText(e.originalEvent.touches[0].target);
      touchTimeout && clearTimeout(touchTimeout);
      touch.x1 = e.originalEvent.touches[0].pageX;
      touch.y1 = e.originalEvent.touches[0].pageY;
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
      touch.last = now;
    }).bind('touchmove', function(e){
      touch.x2 = e.originalEvent.touches[0].pageX;
      touch.y2 = e.originalEvent.touches[0].pageY;
    }).bind('touchend', function(e){
      if (touch.isDoubleTap) {
        $(touch.target).trigger('doubleTap');
        touch = {};
      } else if (touch.x2 > 0 || touch.y2 > 0) {
        (Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30)  &&
          $(touch.target).trigger('swipe') &&
          $(touch.target).trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
        touch.x1 = touch.x2 = touch.y1 = touch.y2 = touch.last = 0;
      } else if ('last' in touch) {
        touchTimeout = setTimeout(function(){
          touchTimeout = null;
          $(touch.target).trigger('tap')
          touch = {};
        }, 250);
      }
    }).bind('touchcancel', function(){ touch = {} });
  });

  ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  });
})(jQuery);

(function($){

  // var requestAnimationFrame = (function(){
  //   return  window.requestAnimationFrame ||
  //     window.webkitRequestAnimationFrame ||
  //     window.mozRequestAnimationFrame    ||
  //     window.oRequestAnimationFrame      ||
  //     window.msRequestAnimationFrame     ||
  //     function( callback ){
  //       window.setTimeout(callback, 1000 / 60);
  //     };
  // })();

  // (function(){
  //   var stats = new Stats();
  //   stats.setMode(0); // 0: fps, 1: ms

  //   // Align top-left
  //   stats.domElement.style.position = 'absolute';
  //   stats.domElement.style.left = '0px';
  //   stats.domElement.style.top = '0px';

  //   document.body.appendChild( stats.domElement );

  //   requestAnimationFrame(function f() {
  //     stats.end();
  //     stats.begin();
  //     requestAnimationFrame(f);
  //   });
  // })();

  $(document).ready(function(){
    var lastX;
    var lastY;
    var lastEvent;

    function isGhostClick(e){
      if(window.ontouchstart){
        var touch = e.originalEvent.changedTouches[0];
        var result = (lastX && lastY && touch && lastX === touch.clientX && lastY === touch.clientY);
        lastX = touch.clientX;
        lastY = touch.clientY;
        return result;
      }else{
        return false;
      }
    }

    function removeAllCactive(){
      $('.cactive').removeClass('cactive');
      $('#magic-container').hide();
    }

    $('#add-button').bind('tap', function(e){
      var $this = $(this);
      if(!isGhostClick(e)){
        if($this.hasClass('cactive')) {
          removeAllCactive();
        }else{
          $('#magic-container').show();
          setTimeout(function(){
            $this.addClass('cactive');
            $('#magic-container .magic-widget').addClass('cactive');
          }, 0);
        }
      }

      return false;
    });

    $('.magic-content-wrapper').bind('tap', function(e){
      if(!isGhostClick(e)){
        $('.magic-content-wrapper').removeClass('cactive');
        $(this).addClass('cactive');
      }

      return false;
    });

    $('body').bind('tap', function(e){
      if(!isGhostClick(e)){
        removeAllCactive();
      }
    });

    var colors = [
      '8bd3ae','8bd3cb','8bd3df','8bd3ed','90d0ee',
      '9bcbee','a7c6ee','babeee','d9adeb','e9a1df',
      'f58ac5','f57eb5','f26593','e84a6c','de3045',
      'da2838','da2838','da2838','ffce0a','ffc30a',
      'ffb509','ffa808','ff9908','ff8607','ff7005',
      'ff5f04','ff4f03','f83a00','ee2b00','e52000'
    ];

    var rad2deg = 180/Math.PI;
    var deg = 0;
    var bars = $('#bars');

    for(var i=0;i<colors.length;i++){

      deg = i*12 - 36;

      // Create the colorbars

      $('<div class="colorBar">').css({
        backgroundColor: '#'+colors[i],
        transform:'rotate('+deg+'deg)',
        top: -Math.sin(deg/rad2deg)*90+90,
        left: Math.cos((180 - deg)/rad2deg)*90+90
      }).appendTo(bars);
    }

    var colorBars = bars.find('.colorBar');
    var numBars = 0, lastNum = -1;

    $('#control').knobKnob({
      snap : 0,
      value: 120,
      max: 210,
      turn : function(ratio){
        numBars = Math.round(colorBars.length*ratio) + 1;

        // Update the dom only when the number of active bars
        // changes, instead of on every move

        if(numBars == lastNum){
          return false;
        }
        lastNum = numBars;

        colorBars.removeClass('active').slice(0, numBars).addClass('active');
      }
    });

    $('#toggles a').on('touchstart', function(e){
      e.preventDefault();

      $(this).toggleClass('active');
    });

    $('#go').on('touchstart', function(e){
      e.preventDefault();

      $(this).addClass('selected');
    }).on('touchend', function(e){
      e.preventDefault();

      $(this).removeClass('selected');
    });

    $('#go').on('mousedown',function(e){
      e.preventDefault();

      $(this).addClass('selected');
    }).on('mouseup',function(e){
      e.preventDefault();

      $(this).removeClass('selected');
    });


    $('#toggles a').click(function(e){
      e.preventDefault();

      $(this).toggleClass('active');
    });

    $('#open-location').on('click touchstart', function(e){
      e.preventDefault();

      $('#timeandplace .location').css('left', 0);
    });

    $('.location .button').on('click touchstart', function(e){
      e.preventDefault();

      $('#timeandplace .location').css('left', '-100%');
    });

    $('#open-time').on('click touchstart', function(e){
      e.preventDefault();

      $('#timeandplace .time').css('left', 0);
    });

    $('.time .button').on('click touchstart', function(e){
      e.preventDefault();

      $('#timeandplace .time').css('left', '100%');
    });

  });
})(jQuery);

(function($){
  // if (!('ontouchend' in window)) {
  //     $(document).delegate('body', 'click', function(e) {
  //         $(e.target).trigger('tap');
  //     });
  // }

  $(document).ready(function(){
    $('#agenda .loc-list').on('swipeRight', 'li.active', function(){
      var $this = $(this);
      $this.removeClass('active');
      $this.parent().find('li.ready').removeClass('ready').addClass('active');
      console.log('blah');
    });

    $('.loc-list').iosSlider({
      elasticPullResistance : 0.3,
      snapToChildren : true,
      responsiveSlides : false,
      onSlideChange : function(options){
        var slideNumber = options.currentSlideNumber;
        $('#agenda .tb-left > img').removeClass('active');
        $('#agenda .tb-left > img:eq(' + slideNumber + ')').addClass('active');
      }
    });
  });
})(jQuery);

