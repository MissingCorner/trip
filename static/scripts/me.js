/**
 * Author: Long Doan
 * Date: 10/2/12 12:52 AM
 */

jQuery(function ($) {
  var imgsrc = 'static/images/me/';
  var monstered = false;
  var pipe = parseInt($('.pipe-wrapper .value').text(), 10);
  pipe = pipe <= 100 ? pipe : 100;

  if (pipe < 1) {
    pipe = 0;
    $('.pipe-wrapper .pipe-water').hide();
  } else {
    $('.pipe-wrapper .pipe-water').show().css({height: pipe + 10});
  }
  $('.pipe-wrapper .pointer').css({bottom: pipe + 35});
  $('.pipe-wrapper .value').css({bottom: pipe + 45});

  $('.stats .toggle').click(function (e) {
    if (!monstered) {
      monsterOn();
    } else {
      monsterOff();
    }
  })

  $('.stats .mask').on('click', function (e) {
    monsterOff();
  })

  $('.stats input').knob({
//    readOnly: true,
    width: 80,
    height: 80,
    thickness: .2,
    bgColor: 'white',
    displayInput: false,
    draw: function () {
      if (this.$.val() != 100) {
        var $img = this.$.parent().siblings('.value').html(this.$.val()).siblings('img');
        $img.attr('src', imgsrc + $img.attr('alt') + '.png').parent().removeClass('max');
        this.o.fgColor = '#079fda';
      } else {
        var $img = this.$.parent().siblings('.value').html('MAX').siblings('img');
        $img.attr('src', imgsrc + $img.attr('alt') + '-max.png').parent().addClass('max');
        this.o.fgColor = '#9bca23';
      }
    }
  });

  function monsterOn() {
    monstered = true;
    $('.stats .mask').show();
    $('.stats').animate({
      left:$('.monster').width()
    })
  }

  function monsterOff() {
    monstered = false;
    $('.stats .mask').hide();
    $('.stats').animate({
      left:0
    })
  }
})