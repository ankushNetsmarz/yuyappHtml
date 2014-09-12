

$("#FriendsOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
 
    GetAllFollowerList(start, end);
    $(".add-frnd").css("display", "none");
    $(".follow-friend").css("display", "block");
    $(".top_heading").text("FRIENDS");
    $(".shh-screen").css("display", "none");

    localStorage.setItem("page", "allfollower");

    $(".ctgry-list-main").css("display", "none");
    localStorage.setItem("MenuFlag", "up");
});



$("#recentFollower").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "recentfollower");
    GetRecentFollowerList(start, end);
});
$("#allFollower").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "allfollower");
    GetAllFollowerList(start, end);
});




$("#getFollowers").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "allfollower");
    GetAllFollowerList(start, end);
});


var userId = localStorage.getItem("userId");
function GetAllFollowerList(start,end) {
   
        var inputdata = {
            "userId": userId,
            "start": start,
            "end": end
        };
        $.ajax({
            type: "GET",
            // url: "http://localhost:6269/Users/GetFollower",
            beforeSend: showLoader(),
            url: webservicesiteurl + "Users/GetAllFollower",

            data: inputdata,
            dataType: "json",

            success: function (data) {
                var HTML = "";
                var content = localStorage.getItem("htmlcontent");
                if (data.ResponseData.length > 0) {
                  

                    for (var i = 0; i < data.ResponseData.length; i++) {
                        var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                        HTML += "<div class='single-frnd-main'>"
                        HTML += "<div class='single-frnd'>"
                        HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                        HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                        HTML += "<div class='checkbox-list'><input type='checkbox' alt='access list'></div>"
                        HTML += "</div>"
                        HTML += "<div  id='unplug' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"
                        //console.log(data.ResponseData.length);
                    }
                    if (data.ResponseData.length >= 10) {
                        HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                    }
                    if (content == "new") {
                        $("#getfollowerList").html(HTML);
                    }
                    else
                        $("#getfollowerList").append(HTML);
                }
                if ($.trim($('.interest-topbar .top_heading').text()) == "WORD") {
                    $('.checkbox-list').show();
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



function GetRecentFollowerList(start, end)
{
      
        var inputdata = {
            "userId": userId,
            "start": start,
            "end": end
        };
        $.ajax({
            type: "GET",
            // url: "http://localhost:6269/Users/GetRecentFollower",
            beforeSend: showLoader(),
            url: webservicesiteurl + "Users/GetRecentFollower",

            data: inputdata,
            dataType: "json",

            success: function (data) {
                var HTML = "";
                var content = localStorage.getItem("htmlcontent");
                if (data.ResponseData.length > 0) {

                	  for (var i = 0; i < data.ResponseData.length; i++) {
                	      var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                          HTML += "<div class='single-frnd-main'>"
                          HTML += "<div class='single-frnd'>"
                          HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                          HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                          HTML += "<div class='checkbox-list'><input type='checkbox' alt='access list'></div>"
                          HTML += "</div>"
                          HTML += "<div  id='' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"
                          //console.log(data.ResponseData.length);
                	  }
                	  if (data.ResponseData.length >= 10) {
                	      HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                	  }
                	  if (content == "new") {
                	      $("#getfollowerList").html(HTML);
                	  }
                	  else
                	      $("#getfollowerList").append(HTML);

                }
                if ($.trim($('.interest-topbar .top_heading').text()) == "WORD") {

                    $('.checkbox-list').show();
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
