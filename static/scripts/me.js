/**
 * Author: Long Doan
 * Date: 10/2/12 12:52 AM
 */

jQuery(function ($) {
  var imgsrc = 'static/images/me/';

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
})