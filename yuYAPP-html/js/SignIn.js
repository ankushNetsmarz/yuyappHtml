
$("#loginButton").on("click", function () {

    var userLoginEmailId = $("#userLoginEmailId").val();
    var loginPassword = $("#userLoginPassword").val();

    if(userLoginEmailId == '' ) 
        
    {
    	  function alertDismissed() {

          }

          navigator.notification.alert(
			    'Username cant be empty!',  // message
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
			    'Password cant be empty!',  // message
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

    var userData = {

        email: userLoginEmailId,
        password: loginPassword
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: mainUrl + "login",
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
                alert("wrong user");
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}
