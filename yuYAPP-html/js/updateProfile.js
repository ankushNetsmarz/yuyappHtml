
$("#Ficon").on("click", function () {
    $("#editFirstname").prop("disabled", false);
    $("#editFirstname").focus();

});
$("#Licon").on("click", function () {
    $("#editLastname").prop("disabled", false);
    $("#editLastname").focus();

});
$("#Uicon").on("click", function () {
    $("#editUserName").prop("disabled", false);
    $("#editUserName").focus();

});
$("#Gicon").on("click", function () {
    $("#selector").prop("disabled", false);
    $("#selector").focus();

});

$("#selector").on("click", function () {
    var select = $(this).val();
   
    localStorage.setItem("gender", select);
});




$("#EditProfile").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });

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

    var userData = {
        userId: userId,
        userName: editUserName,
        password:'',
        DOB: editDOB,
        firstName: editFirstname,
        lastName: editLastname,
        gender: editGender,
        securityQuestion: 'New question'
    };
    $.ajax({
        type: "Post",
        beforeSend: showLoader(),
       url: "http://174.141.233.6/YuY/Users/UpdateProfile",
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