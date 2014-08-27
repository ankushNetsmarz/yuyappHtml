

$("#postStatus").on("click", function () {
    InsertStatus();
  
});

//function InsertStatus() {
//    var postData = {
//        postedBy: "10", /*user who Post the status or the Post */
//        postFileTitle: "Posted By 10", //This is for both Post and status/
//        allowedUser: "5,6,7",
//        deniedUser: "8,9",
//        postType: "0", //0 for Status, 1 for the Image, 2 for VIdeo/
//    // method: 1 /* 1 for Like Dislike, 2 for Hate Love, 3 for Agree Disagree */
//        positiveAnnotation: "",
//        negativeAnnotation: ""
//};
//$.ajax({
//    type: "POST",
//    url: "http://localhost:6269/posts/add",
//    //url: "http://174.141.233.6/YuY/posts/add",
//    data: postData,
//    success: function (data) {
//        debugger;
//        console.log(data);
//        //alert("success..." + data);
//    },
//    error: function (xhr) {
//        debugger;
//        alert(xhr.responseText);
//    }
//});
//}



/*Insert user post*/
var userId= localStorage.getItem("userId");

function InsertStatus() {
    
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
           
            //alert("success..." + data);
        },
        error: function (xhr) {
          
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}




/*Add comment on the post*/
function InsertPostComment(postIdForComment) {
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
            //alert("success..." + data);
        },
        error: function (xhr) {
          
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

