$(document).ready(function() {
	var width = $(window).width();
	
	$("#openMenu").click(function(e) {
		e.preventDefault();
		$("#menu").toggleClass("active")
		$(".burger").toggleClass("clicked")
	})

	$('.port-select').select2({
		minimumResultsForSearch: -1
	});
	$('.question-select').select2({
		minimumResultsForSearch: -1
	});
	$('.buy-item__select').select2({
		minimumResultsForSearch: -1
	});






	var mapCenter = [55.09950166, 37.44442642];

	function createMap() {

	    var opts = {
	        center: {
	            lat: 55.09910166,
	            lng: mapCenter[1],
	        },
	        zoom: 16,
	        styles: [
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.icon",
			    "stylers": [
			      {
			        "visibility": "off"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#bdbdbd"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#ffffff"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#dadada"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.line",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.station",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#c9c9c9"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  }
			],
	        maxZoom: 20,
	        minZoom: 0,
	        mapTypeId: 'roadmap',
	    };


	    opts.clickableIcons = true;
	    opts.disableDoubleClickZoom = false;
	    opts.draggable = true;
	    opts.keyboardShortcuts = true;
	    opts.scrollwheel = false;



	    var setControlOptions = function(key, enabled, position, style, mapTypeIds){
	        opts[key + 'Control'] = enabled;
	        opts[key + 'ControlOptions'] = {
	            position: google.maps.ControlPosition[position],
	            style: google.maps.MapTypeControlStyle[style],
	            mapTypeIds: mapTypeIds
	        };
	    };


	    setControlOptions('fullscreen',false,'DEFAULT','',null);
	    setControlOptions('mapType',false,'DEFAULT','DEFAULT',["roadmap","satellite","terrain"]);
	    setControlOptions('rotate',false,'DEFAULT','',null);
	    setControlOptions('scale',true,'','',null);
	    setControlOptions('streetView',false,'DEFAULT','',null);
	    setControlOptions('zoom',true,'DEFAULT','',null);


	    var map = new google.maps.Map(document.getElementById('map'), opts);


	    (function(){
	        var markerOptions = {
	            map: map,
	            position: {
	                lat: mapCenter[0],
	                lng: mapCenter[1],
	            }
	        };

	        markerOptions.icon = {
	            url: 'img/geo.png',
	            scaledSize: new google.maps.Size(
	                70, 70),
	            size: new google.maps.Size(
	                70, 70),
	            anchor: new google.maps.Point(
	                35, -10)
	        };
	        markerOptions.options = {
	            optimized: true,
	        };

	        var marker = new google.maps.Marker(markerOptions);


	    })();


	}

	if ($("#map").length) {
		createMap()
	}
	
});

