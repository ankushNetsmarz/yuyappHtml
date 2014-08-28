
  $("#YappLiveOption").on("click", function () {
             $('.inner-pages').animate({
                 'top': "0px" //moves up
             });
             $("#see_profile").css("display", "none");
             $(".ctgry-list-main").css("display", "none");
             $(".add-frnd").css("display", "none");
             $("#edit_profile").css("display", "none");
             $(".follow-friend,.notification").css("display", "none");
             $("#YAPP-Live").css("display", "block");
             GetPostNonAnonymousList();
             localStorage.setItem("MenuFlag", "up");
         });
  
var userId = localStorage.getItem("userId");

function GetPostAnonymousList() {
    var postData = {
        userId: userId,
        start: 1,
        end: 10,
        isall: false
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetPostAnonymousList",
       url: "http://174.141.233.6/YuY/posts/GetPostAnonymousList",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}

/*get GetPostNonAnonymousList for Shhh */
function GetPostNonAnonymousList() {
    var postData = {
        userId: 1,
        start: 1,
        end: 10,
        isall: false
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/GetPostNonAnonymousList",
        url: "http://174.141.233.6/YuY/posts/GetPostNonAnonymousList",
        data: postData,
        success: function (data) {
            var HTML = "";
           
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {


                	   var PostFileURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].PostFileURL;
                	   var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;
                	   var positiveAnnotations = data.ResponseData[i].PositiveAnnotation;
                	   var negativeAnnotations = data.ResponseData[i].NegativeAnnotation;

                       var POsttype = data.ResponseData[i].POsttype;
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
            debugger;
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

/*Set Unfriend*/
function SetUnFriend() {
    var postData = {
        userId: userId,
        friendId: 2
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/SetUnFriend",
        url: "http://174.141.233.6/YuY/posts/SetUnFriend",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}

