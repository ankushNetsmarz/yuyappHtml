
var userId= localStorage.getItem("userId");
//upload profile picture
function AddProfilePicture(imageURL) {
	//checkConnection();
    var inputdata = {
        "fileInBase64Format":imageURL,
        "userid": userId,
        "extension": "png" //exension of the feed
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: webservicesiteurl + "Users/addprofilepic",
        //contentType: false,
        //processData: false,
        data: inputdata,
        success: function (results) {
            console.log(results);
            window.plugins.toast.show('Profile Updated!', 'long', 'center', function (a) { }, function (b) { });
            
        },
        error: function (xhr) {
        	checkConnection();
        	 hideLoader();
             // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}
