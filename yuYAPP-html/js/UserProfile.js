function GetUserProfile() {
    var userData = {
        userId: 13
    };
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/users/GetProfile",
        url: "http://174.141.233.6/YuY/users/GetProfile",
        data: userData,
        success: function (data) {
          
            console.log(data);

            $("#SeeUserName").val(data.ResponseData.UserName);        
            $("#SeefullName").val(data.ResponseData.FirstName + " " + data.ResponseData.LastName);
            $("#SeeGender").val(data.ResponseData.Gender);
            $("#SeeEmail").val(data.ResponseData.Email);
            $("#SeeDOB").val(data.ResponseData.DOB);


        },
        error: function (xhr) {
       
            alert(xhr.responseText);
        }
    });
}

