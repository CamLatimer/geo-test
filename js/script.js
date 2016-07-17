var pulse

getLocation();

// get user's location
function getLocation() {
  // makes elipsis blink - ux tweak to let the user know something is happening
  pulse = setInterval(elipsisPulse, 300);
  // check to see if browser can even use geolocation api
  if(navigator.geolocation){
    var options = {
      maximumAge: 0
    }
    // if browser can use geolocation, get the user's coordinates automatically or through a form
    navigator.geolocation.getCurrentPosition(grabCoords, handleError, options);
  }
  else{
    console.log('browser not equipped for geolocation...')
  }
}

// use geolcation api to get user's coordinates
function grabCoords(position) {
    var usrLat = position.coords.latitude;
    var usrLng = position.coords.longitude;
    alert('user latitude: ' + usrLat + '\nuser longitude: ' + usrLng)
}

// if user doesn't have geolaction turned or, declines to show location, or an error occurs, handle biz
function handleError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
          // stops blinking elipses
            clearInterval(pulse);
          // show a form for user to enter location
            $('.location-form').show();
          // use automplete to get user's lat, lng coords
            getUsrInput();
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert ("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

// google autocomplete will get user's longitutde and latitude
function getUsrInput(){
  // input box that gets address
  var usrInput = document.getElementById('geo-input')
  // tells autocomplete to bring back geocode address only and not businesses, etc
  var options = {
    types: ['geocode']
  }
  // initialize autocomplete object
  var autocomplete = new google.maps.places.Autocomplete(usrInput, options);

  // get lat, long from autocomplte result on click / submit
  $('input[type="button"]').click(function(){
    var place = autocomplete.getPlace();
    var usrLat = place.geometry.location.lat()
    var usrLng = place.geometry.location.lng();
    alert('user lat: ' + usrLat + '\nuser lng: ' + usrLng);
  })
}

// makes elipsis blink - ux tweak to let the user know something is happening
function elipsisPulse(){
  $('.elipsis').toggle();
}
