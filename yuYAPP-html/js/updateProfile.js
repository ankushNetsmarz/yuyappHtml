$("#EditProfile").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });

    $("#see_profile").css("display", "none");
    $(".add-frnd").css("display", "none");
    $("#edit_profile").css("display", "block");
    $(".top_heading").text("EDIT-PROFILE");
    $(".ctgry-list-main").css("display", "none");
});



$("#updateButton").on("click", function () {
    var editFirstname = $("#editFirstname").val();
    var editLastname = $("#editLastname").val();
    var editUserName = $("#editUserName").val();
    var editDOB = $("#editDOB").val();
    var editGender = $("#editGender").val();

    UpdateProfile(editFirstname, editLastname, editUserName, editDOB, editGender);
    //   return false;
});


function UpdateProfile(editFirstname, editLastname, editUserName, editDOB, editGender) {
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
            //alert("success..." + data);
        },
        error: function (xhr) {
          
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}