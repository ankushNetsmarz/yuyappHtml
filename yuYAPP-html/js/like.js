
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
        url: webservicesiteurl + "posts/addlikes",
        data: postData,
        success: function (data) {
        
            console.log(data);                             
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