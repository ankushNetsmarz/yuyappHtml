
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
        userId: 1,
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
            var HTML = "";
           
            if (data.ResponseData.length > 0) {

                for (var i = 0; i < data.ResponseData.length; i++) {


                    var PostFileURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].PostFileURL;
                    var ProfilePicURL = "http://174.141.233.6/YuY/" + data.ResponseData[i].ProfilePic;

                    HTML += "<div class='single-upload'>"
                    HTML += "<div class='upload-title'>"
                    HTML += "<div class='fl upload-user-pic'>"
                    HTML += "<img src=" + ProfilePicURL + "></div>"
                    HTML += "<div class='fl user-name-title'>" + data.ResponseData[i].UserName + "<br><span>("+ data.ResponseData[i].TimeSpan +")</span></div>"
                    HTML += "<div class='clr'></div>"
                    HTML += "<div>"
                    HTML += "<div class='uploaded-pic'> <img src=" + PostFileURL + "></div>"
                    HTML += "<p><strong>" + data.ResponseData[i].Status + "</p>"
                    HTML += "<p>" + data.ResponseData[i].Description + "</p> </div></div>"
                    HTML += "<div class='wordwall-btns'>"
                    HTML += "<input type='button' value=" + data.ResponseData[i].PositiveAnnotation + " class='like-btn' id=''>"
                    HTML += "<input type='button' value='Comment' class='like-btn' id=''>"
                    HTML += "<input type='button' value=" + data.ResponseData[i].NegativeAnnotation + " class='like-btn' id=''>"
                    HTML += "</div><div class='clr'></div></div><div class='clr'></div>"

                    $(".upload-area").html(HTML);
                }
                  
                }
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
