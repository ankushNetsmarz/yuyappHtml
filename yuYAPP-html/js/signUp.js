﻿
$('#SignUpEmail').blur(function () {

    if ($(this).val() == "") {

    }
    else
    {
        ValidateEmail();
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


$("#backButtonRegister").on("click", function () {
    $("#SignUpFullName, #SignUpPassword, #SignUpDOB, #SignUpgender, #SignUpUserName, #SignUpEmail").val('');
   
 
    $("#signUpDiv").css("display", "none");


    $('#signUpDiv').animate({
        'marginTop': "20px" //moves up
    });
    $(".login_inputs,#loginButtonDiv,#signUpButtonDiv,.need_help,.logo").css("display", "block");

});


$("#RegisterButton").on("click", function () {
    var SignUpFullName = $("#SignUpFullName").val();
    var res = SignUpFullName.split(" ");
    var SignUpFirstName = res[0];
    var SignUpLastName = res[1];
    var SignUpUserName = $("#SignUpUserName").val();
    var SignUpEmail = $("#SignUpEmail").val();
    var SignUpPassword = $("#SignUpPassword").val();
    var SignUpDOB = $("#SignUpDOB").val();
    var SignUpgender = $("#SignUpgender").val();

    Signup(SignUpFirstName, SignUpLastName, SignUpUserName, SignUpUserName, SignUpEmail, SignUpPassword, SignUpDOB, SignUpgender);
});



/*Signup the user*/
function Signup(SignUpFirstName, SignUpLastName, SignUpUserName, SignUpUserName, SignUpEmail, SignUpPassword, SignUpDOB, SignUpgender) {
    
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
        url: mainUrl + "signup",    
        data: userData,
        success: function (data) {
          
            console.log(data);
            if (data.ResponseData != 0)
            {
                var userId = data.ResponseData;
                alert(userId);
                localStorage.setItem("userId", userId);
                window.location.replace("home.html");
            //alert("success..." + data);
            }
        },
        error: function (xhr) {
         
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}




function ValidateEmail() {

    var postData = {
        email: $("#SignUpEmail").val()
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: mainUrl + "checkemail",
        data: postData,
        success: function (data) {

            if (data.ResponseData != 1) {

            }
            else {
                alert("already registered");
            }
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {

            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}