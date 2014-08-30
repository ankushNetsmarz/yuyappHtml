
var userId = localStorage.getItem("userId");
/*Add Likes on the post*/
function addLikes(postId) {
	//checkConnection();
    var likeStatus = localStorage.getItem("like");
    var clickStatus= localStorage.getItem("click");
    
    var postData = {
        postId: postId,
        userId: userId,
        clickType: clickStatus,
        likeStatus: likeStatus    //0 for dislike

    };
    $.ajax({
        type: "Post",
        beforeSend: showLoader(),
     //   url: "http://localhost:6269/posts/addlikes",
        url: "http://174.141.233.6/YuY/posts/addlikes",
        data: postData,
        success: function (data) {
        
            console.log(data);

            GetUserPost();
            GetPostNonAnonymousList();
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