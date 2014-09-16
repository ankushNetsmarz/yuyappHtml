
$("#NotificationOption").on("click", function () {

    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $(".shh-screen").css("display", "none");
    $(".notification").css("display", "block");
    $("#edit_profile").css("display", "none");
     newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");

    GetNotification(start, end);
    $(".add-frnd,.follow-friend").css("display", "none");
    $(".ctgry-list-main").css("display", "none");
    $(".top_heading").text("NOTIFICATIONS");
    localStorage.setItem("MenuFlag", "up");
});

var userId = localStorage.getItem("userId");
function GetNotificationCount() {
    var postData = {
        userId: userId
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetNotificationCount",
        url: webservicesiteurl + "posts/GetNotificationCount",
        data: postData,
        success: function (data) {
       
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
        	checkConnection();
           // alert(xhr.responseText);
        }
    });
}
$(document).on("click", "#notiLoad", function () {
    $(this).hide();

    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("htmlcontent", "append");
    start = parseInt(start) + 1;

    end = parseInt(end) + 10;
    GetNotification(start, end);
    localStorage.setItem("start", start);
    localStorage.setItem("end", end);


});

var userId = localStorage.getItem("userId");
function GetNotification(start, end) {
	//checkConnection();
    var postData = {
        userId: userId,
        page: start,
        RecsPerPage: end
    
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/GetNotification",
        url: webservicesiteurl + "posts/GetNotification",
        data: postData,
        success: function (data) {

            UpdateNotification();
            var HTML = "";
            var content = localStorage.getItem("htmlcontent");
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    var ProfilePicURL = webservicesiteurl + data.ResponseData[i].ProfilePic;
                    var annotation = data.ResponseData[i].Annotation;
                 
                    HTML += "<div class='single-notifi'>"
                    HTML += "<div class='fl notifi-by-user'><img src=" + ProfilePicURL + "></div>"
                    if (annotation == "") {
                        HTML += "<div class='fl notifi-text'><span>" + data.ResponseData[i].UserName + " " + "</span>" + " commented on your post"
                    }
                    else {
                        HTML += "<div class='fl notifi-text'><span>" + data.ResponseData[i].UserName + " " + "</span>" + " says " + "'" + data.ResponseData[i].Annotation + "'" + " on your post"
                    }
                    HTML += "<div class='notifi-msg-ago'>" + data.ResponseData[i].TimeSpan + "</div>"
                    HTML += "</div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "</div>"
                }
                if (data.ResponseData.length >= 10) {
                    HTML += "<div style='width: 100%;'><input id='notiLoad' type='button' value='Load more...' class='load-more-all'></div>"
                }
                if (content == "new") {
                    $(".notify-list").html(HTML);
                }
                else {
                    $(".notify-list").append(HTML);
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
