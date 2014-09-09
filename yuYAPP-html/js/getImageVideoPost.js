
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
             window.localStorage.setItem("Myuploads", "all");
             GetPostNonAnonymousList(isall, posttype);
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
      GetPostNonAnonymousList(isall, posttype)
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
      GetPostNonAnonymousList(isall, posttype)
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
      GetPostNonAnonymousList(isall, posttype)
  });
  $("#MyUploads").on("click", function () {
      window.localStorage.setItem("Myuploads", "my");
      var isall = "false";
      var posttype = 0;
      GetPostNonAnonymousList(isall, posttype)
  });
  $("#AllUploads").on("click", function () {

      var isall = "true";
      var posttype = 0;
      GetPostNonAnonymousList(isall, posttype)
      window.localStorage.setItem("Myuploads", "all");
  });
  
var userId = localStorage.getItem("userId");



/*get GetPostNonAnonymousList for Shhh */
function GetPostNonAnonymousList(isall,posttype) {
	//checkConnection();
    var postData = {
        userId: userId,
        start: 1,
        end: 10,
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
                       HTML += "<div class='upload-title'>"
                       HTML += "<div class='fl upload-user-pic'>"
                       HTML += "<img src=" + ProfilePicURL + "></div>"
                       HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>("+ data.ResponseData[i].TimeSpan +")</span></div>"
                       HTML += "<div class='clr'></div>"
                       HTML += "<div>"
                       HTML += "<div class='uploaded-pic'>"
                       if (POsttype == "1")
                       {
                           HTML += "<img src=" + PostFileURL + "></div>"
                       }
                       else
                       {
                           HTML += "<div class='video ' style='display:block;'>"
                           HTML += "<video width='340' height='240' controls='' src=" + PostFileURL + ">"
                           HTML += "<source type='video/mp4' src='' id='video'></source></video></div></div>"
                       }

                       HTML += "<p><strong>" + data.ResponseData[i].Status + "</strong></p>"
                       HTML += "<p>" + data.ResponseData[i].Description + "</p> </div></div>"
                       HTML += "<div class='like-cmnt-no'><span>" + data.ResponseData[i].TotalLike + "</span>" + " " + positiveAnnotations + ", <span>" + data.ResponseData[i].TotalComment + "</span> Comments, <span>" + data.ResponseData[i].TotalDisLike + "</span>" + " " + negativeAnnotations + "</div>"

                       HTML += "<div postId=" + data.ResponseData[i].PostId + " class='wordwall-btns'>"
                       if (liked == true) {

                           HTML += "<input  type='button' class='clicked-like-btn like' value=" + positiveAnnotations + ">"
                           HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                           HTML += "<input  type='button' class='like-btn dislike' value="+negativeAnnotations+">"
                       }

                       else if (negativeLiked == false)
                       {

                           HTML += "<input type='button' class='like-btn like' value=" + positiveAnnotations + ">"
                           HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                           HTML += "<input   type='button' class='clicked-like-btn dislike' value=" + negativeAnnotations + ">"
                       }

                       else
                       {
                           HTML += "<input  type='button' class='like-btn like' value=" + positiveAnnotations + ">"
                           HTML += "<input  type='button' class='like-btn commentButton' value='Comment'>"
                           HTML += "<input  type='button' class='like-btn dislike' value=" + negativeAnnotations + ">"
                       }

                     
                       HTML += "</div><div class='clr'></div></div><div class='clr'></div>"

                       $(".upload-area").html(HTML);
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
        	GetAllFollowing();
        	GetRecentFollowingList();
        	GetAllFollowerList();
        	GetRecentFollowerList();
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

