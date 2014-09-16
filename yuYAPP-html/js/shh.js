


$(".generateKey").on("click", function () {
    Gen_AnonymousId();
});
$("#ShhhOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");
    var isall = "true";
    var posttype = 0;
    localStorage.setItem("posttype", posttype);
    localStorage.setItem("isallload", isall);
    localStorage.setItem("page", "shhappLive");
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");

    GetPostAnonymousList(isall, posttype, start, end)
    localStorage.setItem("isAnonymous",1);
    $(".ctgry-list-main,.follow-friend,.notification,.add-frnd").css("display", "none");
    $("#YAPP-Live").css("display", "none");
    $(".shh-screen").css("display", "block");
    $(".top_heading").text("SHH..");
    localStorage.setItem("MenuFlag", "up");

});


$("#allAnony").on("click", function () {
	 var isall = "true";
	 var posttype = 0;
	 localStorage.setItem("page", "shhappLive");
	 localStorage.setItem("posttype", posttype);
	 localStorage.setItem("isallload", isall);
	 newcall();
	 var start = localStorage.getItem("start");
	 var end = localStorage.getItem("end");

	 GetPostAnonymousList(isall, posttype, start, end)
});
$("#ImageAnony").on("click", function () {
    localStorage.setItem("page", "shhappimage");
	var isall = "true";
	 var posttype =1;
	 localStorage.setItem("posttype", posttype);
	 localStorage.setItem("isallload", isall);
	 newcall();
	 var start = localStorage.getItem("start");
	 var end = localStorage.getItem("end");

	 GetPostAnonymousList(isall, posttype, start, end)
});
$("#VideoAnony").on("click", function () {
    localStorage.setItem("page", "shhappvideo");
	var isall = "true";
	   var posttype = 2; 
	   localStorage.setItem("posttype", posttype);
	   localStorage.setItem("isallload", isall);
	   newcall();
	   var start = localStorage.getItem("start");
	   var end = localStorage.getItem("end");

	   GetPostAnonymousList(isall, posttype, start, end)
});
$("#nearYou").on("click", function () {

   
});
$("#worldwide").on("click", function () {
    localStorage.setItem("page", "shhappLive");
    var isall = "true";
    var posttype = 0;
    localStorage.setItem("posttype", posttype);
    localStorage.setItem("isallload", isall);
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");

    GetPostAnonymousList(isall, posttype, start, end)
});


function GetPostAnonymousList(isall, posttype,start, end) {
    //checkConnection();
    var postData = {
        userId: userId,
        start: start,
        end: end,
        posttype: posttype,
        isall: isall
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/GetPostAnonymousList",
        url: webservicesiteurl + "posts/GetPostAnonymousList",
          
        data: postData,
        success: function (data) {
            var HTML = "";
            var content = localStorage.getItem("htmlcontent");
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    var id = data.ResponseData[i].AnonymousID;
                    var POsttype = data.ResponseData[i].POsttype; 
                    var positiveAnnotations = data.ResponseData[i].PositiveAnnotation;
                    var negativeAnnotations = data.ResponseData[i].NegativeAnnotation;
                    var PostFileURL = webservicesiteurl + data.ResponseData[i].PostFileURL;
                    var liked = data.ResponseData[i].PositiveLike;
                    var negativeLiked = data.ResponseData[i].NegativeLike;
                    var profile= webservicesiteurl+ "userdata/anonymouspic/male.jpg"
            HTML+= "<div class='single-upload'>"
            HTML += "<div class='arrow-main'><img src='images/arrow.png'></div>"
            HTML+="<div class='upload-title'>"
            HTML+= "<div class='fl upload-user-pic'>"
            HTML+= "<img src="+profile+"></div>"
            HTML+= "<div class='fl user-name-title'>"+id+"<br><span>("+data.ResponseData[i].TimeSpan+")</span></div>"
            HTML+= "<div class='clr'></div>"
            HTML+= "<div>"
            HTML+= "<div class='uploaded-pic'>"
            	  if (POsttype == "1") {
                      HTML += "<img src=" + PostFileURL + "></div>"
                  }
                  else {
                      HTML += "<div class='video ' style='display:block;'>"
                      HTML += "<video width='340' height='240' controls='' src=" + PostFileURL + ">"
                      HTML += "<source type='video/mp4' src='' id='video'></source></video></div></div>"
                  }
            HTML += "<p><strong>" + data.ResponseData[i].Status + "</strong></p>"
            HTML += "<p>" + data.ResponseData[i].Description + "</p>"
            HTML+= "</div>"
            HTML+= "</div>"
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

            HTML+=  "</div>"
            HTML+=  "<div class='clr'></div>"
            HTML+=  "</div>"
                   
        }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $(".secret-list-area").html(HTML);
                }
                else {
                    $(".secret-list-area").append(HTML);
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

function Gen_AnonymousId() {
   // alert(userId);
    var postData = {
        userId: userId
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/Gen_AnonymousId",
        url: webservicesiteurl + "posts/Gen_AnonymousId",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            window.plugins.toast.show('Key generated!', 'long', 'center', function (a) { }, function (b) { });
            
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}