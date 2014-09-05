
$("#NotificationOption").on("click", function () {

    GetNotification();
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $(".notification").css("display", "block");
    $("#edit_profile").css("display", "none");
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
        url: "http://174.141.233.6/YuY/posts/GetNotificationCount",
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


var userId = localStorage.getItem("userId");
function GetNotification() {
	//checkConnection();
    var postData = {
        userId: userId,
        page: 1,
        RecsPerPage: 10
    
    }
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/GetNotification",
        url: "http://174.141.233.6/YuY/posts/GetNotification",
        data: postData,
        success: function (data) {

            
            var HTML = "";

            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                	   var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;
                       
                    HTML += "<div class='single-notifi'>"
                    HTML += "<div class='fl notifi-by-user'><img src="+ ProfilePicURL+ "/></div>"
                    HTML += "<div class='fl notifi-text'><span>" + data.ResponseData[i].UserName + " " + "</span>" + data.ResponseData[i].Type + "d your post"
                    HTML += "<div class='notifi-msg-ago'>" + data.ResponseData[i].TimeSpan + "</div>"
                    HTML += "</div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "</div>"
                }

                $(".notify-list").html(HTML);
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
