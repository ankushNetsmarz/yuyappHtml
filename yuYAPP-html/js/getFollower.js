﻿$("#accessButton").on("click", function () {
    //  $(".checkbox-list").css("display", "block");
    $(".checkbox-list").show();
    $(".ctgry-list-main").css("display", "none");
    $(".add-frnd").css("display", "none");
    $(".follow-friend").css("display", "block");
    $("#YAPP-Live").css("display", "none");


});


$("#FriendsOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");
    GetAllFollowerList();
    $(".add-frnd").css("display", "none");
    $(".follow-friend").css("display", "block");
    $(".top_heading").text("FRIENDS");

    $(".ctgry-list-main").css("display", "none");
    localStorage.setItem("MenuFlag", "up");
});



$("#recentFollower").on("click", function () {
   
    GetRecentFollowerList();
});
$("#allFollower").on("click", function () {
    GetAllFollowerList();
});




$("#getFollowers").on("click", function () {

    GetAllFollowerList();
});

var userId = localStorage.getItem("userId");
function GetAllFollowerList() {
   
        var inputdata = {
            "userId": userId,
            "start": 1,
            "end": 10
        };
        $.ajax({
            type: "GET",
            // url: "http://localhost:6269/Users/GetFollower",
            beforeSend: showLoader(),
            url: "http://174.141.233.6/YuY/Users/GetAllFollower",

            data: inputdata,
            dataType: "json",

            success: function (data) {
                var HTML = "";

                if (data.ResponseData.length > 0) {
                  

                    for (var i = 0; i < data.ResponseData.length; i++) {
                        var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;
                        HTML += "<div class='single-frnd-main'>"
                        HTML += "<div class='single-frnd'>"
                        HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                        HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                        HTML += "<div class='checkbox-list'><input type='checkbox' alt='access list'></div>"
                        HTML += "</div>"
                        HTML += "<div  id='unplug' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"
                        //console.log(data.ResponseData.length);
                    }
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                    $("#getfollowerList").html(HTML);
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



function GetRecentFollowerList() 
{
      
        var inputdata = {
            "userId": userId,
            "start": 1,
            "end": 10
        };
        $.ajax({
            type: "GET",
            // url: "http://localhost:6269/Users/GetRecentFollower",
            beforeSend: showLoader(),
            url: "http://174.141.233.6/YuY/Users/GetRecentFollower",

            data: inputdata,
            dataType: "json",

            success: function (data) {
                var HTML = "";

                if (data.ResponseData.length > 0) {

                	  for (var i = 0; i < data.ResponseData.length; i++) {
                          var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;
                          HTML += "<div class='single-frnd-main'>"
                          HTML += "<div class='single-frnd'>"
                          HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                          HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                          HTML += "<div class='checkbox-list'><input type='checkbox' alt='access list'></div>"
                          HTML += "</div>"
                          HTML += "<div  id='' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"
                          //console.log(data.ResponseData.length);
                      }
                    $("#getfollowerList").html(HTML);
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
