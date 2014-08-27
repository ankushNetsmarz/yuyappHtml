function initialize() {
    if (navigator.geolocation) {

        //Use HTML5 Geolocation API To Get Current Position
        navigator.geolocation.getCurrentPosition(function (position) {

            //Get Latitude From Geolocation API
            latitude = position.coords.latitude;

            //Get Longitude From Geolocation API
            longitude = position.coords.longitude;

            //Define New Google Map With Lat / Lon
            coords = new google.maps.LatLng(latitude, longitude);
            // setlocation(
            var mapOptions = {
                zoom: 16,
                center: coords
            }

            localStorage.setItem("latitude", latitude);
            localStorage.setItem("longitude", longitude);
            var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);
            marker = new google.maps.Marker({
                position: coords,
                map: map
            });
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        });
    }
}



//set the location of the user
function setLocation() {
    var inputdata = {
        "UserID": 4,
        "latitude": 30.73659,
        "longitude": 76.79689
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:6269/Users/setGeoLocation",
        // url: "http://174.141.233.6/YuY/User/setGeoLocation",
        data: inputdata,
        dataType: "json",

        success: function (data) {
            debugger;
            console.log(data);
            //console.log(data.ResponseData.length);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}


