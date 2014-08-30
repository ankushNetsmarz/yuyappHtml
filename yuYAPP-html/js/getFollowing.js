

$("#recentFollowing").on("click", function () {
    GetRecentFollowingList();
});
$("#allFollowing").on("click", function () {
    GetAllFollowing();
});


$("#GetFollowingList").on("click", function () {
    GetAllFollowing();
});

var userId = localStorage.getItem("userId");
function GetAllFollowing() {
    //checkConnection();
    var inputdata = {
        "userId": userId,
        "start": 1,
        "end": 10
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),

        url: "http://174.141.233.6/YuY/Users/GetAllFollowing",
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
                    HTML += "<div class='checkbox-list'><input Userid=" + data.ResponseData[i].UserId + " class='checks'  type='checkbox' alt='access list'></div>"
                    HTML += "</div>"
                    HTML += "<div  id='' class='unplug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='unplug-btn'>UNPLUG</button></div></div>"

                    //console.log(data.ResponseData.length);
                }
                HTML += "<div style='width: 100%;'><input type='button' value='Load more...' class='load-more-all'></div>"
                $("#getfollowingLists").html(HTML);
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
function GetRecentFollowingList() {
    //checkConnection();
    var inputdata = {
        "userId": userId,
        "start": 1,
        "end": 10
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/Users/GetRecentFollowing",
        url: "http://174.141.233.6/YuY/Users/GetRecentFollowing",
        data: inputdata,
        dataType: "json",

        success: function (data) {
            var HTML = "";

            if (data.ResponseData.length > 0) {
             
                for (var i = 0; i < data.ResponseData.length; i++) {
                	   var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;

                    HTML += "<div class='single-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea'><img src=" + ProfilePicURL + "></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                    HTML += "<div class='checkbox-list'><input Userid=" + data.ResponseData[i].UserId + " class='checks' type='checkbox' alt='access list'></div>"
                    HTML += "</div>"

                    //console.log(data.ResponseData.length);
                }
                $("#getfollowingLists").html(HTML);
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
$(document).on("click", ".checks", function () {
    var SelectedCheckBox = $(this).attr("Userid");

    if ($(this).is(':checked')) {
        SelectedCheckBox = $(this).attr("Userid");

        UserIdArray.push(SelectedCheckBox);


    }
    else {
        UserIdArray.splice($.inArray(SelectedCheckBox, UserIdArray), 1);
    }


});


$(document).on("click", "#loadMore", function () {
    for (i = 0; i < UserIdArray.length; i++) {
        alert(UserIdArray[i]);
    }

});