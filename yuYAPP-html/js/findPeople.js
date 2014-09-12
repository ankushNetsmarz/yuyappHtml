$(document).on("click", "#plug", function () {
    var friendId = $(this).attr("userId");

    AddFriend(friendId);

});


$("#RequestOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");

    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
     GetPeopleRandom(start,end);
    localStorage.setItem("page","request");

    $(".ctgry-list-main,.follow-friend,.notification").css("display", "none");
    $(".shh-screen").css("display", "none");
    $("#YAPP-Live").css("display", "none");
    $(".add-frnd").css("display", "block");
    $(".top_heading").text("FIND-FRIENDS");
    localStorage.setItem("MenuFlag", "up");

});
$(document).on("click", ".load-more-all", function () {
    $(this).hide();

    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    var posttype = localStorage.getItem("posttype");
    var isall = localStorage.getItem("isallload");

    localStorage.setItem("htmlcontent", "append");
    start = parseInt(end) + 1;

    end = parseInt(start) + 9;
    var page = localStorage.getItem("page");
    if (page == "request")
    {
        GetPeopleRandom(start, end);
    }
    else if (page == "allfollower") {
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
    else if (page == "wordWall") {
        GetUserPost(start, end);
    }
    else if (page == "yappLive") {
    
        GetPostNonAnonymousList(isall, posttype, start, end);
    }
    else if (page == "yappLiveimage") {
        GetPostNonAnonymousList(isall, posttype, start, end);
    }
    else if (page == "yappLivevideo") {
        GetPostNonAnonymousList(isall, posttype, start, end);
    }
    else if (page == "MyappLive") {
        GetPostNonAnonymousList(isall, posttype, start, end);
    }
    else if (page == "shhappLive") {
        GetPostAnonymousList(isall, posttype, start, end)
    }
    else if (page == "shhappimage") {
        GetPostAnonymousList(isall, posttype, start, end)
    }
    else if (page == "shhappvideo") {
        GetPostAnonymousList(isall, posttype, start, end)
    }
    
    else if (page == "comment") {
        var postId = localStorage.getItem("postId");
        GetPostComments(postId, start, end);
    }
    else  {

    }

    localStorage.setItem("start", start);
    localStorage.setItem("end", end);


});

var userId = localStorage.getItem("userId");

function GetPeopleRandom(start,end) {
    // checkConnection();
    var inputdata = {
        "userId": userId,
        "start": start,
        "end": end
    };
    $.ajax({
        type: "GET",
        //   url: "http://localhost:6269/Users/GetPeopleRandom",
        url: webservicesiteurl +"Users/GetPeopleRandom",
        beforeSend: showLoader(),
        data: inputdata,
        dataType: "json",

        success: function (data) {

            console.log(data);
            var HTML = "";
             var content=   localStorage.getItem("htmlcontent");
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].PicUrl;


                    var UserId = data.ResponseData[i].UserId;

                    HTML += "<div class='plug-frnd-main'>"
                    HTML += "<div class='plug-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea' ><img userId=" + UserId + " src=" + ProfilePicURL + "></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                    HTML += "</div>"
                    HTML += "<div  id='plug' class='plug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='plug-btn'>PLUG</button></div></div>"
                    //console.log(data.ResponseData.length);
                }
                if (data.ResponseData.length >= 10)
                {
                HTML += "<div style='width: 100%;'><input id='findLoad' type='button' value='Load more...' class='load-more-all'></div>"
                }
                if(content=="new")
                {
                  $(".add-frnd-list").html(HTML);
                  }
                  else
                  {
                $(".add-frnd-list").append(HTML);
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


function AddFriend(friendId) {
    //checkConnection();
    var postData = {
        userId: userId,
        friendId: friendId,
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        // url: "http://localhost:6269/users/AddFriend",
        url: webservicesiteurl + "users/AddFriend",
        data: postData,
        success: function (data) {

            console.log(data);
            newcall();
            var start = localStorage.getItem("start");
            var end = localStorage.getItem("end");
            GetPeopleRandom(start, end);
            window.plugins.toast.show('Friend added!', 'long', 'center', function (a) { }, function (b) { });


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
