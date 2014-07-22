function SignIn(userLoginEmailId, loginPassword) {

    var userData = {

        email: userLoginEmailId,
        password: loginPassword
    };
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/users/login",
        url: "http://174.141.233.6/YuY/users/login",
        data: userData,
        success: function (data) {

            console.log(data);

            if (data.ResponseData[0].UserID != 0) {
                window.location.replace("home.html");
            }
            else {
                alert("wrong user");
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}
function ValidateEmail() {

    var postData = {
        email: $("#SignUpEmail").val()
    };
    $.ajax({
        type: "GET",
        //  url: "http://localhost:6269/users/checkuser",
        url: "http://174.141.233.6/YuY/users/checkuser",
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
    });
}