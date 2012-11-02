/**
 * Author: Long Doan
 * Date: 11/2/12 2:18 PM
 */

jQuery(function ($) {
  $('#scroll').css('height', ($(window).height() - $(header).height() - $(footer).height()) + 'px');

  $('.items').on('click', '.item', function (e) {
    $('#map').fadeOut('fast', function () {
      $('#details').fadeIn('fast');
    })
  })

  $('#details').on('click', '.back', function (e) {
    $('#details').fadeOut('fast', function () {
      $('#map').fadeIn('fast');
    })
  })

  var map;

  function initialize() {
    var mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        new google.maps.Circle({
          strokeColor: '#4ab6de',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#d3e6e8',
          fillOpacity: 0.35,
          map: map,
          center: pos,
          radius: 300
        });

        new google.maps.Marker({
          position: pos,
          map: map,
//          shadow: shadow,
          icon: new google.maps.MarkerImage('/static/images/marker-current.png', new google.maps.Size(45, 45), new google.maps.Point(0,0), new google.maps.Point(22, 22)),
          shape: {
            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
            type: 'poly'
          },
          title: 'Current',
          zIndex: 1
        });

//        new google.maps.Marker({
//          position: new google.maps.LatLng(position.coords.latitude + 10, position.coords.longitude + 10),
//          map: map,
////          shadow: shadow,
//          icon: new google.maps.MarkerImage('/static/images/marker-green.png', new google.maps.Size(45, 45), new google.maps.Point(0,0), new google.maps.Point(0, 32)),
//          shape: {
//            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
//            type: 'poly'
//          },
//          title: 'Bar',
//          zIndex: 1
//        });
//
//        new google.maps.Marker({
//          position: new google.maps.LatLng(position.coords.latitude + 10, position.coords.longitude - 10),
//          map: map,
////          shadow: shadow,
//          icon: new google.maps.MarkerImage('/static/images/marker-blue.png', new google.maps.Size(45, 45), new google.maps.Point(0,0), new google.maps.Point(0, 32)),
//          shape: {
//            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
//            type: 'poly'
//          },
//          title: 'Restaurant',
//          zIndex: 1
//        });
//
//        new google.maps.Marker({
//          position: new google.maps.LatLng(position.coords.latitude - 10, position.coords.longitude - 10),
//          map: map,
////          shadow: shadow,
//          icon: new google.maps.MarkerImage('/static/images/marker-pink.png', new google.maps.Size(45, 45), new google.maps.Point(0,0), new google.maps.Point(0, 32)),
//          shape: {
//            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
//            type: 'poly'
//          },
//          title: 'Pub',
//          zIndex: 1
//        });

        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }

  google.maps.event.addDomListener(window, 'load', initialize);
})