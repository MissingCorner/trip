(function($){
  $(document).ready(function(){
    var lastX;
    var lastY;

    function isGhostClick(e){
      var result = (lastX && lastY && lastX === e.eventX && lastY === e.eventY);
      lastX = e.eventX;
      lastY = e.eventY;
      return result;
    }

    function removeAllCactive(){
      $('.cactive').removeClass('cactive');
    }

    $('#add-button').bind('click', function(e){
      console.log('add button');
      if(!isGhostClick(e)){
        if($(this).hasClass('cactive')) {
          removeAllCactive();
        }else{
          $(this).addClass('cactive');
          $('#magic-container .magic-widget').addClass('cactive');
        }
      }
      return false;
    });

    $('.magic-content-wrapper').bind('click', function(e){
      if(!isGhostClick(e)){
        $('.magic-content-wrapper').removeClass('cactive');
        $(this).addClass('cactive');
      }

      return false;
    });

    $('body').bind('click', function(e){
      console.log('body');
      if(!isGhostClick(e)){
        removeAllCactive();
      }
    });

  });
})(jQuery);