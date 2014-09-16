
  $("#YappLiveOption").on("click", function () {
             $('.inner-pages').animate({
                 'top': "0px" //moves up
             });
             $(".shh-screen").css("display", "none");
             $("#see_profile").css("display", "none");
             $(".ctgry-list-main").css("display", "none");
             $(".add-frnd").css("display", "none");
             $("#edit_profile").css("display", "none");
             $(".follow-friend,.notification").css("display", "none");
             $("#YAPP-Live").css("display", "block");
             $(".top_heading").text("YAPP-LIVE");
             var isall = "true";
             var posttype = 0;
             localStorage.setItem("isAnonymous",0);
             window.localStorage.setItem("Myuploads", "all");


             newcall();
             var start = localStorage.getItem("start");
             var end = localStorage.getItem("end");
             localStorage.setItem("page", "yappLive");
             localStorage.setItem("posttype", posttype);
             localStorage.setItem("isallload", isall);

             GetPostNonAnonymousList(isall, posttype, start, end);

             localStorage.setItem("MenuFlag", "up");
         });
  
  $("#AllPosts").on("click", function () {
      var isall;
      var check = window.localStorage.getItem("Myuploads");
      if (check == "my") {
          isall = "false";
      }
      else
      {
          isall = "true";
      }
      var posttype = 0;
      localStorage.setItem("posttype", posttype);
      localStorage.setItem("isallload", isall);
      newcall();
      var start = localStorage.getItem("start");
      var end = localStorage.getItem("end");
      localStorage.setItem("page", "yappLive");


      GetPostNonAnonymousList(isall, posttype, start, end);

  });
  $("#ImagePost").on("click", function () {
      var isall;
      var check = window.localStorage.getItem("Myuploads");
      if (check == "my") {
          isall = "false";
      }
      else {
          isall = "true";
      }
      var posttype =1;
      localStorage.setItem("posttype", posttype);
      localStorage.setItem("isallload", isall);
      newcall();
      var start = localStorage.getItem("start");
      var end = localStorage.getItem("end");
      localStorage.setItem("page", "yappLiveimage");


      GetPostNonAnonymousList(isall, posttype, start, end);

  });
  $("#VideoPost").on("click", function () {
      var isall;
      var check = window.localStorage.getItem("Myuploads");
      if (check == "my") {
          isall = "false";
      }
      else {
          isall = "true";
      }
      var posttype = 2;
      localStorage.setItem("posttype", posttype);
      localStorage.setItem("isallload", isall);
      newcall();
      var start = localStorage.getItem("start");
      var end = localStorage.getItem("end");
      localStorage.setItem("page", "yappLivevideo");


      GetPostNonAnonymousList(isall, posttype, start, end);

  });
  $("#MyUploads").on("click", function () {
      localStorage.setItem("page", "MyappLive");
      window.localStorage.setItem("Myuploads", "my");
      var isall = "false";
      var posttype = 0;
      localStorage.setItem("posttype", posttype);
      localStorage.setItem("isallload", isall);
      newcall();
      var start = localStorage.getItem("start");
      var end = localStorage.getItem("end");
      GetPostNonAnonymousList(isall, posttype, start, end);
  });
  $("#AllUploads").on("click", function () {
      localStorage.setItem("page", "yappLive");
      var isall = "true";
      var posttype = 0;
      localStorage.setItem("posttype", posttype);
      localStorage.setItem("isallload", isall);
      var start = localStorage.getItem("start");
      var end = localStorage.getItem("end");
      GetPostNonAnonymousList(isall, posttype, start, end);
      window.localStorage.setItem("Myuploads", "all");
  });
  
var userId = localStorage.getItem("userId");



/*get GetPostNonAnonymousList for Shhh */
function GetPostNonAnonymousList(isall,posttype,start, end) {
	//checkConnection();
    var postData = {
        userId: userId,
        start: start,
        end: end,
        posttype: posttype, // 0 for all, 1 for images, 2 for videos 
        isall: isall
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/GetPostNonAnonymousList",
        url: webservicesiteurl + "posts/GetPostNonAnonymousList",
        data: postData,
        success: function (data) {
            var HTML = "";
            var content = localStorage.getItem("htmlcontent");
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {


                    var PostFileURL = webservicesiteurl + data.ResponseData[i].PostFileURL;
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                    var positiveAnnotations = data.ResponseData[i].PositiveAnnotation;
                    var negativeAnnotations = data.ResponseData[i].NegativeAnnotation;

                    var POsttype = data.ResponseData[i].POsttype; //1 for image, 2 for videos

                    var liked = data.ResponseData[i].PositiveLike;
                    var negativeLiked = data.ResponseData[i].NegativeLike;

                    HTML += "<div class='single-upload'>"
                    HTML += "<div class='arrow-main'><img src='images/arrow.png'></div>"
                    HTML += "<div class='upload-title'>"
                    HTML += "<div class='fl upload-user-pic'>"
                    HTML += "<img src=" + ProfilePicURL + "></div>"
                    HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>(" + data.ResponseData[i].TimeSpan + ")</span></div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "<div>"
                    HTML += "<div class='uploaded-pic'>"
                    if (POsttype == "1") {
                        HTML += "<img src=" + PostFileURL + "></div>"
                    }
                    else {
                        HTML += "<div class='video ' style='display:block;'>"
                        HTML += "<video width='340' height='240' controls='' src=" + PostFileURL + ">"
                        HTML += "<source type='video/mp4' src='' id='video'></source></video></div></div>"
                    }

                    HTML += "<p><strong>" + data.ResponseData[i].Status + "</strong></p>"
                    HTML += "<p>" + data.ResponseData[i].Description + "</p> </div></div>"
                    HTML += "<div class='like-cmnt-no'><span class='firstButtonSpan'>" + data.ResponseData[i].TotalLike + "</span>" + " " + positiveAnnotations + ", <span class='commentButtonSpan'>" + data.ResponseData[i].TotalComment + "</span> Comments, <span class='secondButtonSpan'>" + data.ResponseData[i].TotalDisLike + "</span>" + " " + negativeAnnotations + "</div>"

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


                    HTML += "</div><div class='clr'></div></div><div class='clr'></div>"
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {

                    $(".upload-area").html(HTML);
                }
                else {
                    $(".upload-area").append(HTML);
                }
            }
                  
                
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

/*Set Unfriend*/
function SetUnFriend(friendId) {
	//checkConnection();
    var postData = {
        userId: userId,
        friendId: friendId
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/SetUnFriend",
        url: webservicesiteurl + "posts/SetUnFriend",
        data: postData,
        success: function (data) {
            //debugger;
            newcall();
            var start = localStorage.getItem("start");
            var end = localStorage.getItem("end");
            var page = localStorage.getItem("page");
            if (page == "allfollower") {
                GetAllFollowerList(start, end);
            }
            else if (page == "recentfollower") {
                GetRecentFollowerList(start, end);
            }
            else if (page == "allfollowing") {
                GetAllFollowing(start, end);
            }
            else if (page == "recentfollowing") {
                GetRecentFollowingList(start, end);
            }
           
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
        	checkConnection();
       	 hideLoader();
         // alert(xhr.responseText);
        }
    });
}

