/**
 * Author: Long Doan
 * Date: 10/2/12 12:52 AM
 */

jQuery(function ($) {
  $('.stats input').knob({
//    readOnly: true,
    width: 80,
    height: 80,
    bgColor: 'white',
    displayInput: false,
    draw: function (e) {
      if (this.$.val() != 100) {
        this.$.parent().siblings('.value').html(this.$.val()).parent().removeClass('max');
        this.o.fgColor = '#079fda';
      } else {
        this.$.parent().siblings('.value').html('MAX').parent().addClass('max');
        this.o.fgColor = '#9bca23';
      }
    }
  });
})