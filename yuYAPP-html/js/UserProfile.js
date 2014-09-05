


  var GetProfilePicture = localStorage.getItem("ProfilePicUrl");
            var profilePicture = $("#profilePicture");
            
            var profile = $("#profile");
           var mainProfile= $("#mainProfile");
            profile.prop('src', GetProfilePicture);
            mainProfile.prop('src', GetProfilePicture);
            profilePicture.prop('src', GetProfilePicture);
            
            

$("#SeeProfile").on("click", function () {
    GetUserProfile();
    $(".ctgry-list-main").css("display", "none");
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#see_profile").css("display", "block");
    $(".add-frnd").css("display", "none");
    $("#edit_profile").css("display", "none");
    $(".top_heading").text("USER-PROFILE");
    localStorage.setItem("MenuFlag", "up");

});
var userId = localStorage.getItem("userId");
function GetUserProfile() {
	//checkConnection();
    var userData = {
        userId: userId
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/users/GetProfile",
        url: "http://174.141.233.6/YuY/users/GetProfile",
        data: userData,
        success: function (data) {
          
            console.log(data);

            var PicUrl = "http://174.141.233.6/YuY/" + data.ResponseData.PicUrl;
            localStorage.setItem("ProfilePicUrl", PicUrl);
          var Gender= data.ResponseData.Gender;
       
        
            $("#seeStatus").text(data.ResponseData.Post);
            $("#editUserName").val(data.ResponseData.UserName);
          
            $("#editLastname").val(data.ResponseData.LastName);
            $("#editFirstname").val(data.ResponseData.FirstName);
            $("#editGender").val(Gender);
         
            $("#editDOB").val(data.ResponseData.DOB);


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

