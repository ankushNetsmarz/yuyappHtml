


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
        url: webservicesiteurl + "users/GetProfile",
        data: userData,
        success: function (data) {
          
            console.log(data);

           // var PicUrl = webservicesiteurl + data.ResponseData.PicUrl;
            var PicUrl;
            var anonymousPassword = data.ResponseData.AnonymousUserPassword;
          
            if(anonymousPassword == "" || anonymousPassword == null )
            	{
            	 localStorage.setItem("anonymousPassword", "notset");
            	}
            else{
                       	
            localStorage.setItem("anonymousPassword", anonymousPassword);
            	}
            
            
            
            var AnonymousUserId = data.ResponseData.AnonymousUserId;
            
            if(AnonymousUserId == "" || AnonymousUserId == null )
        	{
        	 localStorage.setItem("AnonymousUserId", "notset");
        	}
          else{
                   	
             localStorage.setItem("AnonymousUserId", AnonymousUserId);
        	}
            
            
            if (data.ResponseData.PicUrl == "" || data.ResponseData.PicUrl == null) {
                PicUrl = "images/no-pic-white.png";
            } else {

               PicUrl = webservicesiteurl + data.ResponseData.PicUrl;
               localStorage.setItem("ProfilePicUrl", PicUrl+"?v="+(new Date().getTime()));
             
            }

           
            var Gender = data.ResponseData.Gender;
          
       if(Gender=="M")
    	   {
    	   Gender= "Male";
    	   }
       else
    	   {
    	   Gender="Female";
    	   }
      
       $("#seeStatus").text(data.ResponseData.Post);
       $("#editUserName").val(data.ResponseData.UserName);
     
       $("#editLastname").val(data.ResponseData.LastName);
       $("#editFirstname").val(data.ResponseData.FirstName);
       $("#selector").val(Gender);
    
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

