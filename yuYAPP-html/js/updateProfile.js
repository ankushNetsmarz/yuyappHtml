

$("#selector").on("click", function () {
    var select = $(this).val();

    localStorage.setItem("gender", select);
});





$("#editDOB").on("click", function () {
    var options = {
        date: new Date(),
        mode: 'date'
    };
    datePicker.show(options, function (date) {
        //  alert("date result " + date);  
        var date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        if(date=="NaN/NaN/NaN")
 	   {
 	  
 	   }
        else
        	{
        localStorage.setItem("date", date);
        	}
    });

});
$( "#editDOB" ).focus(function() {

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



$("#EditProfile").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $(".shh-screen").css("display", "none");
    $("#see_profile").css("display", "none");
    $(".add-frnd").css("display", "none");
    $("#edit_profile").css("display", "block");
    $(".top_heading").text("EDIT-PROFILE");
    $(".ctgry-list-main").css("display", "none");
    localStorage.setItem("MenuFlag", "up");
});



function UpdateProfile(editFirstname, editLastname, editUserName, editDOB, editGender) {
    //checkConnection();
    var userId = localStorage.getItem("userId");
    var dates= localStorage.getItem("date");
    if (dates == null) {
        dates = "";
    }
    if (editGender == null) {
        editGender = "Male";
    }

    var userData = {
        userId: userId,
        userName: editUserName,
        password: '',
        DOB: dates,
        firstName: editFirstname,
        lastName: editLastname,
        gender: editGender,
        securityQuestion: 'New question'
    };
    $.ajax({
        type: "Post",
        beforeSend: showLoader(),
        url: webservicesiteurl + "Users/UpdateProfile",
        data: userData,
        success: function (data) {

            console.log(data);
            window.plugins.toast.show('Profile updated!', 'long', 'center', function (a) { }, function (b) { });

            //alert("success..." + data);
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