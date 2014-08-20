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


