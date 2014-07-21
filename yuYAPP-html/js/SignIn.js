function SignIn(userLoginEmailId, loginPassword) {
    alert(userLoginEmailId);
    alert(loginPassword);
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
            debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}
