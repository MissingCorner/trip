/**
 * Author: Long Doan
 * Date: 10/2/12 12:52 AM
 */

jQuery(function ($) {
  $('.stats input').knob({
    width: 80,
    height: 80,
    fgColor: '#079fda',
    bgColor: 'white',
    displayInput: false,
    draw: function (e) {
      this.$.parent().siblings('.value').html(this.$.val());
//      console.log(this.$.parent().siblings('.value'));
    }
  });
})