
$("#loginButton").on("click", function () {

    var userLoginEmailId = $("#userLoginEmailId").val();
    var loginPassword = $("#userLoginPassword").val();

    if(userLoginEmailId == '' ) 
        
    {
    	  function alertDismissed() {

          }

          navigator.notification.alert(
			    'Email cannot be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',            // title
			    'OK'                  // buttonName
			);
    }
    
    else if (loginPassword == '' )
    {
    	  function alertDismissed() {

          }

          navigator.notification.alert(
			    'Password cannot be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',           // title
			    'OK'                  // buttonName
			);
    }
  
    else
        
    {
    	 SignIn(userLoginEmailId, loginPassword);
    	
    }
    
    
});



function SignIn(userLoginEmailId, loginPassword) {
	// checkConnection();
    var userData = {

        email: userLoginEmailId,
        password: loginPassword
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: webservicesiteurl + "Users/login",
        data: userData,
        success: function (data) {

            console.log(data);

            if (data.ResponseData[0].UserID != 0)
            {
                var userId = data.ResponseData[0].UserId;
              
                localStorage.setItem("userId", userId);
                localStorage.setItem("LoginName", userLoginEmailId);
                localStorage.setItem("loginPassword", loginPassword);
                window.location.replace("home.html");
            }
            else {
            	   window.plugins.toast.show('Wrong user!', 'long', 'center', function (a) { }, function (b) { });
                   
            }
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
