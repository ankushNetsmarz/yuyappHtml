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
        url: "http://174.141.233.6/YuY/users/signup",
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