
var userId = localStorage.getItem("userId");
/*Add Likes on the post*/
function addLikes(postId) {
    alert(userId);
    alert(postId);
    var likeStatus= localStorage.getItem("like");
    var postData = {
        postId: postId,
        userId: userId,
        likeStatus: likeStatus    //0 for dislike
    };
    $.ajax({
        type: "Post",
     //   url: "http://localhost:6269/posts/addlikes",
        url: "http://174.141.233.6/YuY/posts/addlikes",
        data: postData,
        success: function (data) {
        
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
          
            alert(xhr.responseText);
        }
    });
}