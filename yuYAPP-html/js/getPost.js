
$("#WordWallOption").on("click", function () {

    // GetUserPost();
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $(".top_heading").text("WORD");
    $(".ctgry-list-main").css("display", "block");
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "wordWall");

    GetUserPost(start, end);
    $(".shh-screen").css("display", "none");
    localStorage.setItem("MenuFlag", "up");
});



var userId = localStorage.getItem("userId");
/*get user post*/
function GetUserPost(start, end) {
    //	checkConnection();
    var postData = {
        userId: userId,
        postType: 0,/*0 for status, 1 for Image, 2 for Videos*/
        start: start,
        end: end
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //  url: "http://localhost:6269/posts/GetPosts",
        url: webservicesiteurl + "posts/GetPosts",
        data: postData,
        success: function (data) {

            console.log(data);
            var HTML = "";
            var content = localStorage.getItem("htmlcontent");
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = data.ResponseData[i].ProfilePic;
                    if (ProfilePicURL == "") {

                        ProfilePicURL = "images/no-pic.png";
                    }
                    else {
                        ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                    }
                    var positiveAnnotations = data.ResponseData[i].PositiveAnnotation;
                    var negativeAnnotations = data.ResponseData[i].NegativeAnnotation;

                    var liked = data.ResponseData[i].PositiveLike;
                    var negativeLiked = data.ResponseData[i].NegativeLike;
                    HTML += "<div class='single-user'>"
                    HTML += "<div class='user-title'> "
                    HTML += "<div class='fl user-list-pic'><img src=" + ProfilePicURL + "></div>"
                    HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>(" + data.ResponseData[i].TimeSpan + ")</span></div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "<p>" + data.ResponseData[i].Status + "</p></div>"

                    HTML += "<div class='like-cmnt-no'><span class='firstButtonSpan'>" + data.ResponseData[i].TotalLike + "</span>" + " " + positiveAnnotations + ", <span class='commentButtonSpan' >" + data.ResponseData[i].TotalComment + "</span> Comments, <span class='secondButtonSpan'>" + data.ResponseData[i].TotalDisLike + "</span>" + " " + negativeAnnotations + "</div>"

                    HTML += "<div postId=" + data.ResponseData[i].PostId + " class='wordwall-btns'>"

                    if (liked == true) {

                        HTML += "<input  type='button' class='firstButton clicked-like-btn like' value=" + positiveAnnotations + ">"
                        HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                        HTML += "<input type='button' class='secondButton like-btn dislike' value=" + negativeAnnotations + ">"
                    }

                    else if (negativeLiked == false) {

                        HTML += "<input type='button' class='firstButton like-btn like' value=" + positiveAnnotations + ">"
                        HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                        HTML += "<input  type='button' class='secondButton clicked-like-btn dislike' value=" + negativeAnnotations + ">"
                    }

                    else {
                        HTML += "<input  type='button' class='firstButton like-btn like' value=" + positiveAnnotations + ">"
                        HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                        HTML += "<input  type='button' class='secondButton like-btn dislike' value=" + negativeAnnotations + ">"
                    }

                    HTML += "</div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "</div>"

                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $(".list-area").html(HTML);
                }
                else
                    $(".list-area").append(HTML);
            }

            //console.log(data.ResponseData.length);
        },
        error: function (xhr) {
            hideLoader();
            if (checkConnection())
                alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

function GetCommentCount(postid) {
    var postData = {
        postid: postid
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetCommentCount",
        url: "http://174.141.233.6/YuY/posts/GetCommentCount",
        data: postData,
        success: function (data) {
            //debugger;
            
            var  count= data.ResponseData;
            var text = $(".CommentUpdate").parent().prev().find('.commentButtonSpan').text();
           
            text = count;
         
            $(".CommentUpdate").parent().prev().find('.commentButtonSpan').text(text);
            $(".CommentUpdate").removeClass("CommentUpdate");
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}




function LikeDislike(element, operation, selector)
{

    element.parent().find(selector).removeClass("clicked-like-btn").addClass("like-btn");


    selector = selector + "Span";

    var text = element.parent().prev().find(selector).text();
    
    text = operation == "+" ? parseInt(text, 10) + 1 : parseInt(text, 10) - 1;
    
    element.parent().prev().find(selector).text(text);
}


$(document).on("click", ".firstButton", function ()
{
    var checkClass = $(this).hasClass('like-btn');
    var varify = $(this).parent().find('.secondButton').hasClass("clicked-like-btn");
    if (varify == true) {

        LikeDislike($(this), "-", ".secondButton");

     
    }

    if (checkClass == true) {
        $(this).removeClass("like-btn").addClass("clicked-like-btn");
        var text = $(this).parent().prev().find('.firstButtonSpan').text();  
        text= parseInt(text,10) + 1;
        $(this).parent().prev().find('.firstButtonSpan').text(text);
    }

    else {

        $(this).removeClass("clicked-like-btn").addClass("like-btn");
     
        var text = $(this).parent().prev().find('.firstButtonSpan').text();
        text = parseInt(text, 10) - 1;

        $(this).parent().prev().find('.firstButtonSpan').text(text);
        
    }

});

$(document).on("click", ".secondButton", function () {
    var checkClass = $(this).hasClass('like-btn');
   var varify= $(this).parent().find('.firstButton').hasClass("clicked-like-btn");
   if (varify == true) {
       LikeDislike($(this), "-", ".firstButton");
        //$(this).parent().find('.firstButton').removeClass("clicked-like-btn").addClass("like-btn");
        //var text = $(this).parent().prev().find('.firstButtonSpan').text();
        //text = parseInt(text, 10) - 1;
        //$(this).parent().prev().find('.firstButtonSpan').text(text);
    }

    if (checkClass == true) {
        $(this).removeClass("like-btn").addClass("clicked-like-btn");
        var text = $(this).parent().prev().find('.secondButtonSpan').text();

        text = parseInt(text, 10) + 1;
        $(this).parent().prev().find('.secondButtonSpan').text(text);
    }

    else {
        $(this).removeClass("clicked-like-btn").addClass("like-btn");
        
        //alert(varify);
       
        var text = $(this).parent().prev().find('.secondButtonSpan').text();
        text = parseInt(text, 10) - 1;
        $(this).parent().prev().find('.secondButtonSpan').text(text);

    }

});




/get user Comments/
function GetPostComments(postId,start, end) {
    //checkConnection();
    var postData = {
        postId: postId,
        start: start,
        end: end
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: webservicesiteurl + "posts/GetPostComments",
        data: postData,
        success: function (data) {
           var flag = 1;
            var HTML = "";
            var content = localStorage.getItem("htmlcontent");
        
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                    HTML += "<div class='single-comment'>"
                    HTML += "<div class='fl comment-by-user'><img src=" + ProfilePicURL + " /></div>"
                    HTML += "<div class='fl comment-text'><span class='comment-user fl'> " + data.ResponseData[i].UserName + " </span><div class='comment-msg-ago fl'>" + data.ResponseData[i].TimeSpan + "</div> <div style='width:100%;'>" + data.ResponseData[i].Comment + "</div></div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "</div>"
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new")
                {

                    $(".comment-list").html(HTML);
                }
                else {
                    $(".comment-list").append(HTML);
                }
                flag = 0;
            }
            else {
                if (flag == 1) {
                    HTML += "<img src='images/no-comment.png'>"
                    $(".comment-list").append(HTML);
                }
                }

            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            checkConnection();
            hideLoader();


        }
    }).done(function () {
        hideLoader();
    });
}




$(document).on("click", "#cancelCommentBox", function () {

    $("#commentPopup").css("display", "none");
   var postid= localStorage.getItem("postId");
   GetCommentCount(postid);
       
   

});


$(document).on("click", ".like", function () {

    var postId = $(this).parent().attr('postId');

    localStorage.setItem("like", "1");
    localStorage.setItem("click", "1");
    addLikes(postId);
});

$(document).on("click", ".dislike", function () {
    var postId = $(this).parent().attr('postId');
    localStorage.setItem("click", "2");
    localStorage.setItem("like", "0");
    addLikes(postId);

});

$(document).on("click", ".commentButton", function () {
    $("#InsertStatusTextBoxComments").val('');
    $(this).addClass("CommentUpdate");
    var postId = $(this).parent().attr('postId');
    localStorage.setItem("postId", postId);
    $("#commentPopup").css("display", "block");
    $(".comment-list").html("");
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "comment");
    GetPostComments(postId, start, end);

});
$(document).on("click", "#postComments", function () {
    if ($("#InsertStatusTextBoxComments").val() == '') {

        window.plugins.toast.show('Enter a comment', 'short', 'center', function (a) { }, function (b) { });
    }
    else {
        var postIdForComment = localStorage.getItem("postId");
        InsertPostComment(postIdForComment);
    }
});