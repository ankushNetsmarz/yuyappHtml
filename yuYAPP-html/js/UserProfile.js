


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

});
var userId = localStorage.getItem("userId");
function GetUserProfile() {
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
            $("#seeStatus").text(data.ResponseData.Post);
            $("#SeeUserName,#editUserName").val(data.ResponseData.UserName);
            $("#SeefullName").val(data.ResponseData.FirstName + " " + data.ResponseData.LastName);
            $("#editLastname").val(data.ResponseData.LastName);
            $("#editFirstname").val(data.ResponseData.FirstName);
            $("#SeeGender,#editGender").val(data.ResponseData.Gender);
            $("#SeeEmail").val(data.ResponseData.Email);
            $("#SeeDOB,#editDOB").val(data.ResponseData.DOB);


        },
        error: function (xhr) {
       
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

