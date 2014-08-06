
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

var userId= localStorage.getItem("userId");
function GetAllFollowerList()
{
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
            var HTML="";
          
            if (data.ResponseData.length > 0) {
               
                for (var i = 0; i < data.ResponseData.length; i++) {


                    HTML += "<div class='single-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea'><img src='images/Syra-yousaf-profile-pictures.jpg'></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
					HTML += "<div><input type='checkbox' alt='access list'></div>"
                    HTML += "</div>"

                    //console.log(data.ResponseData.length);
                }
                $("#getfollowerList").html(HTML);
            }
          
            },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}



function GetRecentFollowerList() {
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


                    HTML += "<div class='single-frnd'>"
                    HTML += "<div class='fl single-frnd-imgarea'><img src='images/Syra-yousaf-profile-pictures.jpg'></div>"
                    HTML += "<div>" + data.ResponseData[i].UserName + "</div>"
                    HTML += "</div>"

                    //console.log(data.ResponseData.length);
                }
                $("#getfollowerList").html(HTML);
            }

            console.log(data);
            //console.log(data.ResponseData.length);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


