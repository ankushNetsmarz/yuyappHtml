﻿
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


                            
                           var liked= data.ResponseData[i].Liked;
                    
                HTML+= "<div class='single-user'>"

                HTML += "<div class='user-title'> "
                HTML+= "<div class='fl user-list-pic'><img src='images/user-pic-list.jpg' /></div>"
                HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>(" + data.ResponseData[i].TimeSpan + ")</span></div>"
                HTML+= "<div class='clr'></div>"
                HTML += "<p>"+ data.ResponseData[i].Status+"</p></div>"
                         
<<<<<<< HEAD
                HTML += "<div postId=" + data.ResponseData[i].PostId + " class='wordwall-btns'>"
                if (liked == true)
                {
                  
                    HTML += "<input id='likeButton' type='button' class='clicked-like-btn' value='Like'>"
                }
                else {
                    HTML += "<input id='likeButton' type='button' class='like-btn' value='Like'>"
                }
                HTML+=  "<input id='commentButton' type='button' class='like-btn' value='Comment'>"
                HTML += "<input id='dislikeButton'type='button' class='like-btn' value='Dislike'>"
=======
                HTML+=  "<div class='wordwall-btns'>"
                HTML+=  "<input type='button' class='like-btn' value='Like'>"
                HTML+=  "<input type='button' class='like-btn' value='Comment' id='post-comment'>"
                HTML+=  "<input type='button' class='like-btn' value='Dislike'>"
>>>>>>> origin/master
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
            });
        }
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

       

        });
