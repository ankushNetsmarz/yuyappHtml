

$("#postStatus").on("click", function () {
    InsertStatus();
  
});



/*Insert user post*/
var userId= localStorage.getItem("userId");

function InsertStatus() {
 
    var postData = {
        postedBy: userId, /*user who Post the status or the Post */
        postFileTitle: $("#InsertStatusTextBox").val(), /*This is for both Post and status*/
        allowedUser: "0",
        deniedUser: "0",
        postType: "0" /*0 for Status, 1 for the Image,  2 for VIdeo*/
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
    //    url: "http://localhost:6269/posts/add",
        url: "http://174.141.233.6/YuY/posts/add",
        data: postData,
        success: function (data) {
            $("#InsertStatusTextBox").val('');
            GetUserPost();
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