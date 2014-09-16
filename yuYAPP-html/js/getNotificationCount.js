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
            // UpdateNotification()
          var value= data.ResponseData;
          if(value!=0)
        	  {
            $(".notify-badge").text(data.ResponseData);
        	  }
            console.log(data.ResponseData);
          
            //alert("success..." + data);
        },
        error: function (xhr) {
        	checkConnection();
            //alert(xhr.responseText);
        }
    });
}

function UpdateNotification() {
   
    var postData = {
        userId: userId
    }
    $.ajax({
        type: "GET",
       // url: "http://localhost:6269/posts/UpdateNotification",
        url: webservicesiteurl + "posts/UpdateNotification",
        data: postData,
        success: function (data) {
            //GetNotificationCount();
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
        	checkConnection();
          //  alert(xhr.responseText);
        }
    });
}

