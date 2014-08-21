function UpdateNotification() {
    var postData = {
        userId: 1
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:6269/posts/UpdateNotification",
        //url: "http://174.141.233.6/YuY/posts/UpdateNotification",
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
