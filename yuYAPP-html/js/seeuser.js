
$(document).on("click", ".testImage", function () {
    $("#seeUserProfile").css("display", "block");
    var userId = $(this).attr("UserId");
  
    seeUserProfile(userId);
});


$(document).on("click", "#crossUserProfile", function () {
    $("#seeUserProfile").css("display", "none");
});





function seeUserProfile(userId) {
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

            var PicUrl = webservicesiteurl + data.ResponseData.PicUrl;
            localStorage.setItem("ProfilePicUrl", PicUrl);
            var Gender = data.ResponseData.Gender;


            //$("#seeStatus").text(data.ResponseData.Post);
            $("#SeefullName").val(data.ResponseData.UserName);

            $("#SeeUserName").val(data.ResponseData.LastName);
            $("#SeeEmail").val(data.ResponseData.FirstName);
            $("#SeeGender").val(Gender);

            //$("#editDOB").val(data.ResponseData.DOB);


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

