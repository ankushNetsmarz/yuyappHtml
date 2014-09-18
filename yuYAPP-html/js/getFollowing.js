

$("#recentFollowing").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "recentfollowing");
    GetRecentFollowingList(start, end);
});
$("#allFollowing").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "allfollowing");
    GetAllFollowing(start, end);
});


$("#GetFollowingList").on("click", function () {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "allfollowing");
    GetAllFollowing(start, end);
});

var userId = localStorage.getItem("userId");
function GetAllFollowing(start, end) {
    //checkConnection();
    var inputdata = {
        "userId": userId,
        "start": start,
        "end": end
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),

        url: webservicesiteurl + "Users/GetAllFollowing",
        data: inputdata,
        dataType: "json",

        success: function (data) {


            var HTML = "";

            if (data.ResponseData.length > 0) {
                var content = localStorage.getItem("htmlcontent");
                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;

                    HTML += "<div class='single-frnd-main'>"
                    HTML += "<div class='single-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                    HTML += "</div>"
                    HTML += "<div  id='unplug' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"

                    //console.log(data.ResponseData.length);
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $("#getfollowingLists").html(HTML);
                }
                else
                    $("#getfollowingLists").append(HTML);

            }

            if ($.trim($('.interest-topbar .top_heading').text()) == "WORD") {
                $('.checkbox-list').show();
            }
            //console.log(data.ResponseData.length);
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

//Get Recent following users
function GetRecentFollowingList(start, end) {
    //checkConnection();
    var inputdata = {
        "userId": userId,
        "start": start,
        "end": end
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/Users/GetRecentFollowing",
        url: webservicesiteurl + "Users/GetRecentFollowing",
        data: inputdata,
        dataType: "json",

        success: function (data) {
            var HTML = "";

            if (data.ResponseData.length > 0) {
                var content = localStorage.getItem("htmlcontent");
                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;

                    HTML += "<div class='single-frnd-main'>"
                    HTML += "<div class='single-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
<<<<<<< HEAD
                    HTML += "<div class='checkbox-list'><input Userid=" + data.ResponseData[i].UserId + "   type='checkbox' alt='access list'></div>"
=======
>>>>>>> origin/master
                    HTML += "</div>"
                    HTML += "<div  id='unplug' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"

                    //console.log(data.ResponseData.length);
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $("#getfollowingLists").html(HTML);
                }
                else
                    $("#getfollowingLists").append(HTML);
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
var UserIdArray = [];
//$(document).on("click", ".checks", function () {
  
//    //var SelectedCheckBox = $(this).attr("Userid");
//    //alert(SelectedCheckBox);

  


//    if (!$(this).is(':checked')) {
//        UncheckedUserId = $(this).attr("Userid");
//        alert(UncheckedUserId);
//       // UserIdArray.push(SelectedCheckBox);


//    }
//    //else {
//    //   // UserIdArray.splice($.inArray(SelectedCheckBox, UserIdArray), 1);
//    //}

//});



$(document).on("click", ".unplug-btn-div", function () {
    var friendId = $(this).attr("userId");


    function onConfirm(buttonIndex) {
        if (buttonIndex == 1) {

            SetUnFriend(friendId);

        }

    }

    navigator.notification.confirm(
        'Do you want to unplug? ', // message
         onConfirm,            // callback to invoke with index of button pressed
        'YUYApp',           // title
        ['ok', 'cancel']     // buttonLabels
    );
});

$(document).on("click", "#loadMore", function () {
    for (i = 0; i < UserIdArray.length; i++) {
        alert(UserIdArray[i]);
    }

});




function GetAllFollowings(start, end) {
    //checkConnection();
    var inputdata = {
        "userId": userId,
        "start": start,
        "end": end
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),

        url: webservicesiteurl + "Users/GetAllFollower",
        data: inputdata,
        dataType: "json",

        success: function (data) {


            var HTML = "";

            if (data.ResponseData.length > 0) {
                var content = localStorage.getItem("htmlcontent");
                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;

                    HTML += "<div class='post-user-frnd-main'> "
                    HTML += "<div class='post-user-frnd'>"
                    HTML += " <div class='fl single-frnd-imgarea'>"
                    HTML += " <img src=" + ProfilePicURL + ">"
                    HTML += " </div> "
                    HTML += "<div>"+ data.ResponseData[i].UserName +"</div> "
                    HTML += "<div class='checkbox-list'><input Userid=" + data.ResponseData[i].UserId + " class='checks' type='checkbox' checked alt='access list'></div></div></div> "


                    //console.log(data.ResponseData.length);
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $("#postAccess").html(HTML);
                }
                else
                    $("#postAccess").append(HTML);

            }


            //console.log(data.ResponseData.length);
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
