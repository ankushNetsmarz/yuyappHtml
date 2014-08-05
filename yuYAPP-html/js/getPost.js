
$("#WordWallOption").on("click", function () {
   // GetUserPost();
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $(".top_heading").text("WORD");
    $(".ctgry-list-main").css("display", "block");
});



var userId = localStorage.getItem("userId");
        /*get user post*/
        function GetUserPost() {
            var postData = {
            	userId: userId,
                postType: 0,/*0 for status, 1 for Image, 2 for Videos*/
                start: 1,
                end: 10
            }
            $.ajax({
                type: "GET",
                beforeSend: showLoader(),
              //  url: "http://localhost:6269/posts/GetPosts",
                url: "http://174.141.233.6/YuY/posts/GetPosts",
                data: postData,
                success: function (data) {
                  
                    console.log(data);
                    var HTML = "";
           
                    if (data.ResponseData.length > 0) {

                        for (var i = 0; i < data.ResponseData.length; i++) {


                            
                            var liked = data.ResponseData[i].isliked;
                    
                HTML+= "<div class='single-user'>"

                HTML += "<div class='user-title'> "
                HTML+= "<div class='fl user-list-pic'><img src='images/user-pic-list.jpg' /></div>"
                HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>(" + data.ResponseData[i].TimeSpan + ")</span></div>"
                HTML+= "<div class='clr'></div>"
                HTML += "<p>"+ data.ResponseData[i].Status+"</p></div>"
                
				HTML += "<div class='like-cmnt-no'><span>857</span> Likes, <span>15</span> Comments, <span>45</span> Dislikes</div>"         

                HTML += "<div postId=" + data.ResponseData[i].PostId + " class='wordwall-btns'>"
                if (liked == true) {

                    HTML += "<input id='likeButton' type='button' class='clicked-like-btn' value='Like'>"
                    HTML += "<input id='commentButton' type='button' class='like-btn' value='Comment'>"
                    HTML += "<input id='dislikeButton'type='button' class='like-btn' value='Dislike'>"
                }

                else if (liked == false) {

                    HTML += "<input id='likeButton' type='button' class='like-btn' value='Like'>"
                    HTML += "<input id='commentButton' type='button' class='like-btn' value='Comment'>"
                    HTML += "<input id='dislikeButton'type='button' class='clicked-like-btn' value='Dislike'>"
                }

                else {
                    HTML += "<input id='likeButton' type='button' class='like-btn' value='Like'>"
                    HTML += "<input id='commentButton' type='button' class='like-btn' value='Comment'>"
                    HTML += "<input id='dislikeButton'type='button' class='like-btn' value='Dislike'>"
                }

                HTML+=  "</div>"
                HTML+=  "<div class='clr'></div>"
                HTML+=  "</div>"
                    //alert("success..." + data);
                        }
                        $(".list-area").html(HTML);
                    }

                    //console.log(data.ResponseData.length);
                },
                error: function (xhr) {
                   
                    alert(xhr.responseText);
                }
            }).done(function () {
                hideLoader();
            });
        }

        /get user Comments/
        function GetPostComments(postId) {
            alert(postId);
            var postData = {
                postId: postId
            }
            $.ajax({
                type: "GET",
                //url: "http://localhost:6269/posts/GetPostComments",
                url: "http://174.141.233.6/YuY/posts/GetPostComments",
                data: postData,
                success: function (data) {

                    var HTML = "";
           
                    if (data.ResponseData.length > 0) {

                        for (var i = 0; i < data.ResponseData.length; i++) {
                     
                            HTML+=   "<div class='single-comment'>"
                            HTML += "<div class='fl comment-by-user'><img src='images/user-pic-list.jpg' /></div>"
                            HTML += "<div class='fl comment-text'><span class='comment-user'> "+data.ResponseData[i].UserName+" </span> "+ data.ResponseData[i].Comment + "<div class='comment-msg-ago'>"+ data.ResponseData[i].TimeSpan+"</div></div>"
                            HTML+=   "<div class='clr'></div>"
                            HTML+=   "</div>"
                        }
                        $(".comment-list").html(HTML);
                        }
                    
                
                    console.log(data);
                    //alert("success..." + data);
                },
                error: function (xhr) {
                 
                    alert(xhr.responseText);
                }
            });
        }




        $(document).on("click", "#cancelCommentBox", function () {
            $("#commentPopup").css("display", "none");

        });


        $(document).on("click", "#likeButton", function () {
           var postId= $(this).parent().attr('postId');
           localStorage.setItem("like", "1");
         
           addLikes(postId);
        });

        $(document).on("click", "#dislikeButton", function () {
            var postId = $(this).parent().attr('postId');
            localStorage.setItem("like", "0");          
            addLikes(postId);

        });

        $(document).on("click", "#commentButton", function () {
            var postId = $(this).parent().attr('postId');
            localStorage.setItem("postId", postId);
            $("#commentPopup").css("display", "block");
            $(".comment-list").html("");
            GetPostComments(postId);

        });
        $(document).on("click", "#postComments", function () {
            var postIdForComment= localStorage.getItem("postId");
            InsertPostComment(postIdForComment);
        });