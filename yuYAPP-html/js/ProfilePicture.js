
var userId= localStorage.getItem("userId");
//upload profile picture
function AddProfilePicture(imageURL) {
	
    var inputdata = {
        "fileInBase64Format":imageURL,
        "userid": userId,
        "extension": "png" //exension of the feed
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
       url: "http://174.141.233.6/YuY/Users/addprofilepic",
        //contentType: false,
        //processData: false,
        data: inputdata,
        success: function (results) {
            console.log(results);
            window.plugins.toast.show('Profile Updated!', 'long', 'center', function (a) { }, function (b) { });
            
        }
    }).done(function () {
        hideLoader();
    });
}
