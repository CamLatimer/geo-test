


getLocation();

// get user's location
function getLocation() {
  // check to see if browser can even use geolocation api
  if(navigator.geolocation){
    var options = {
      maximumAge: 0
    }
    // if browser can use geolocation, get the user's coordinates automatically
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
    console.log('user latitude: ' + usrLat + '\nuser longitude: ' + usrLng)
}

// if user doesn't have geolaction turned or, declines to show location, or an error occurs, handle biz
function handleError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
          // show a form for user to enter location
            $('form').show();
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
