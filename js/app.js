$(document).ready(function(){
	// Device Event Listener
	document.addEventListener("deviceready", onDeviceReady, false);
});

$(document).on('pagebeforeshow', '[data-role="page"]', function(){       
    $.mobile.activePage.find('[data-role="panel"]').load("panel.html", function(){ 
        $(this).parent().trigger('pagecreate');
    });
});


$(document).on("pageinit", function() {
    $(".nav-menu li a").on("click", function(e) {
        $("#mypanelpedo").panel("close");
    });
});


function onDeviceReady(){
app.init();
	console.log('Device Ready...');
	getLocation();
	
	}
	
	'use strict'; //emcsascript strict mode

(function($) {
    // module for our app logic
    window.app = (function(){
        var lat; // latitude
        var lng; // longitude

        var forecastURL = 'https://api.forecast.io/forecast/';
        var APIKey= 'ca70e4a6b4a8d2196cb11407aca17c43';
        var pub = {};

        // initialization
        pub.init = function init(){
            lat = null;
            lng = null;
        };

        // device is ready
        pub.ready = function ready(){
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        };

        function geoSuccess(pos){
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;

            checkAPI();
        }

        function checkAPI(){
            // build our API url
            var url = forecastURL + APIKey + '/' + lat + ',' + lng;

            var data = {
                units : 'us'
            };

            $.ajax({
                url : url,
                type : 'GET',
                data : data,
                dataType : 'jsonp'
            }).done(function(result){
                console.log(result);
                // https://api.forecast.io/forecast/ca70e4a6b4a8d2196cb11407aca17c43/37.8267,-122.423
                var temp = Math.round(result.currently.temperature);

                var content = '<div class="page-header">' + 
							  '<h1>' + temp + '&deg;</h1>' +
                              '</div>'
                ;

                $('#today').find('.panel-body').html(content);
                $('#today').fadeIn();
            });
        }

        function geoError(pos){
            alert('We could not locate you');
        }

        return pub;
    }());

    $(document).ready(function(){
        app.init();

        // http://docs.phonegap.com/en/4.0.0/cordova_events_events.md.html#deviceready
        document.addEventListener("deviceready", app.ready, false);
    });

})(window.jQuery);


function getLocation(){
	console.log('Getting Users Location...');

	navigator.geolocation.getCurrentPosition(function(position){
		console.log(1111111111111111);
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var city = '';
		var state = '';
		var html = '';

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon,
			datatype: 'jsonp',
			success: function(response){
				city = response.results[0].address_components[2].long_name;
				state = response.results[0].address_components[4].short_name;

				html = '<h1>'+city+', '+state+'</h1>';

				$('#myLocation').html(html);
				
			}
		});
	}, function(err){
		console.warn('ERROR(' + err.code + '): ' + err.message);
	});
}	
