
$('#SignUpEmail').blur(function () {

    if ($(this).val() == "")
    {

    }
    else
    {
        ValidateEmail();
    }
});
$("#SignUpDOB").on("click", function () {
	var date;
    var options = {    		
  	date: new Date(),
    mode: 'date',
   
    	 };			
       datePicker.show(options, function(date){
   	  //  alert("date result " + date);  
    	 
   		 date= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(); 
   		 localStorage.setItem("date",date);
     
      });
      		
           
});

$( "#SignUpDOB" ).focus(function() {
	 var dates= localStorage.getItem("date");
 
   if(dates=="NaN/NaN/NaN")
	   {
	   $(this).val(''); 
	   }
   else
	   {
    $(this).val(dates); 
	   }
});


$("#signUpButton").on("click", function () {
    //  $(".signup_inputs, .registerpage_btns, .signup-logo").css("display", "block");
    $(".login_inputs,#loginButtonDiv,#signUpButtonDiv,.need_help,.logo").css("display", "none");

    $('#signUpDiv').animate({
        'marginTop': "-20px" //moves down
    });
    $("#signUpDiv").css("display", "block");
});

$("#selectors").on("click", function () {
    var select = $(this).val();
   
    localStorage.setItem("genderSignUp", select);
});

$("#backButtonRegister").on("click", function () {
	$("#userLoginEmailId").val('');
	$("#userLoginPassword").val('');
    $("#SignUpFullName, #SignUpPassword, #SignUpDOB, #SignUpgender, #SignUpUserName, #SignUpEmail").val('');
   
 
    $("#signUpDiv").css("display", "none");


    $('#signUpDiv').animate({
        'marginTop': "20px" //moves up
    });
    $(".login_inputs,#loginButtonDiv,#signUpButtonDiv,.need_help,.logo").css("display", "block");

});


$("#RegisterButton").on("click", function () {
	
	
	 
	var Gender= localStorage.getItem("genderSignUp");
	var date=   localStorage.getItem("date");
	if(date == null)
	{
		date = "";
	}
	if(Gender == null)
		{
		Gender = "Male";
		}
	
    var SignUpFullName = $("#SignUpFullName").val();
    var res = SignUpFullName.split(" ");
    var SignUpFirstName = res[0];
    var SignUpLastName = res[1];
    var SignUpUserName = $("#SignUpUserName").val();
    var SignUpEmail = $("#SignUpEmail").val();
    var SignUpPassword = $("#SignUpPassword").val();
    var SignUpDOB = date;
    var SignUpgender = Gender;
    
    
 if(SignUpFullName == '' ) 
        
    {
    	  function alertDismissed() {

          }

          navigator.notification.alert(
			    'First name cant be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',            // title
			    'OK'                  // buttonName
			);
          e.preventDefault();
    }
 
 if(SignUpUserName == '' ) 
     
 {
 	  function alertDismissed() {

       }

       navigator.notification.alert(
			    'User name cant be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',            // title
			    'OK'                  // buttonName
			);
       e.preventDefault();
 }

 if(SignUpEmail == '' ) 
     
 {
 	  function alertDismissed() {

       }

       navigator.notification.alert(
			    'Email address cant be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',            // title
			    'OK'                  // buttonName
			);
       e.preventDefault();
 }

 if(SignUpPassword == '' ) 
     
 {
 	  function alertDismissed() {

       }

       navigator.notification.alert(
			    'Password cant be empty!',  // message
			    alertDismissed,         // callback
			    'YuYAPP',            // title
			    'OK'                  // buttonName
			);
       e.preventDefault();
 }

    

  Signup(SignUpFirstName, SignUpLastName, SignUpUserName, SignUpUserName, SignUpEmail, SignUpPassword, SignUpDOB, SignUpgender);
});



/*Signup the user*/
function Signup(SignUpFirstName, SignUpLastName, SignUpUserName, SignUpUserName, SignUpEmail, SignUpPassword, SignUpDOB, SignUpgender) {
	// checkConnection();
    var userData = {
        userName: SignUpUserName,
        email: SignUpEmail,
        password: SignUpPassword,
        DOB: SignUpDOB,                         //'11/02/1986'
        firstName: SignUpFirstName,
        lastName: SignUpLastName,
        gender: SignUpgender,
        securityQuestion: 'New question'
    };
    $.ajax({
        type: "POST",
        // url: "http://localhost:6269/users/signup",
        beforeSend: showLoader(),
        url: webservicesiteurl + "Users/signup",
        data: userData,
        success: function (data) {
          
            console.log(data);
            if (data.ResponseData != 0)
            {
                var userId = data.ResponseData;
               
                localStorage.setItem("userId", userId);
                window.location.replace("home.html");
                window.plugins.toast.show('Registered Successfully!', 'long', 'center', function (a) { }, function (b) { });
                
            //alert("success..." + data);
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




function ValidateEmail() {
	 checkConnection();
    var postData = {
        email: $("#SignUpEmail").val()
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: webservicesiteurl + "Users/checkemail",
        data: postData,
        success: function (data) {

            if (data.ResponseData != 1) {
            	//window.plugins.toast.show('Email is valid!', 'short', 'center', function (a) { }, function (b) { });
                
            }
            else {
            	  function alertDismissed() {

                  }

                  navigator.notification.alert(
        			    'User already exist!',  // message
        			    alertDismissed,         // callback
        			    'YuYAPP',            // title
        			    'OK'                  // buttonName
        			);
                  $("#SignUpEmail").val('');
                  $("#SignUpEmail").focus();
            }
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {

        	 hideLoader();
             // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}