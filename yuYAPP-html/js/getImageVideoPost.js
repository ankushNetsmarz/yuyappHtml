
var userId = localStorage.getItem("userId");

function GetPostAnonymousList() {
    var postData = {
        userId: userId,
        start: 1,
        end: 10,
        isall: false
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetPostAnonymousList",
       url: "http://174.141.233.6/YuY/posts/GetPostAnonymousList",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}

/*get GetPostNonAnonymousList for Shhh */
function GetPostNonAnonymousList() {
    var postData = {
        userId: userId,
        start: 1,
        end: 10,
        isall: false
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetPostNonAnonymousList",
        url: "http://174.141.233.6/YuY/posts/GetPostNonAnonymousList",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}

/*Set Unfriend*/
function SetUnFriend() {
    var postData = {
        userId: userId,
        friendId: 2
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/SetUnFriend",
        url: "http://174.141.233.6/YuY/posts/SetUnFriend",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            debugger;
            alert(xhr.responseText);
        }
    });
}
