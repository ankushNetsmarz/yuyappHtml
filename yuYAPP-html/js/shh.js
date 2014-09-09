


$(".generateKey").on("click", function () {
    Gen_AnonymousId();
});
$("#ShhhOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");
    var isall = "true";
    GetPostAnonymousList(isall);
    $(".ctgry-list-main,.follow-friend,.notification,.add-frnd").css("display", "none");
    $("#YAPP-Live").css("display", "none");
    $(".shh-screen").css("display", "block");
    $(".top_heading").text("FIND-FRIENDS");
    localStorage.setItem("MenuFlag", "up");

});


$("#allAnony").on("click", function () {

});
$("#ImageAnony").on("click", function () {

});
$("#VideoAnony").on("click", function () {

});
$("#nearYou").on("click", function () {

   
});
$("#worldwide").on("click", function () {

    var isall = "true";
    GetPostAnonymousList(isall)
});


function GetPostAnonymousList(isall) {
    //checkConnection();
    var postData = {
        userId: userId,
        start: 1,
        end: 10,
        posttype: 1,
        isall: isall
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/GetPostAnonymousList",
        url: webservicesiteurl + "posts/GetPostAnonymousList",
        data: postData,
        success: function (data) {
            //debugger;
            console.log(data);
            //alert("success..." + data);
        },
        error: function (xhr) {
            hideLoader();
            // alert(xhr.responseText);
        }
    });
}

function Gen_AnonymousId() {
   // alert(userId);
    var postData = {
        userId: userId
    }
    $.ajax({
        type: "GET",
        //url: "http://localhost:6269/posts/Gen_AnonymousId",
        url: webservicesiteurl + "posts/Gen_AnonymousId",
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