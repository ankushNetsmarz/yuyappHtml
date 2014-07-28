

function GetAllFollowing() {
    var inputdata = {
        "userId": 4,
        "start": 1,
        "end": 10
    };
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/Users/GetFollowing",
        url: "http://174.141.233.6/YuY/Users/GetAllFollowing",
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
                $("#getfollowingLists").html(HTML);
            }

            //console.log(data.ResponseData.length);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

//Get Recent following users
function GetRecentFollowingList() {
    var inputdata = {
        "userId": 4,
        "start": 1,
        "end": 10
    };
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/Users/GetRecentFollowing",
        url: "http://174.141.233.6/YuY/Users/GetRecentFollowing",
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
                $("#getfollowingLists").html(HTML);
            }

            //console.log(data.ResponseData.length);

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}