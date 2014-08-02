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