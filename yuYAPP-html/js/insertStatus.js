

$("#postStatus").on("click", function () {
    InsertStatus();
  
});



/*Insert user post*/
var userId= localStorage.getItem("userId");

function InsertStatus() {
 	checkConnection();
    var postData = {
        postedBy: userId, /*user who Post the status or the Post */
        postFileTitle: $("#InsertStatusTextBox").val(), /*This is for both Post and status*/
        allowedUser: "0",
        description: "",
        deniedUser: "0",
        postType: "0",/*0 for Status, 1 for the Image,  2 for VIdeo*/
        positiveAnnotation: "hate",
        negativeAnnotation: "love"
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
    //    url: "http://localhost:6269/posts/add",
        url: "http://174.141.233.6/YuY/posts/add",
        data: postData,
        success: function (data) {
            GetUserPost();

            $("#InsertStatusTextBox").val('');
            window.plugins.toast.show('Feed Added!', 'long', 'center', function (a) { }, function (b) { });
            
            
            //alert("success..." + data);
        },
        error: function (xhr) {
          
        	 hideLoader();
             // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}




/*Add comment on the post*/
function InsertPostComment(postIdForComment) {
	//checkConnection();
    var commentMessage = $("#InsertStatusTextBoxComments").val();

    var postData = {
        postId: postIdForComment,
        userId: userId,
        comment: commentMessage
    };
    $.ajax({
        type: "Post",
        beforeSend: showLoader(),
       // url: "http://localhost:6269/posts/addcomments",
        url: "http://174.141.233.6/YuY/posts/AddComments",
        data: postData,
        success: function (data) {
       
            console.log(data);
            GetPostComments(postIdForComment);
            GetUserPost();
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

