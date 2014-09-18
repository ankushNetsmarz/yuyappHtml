

$("#postStatus").on("click", function () {



    var post = $("#InsertStatusTextBox").val();

    if (post != "") {
        $("#firstAnnotate").val('');
        $("#SecondAnnotate").val('');
        $("#postStatusPopup").css("display", "block");
        $("#popupInsertTextBox").val(post);
    }
    else {
        window.plugins.toast.show('Enter your status!', 'long', 'center', function (a) { }, function (b) { });
    }

});


$("#postNext").on("click", function () {
    

     if ($("#firstAnnotate").val() == '') {
       window.plugins.toast.show('Enter Annotations for a feed!', 'long', 'center', function (a) { }, function (b) { });

      }

     else  if ($("#SecondAnnotate").val() == '') {
        window.plugins.toast.show('Enter Annotations for a feed!', 'long', 'center', function (a) { }, function (b) { });

     }
      else
        {
    newcall();
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    localStorage.setItem("page", "allfollowings");
    GetAllFollowings(start, end);
    $("#denied").css("display", "block");
  
   }
});

$("#crossStatus").on("click", function () {
    $("#InsertStatusTextBox").val('');
    $("#postStatusPopup").css("display", "none");

});

/*Insert user post*/
var userId = localStorage.getItem("userId");

function InsertStatus(UncheckedUser) {

    var postData = {
        postedBy: userId, /*user who Post the status or the Post */
        postFileTitle: $("#popupInsertTextBox").val(), /*This is for both Post and status*/
        allowedUser: "0",
        description: "",
        deniedUser: UncheckedUser,
        postType: "0",/*0 for Status, 1 for the Image,  2 for VIdeo*/
        positiveAnnotation: $("#firstAnnotate").val(),
        negativeAnnotation: $("#SecondAnnotate").val()
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //    url: "http://localhost:6269/posts/add",
        url: webservicesiteurl + "posts/add",
        data: postData,
        success: function (data) {
            newcall();
            var start = localStorage.getItem("start");
            var end = localStorage.getItem("end");
            $("#postStatusPopup").css("display", "none");
            GetUserPost(start, end);


            $("#InsertStatusTextBox").val('');
            window.plugins.toast.show('Feed Added!', 'long', 'center', function (a) { }, function (b) { });


            //alert("success..." + data);
        },
        error: function (xhr) {

            hideLoader();
            // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


$(document).on("click", "#Button2", function () {

    UncheckedUser = "";

    $(".checks").each(function () {
        if (!$(this).is(':checked')) {
            UncheckedUser += $(this).attr("Userid") + ",";

        }
    });

    if (UncheckedUser != "") {
        UncheckedUser = UncheckedUser.slice(0, -1);
    }
    // alert(UncheckedUser);
   InsertStatus(UncheckedUser);
   $("#InsertStatusTextBox").val('');
   $("#postStatusPopup").css("display", "none");
   $("#denied").css("display", "none");

});


$(document).on("click", "#backAccess", function () {
    $("#denied").css("display", "none");
    $("#postStatusPopup").css("display", "block");
});

/*Add comment on the post*/
function InsertPostComment(postIdForComment) {
    //checkConnection();
    var commentMessage = $("#InsertStatusTextBoxComments").val();

    var postData = {
        postId: postIdForComment,
        userId: userId,
        comment: commentMessage
    };
    $.ajax({
        type: "Post",
        beforeSend: showLoader(),
        // url: "http://localhost:6269/posts/addcomments",
        url: webservicesiteurl + "posts/AddComments",
        data: postData,
        success: function (data) {

            console.log(data);
            $("#InsertStatusTextBoxComments").val('');

            newcall();
            var start = localStorage.getItem("start");
            var end = localStorage.getItem("end");
            var postId = localStorage.getItem("postId");
            GetPostComments(postId, start, end);

            //  localStorage.setItem("span","comment")

            //alert("success..." + data);
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

