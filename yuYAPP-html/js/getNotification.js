function GetNotificationCount() {
    var postData = {
        userId: 1
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetNotificationCount",
        url: "http://174.141.233.6/YuY/posts/GetNotificationCount",
        data: postData,
        success: function (data) {
            debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}


var userId = localStorage.getItem("userId");
function GetNotification() {
    var postData = {
        userId: userId
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetNotification",
        url: "http://174.141.233.6/YuY/posts/GetNotification",
        data: postData,
        success: function (data) {

            
            var HTML = "";

            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {
                    HTML+= "<div class='single-notifi'>"
                    HTML+=  "<div class='fl notifi-by-user'><img src='images/user-pic-list.jpg' /></div>"
                    HTML += "<div class='fl notifi-text'><span>"+ data.ResponseData[i].UserName  + " " + "</span>" + data.ResponseData[i].Type+ "ed on your post"
                    HTML+=  "<div class='notifi-msg-ago'>"+ data.ResponseData[i].TimeSpan +"</div>"
                    HTML+=  "</div>"
                    HTML+= "<div class='clr'></div>"
                    HTML+=  "</div>"
                }

				$(".notify-list").html(HTML);
				}
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}
