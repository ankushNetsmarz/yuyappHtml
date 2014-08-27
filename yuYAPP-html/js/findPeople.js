﻿   $(document).on("click", "#plug", function () {
               var friendId = $(this).attr("userId");
               
               AddFriend(friendId);

           });


$("#RequestOption").on("click", function () {
    $('.inner-pages').animate({
        'top': "0px" //moves up
    });
    $("#edit_profile,#see_profile").css("display", "none");
    GetPeopleRandom();
    $(".ctgry-list-main,.follow-friend,.notification").css("display", "none");
    $("#YAPP-Live").css("display", "none");
    $(".add-frnd").css("display", "block");
    $(".top_heading").text("FIND-FRIENDS");
    localStorage.setItem("MenuFlag", "up");

});


var userId = localStorage.getItem("userId");

function GetPeopleRandom() {
    var inputdata = {
        "userId": userId,
        "start": 1,
        "end": 100 
    };
    $.ajax({
        type: "GET",
     //   url: "http://localhost:6269/Users/GetPeopleRandom",
        url: "http://174.141.233.6/YuY/Users/GetPeopleRandom",
        beforeSend: showLoader(),
        data: inputdata,
        dataType: "json",

        success: function (data) {
          
            console.log(data);
            var HTML="";
          
            if (data.ResponseData.length > 0) {
               
                for (var i = 0; i < data.ResponseData.length; i++)

                {
                    var profilePicture = data.ResponseData[i].PicUrl;
                    var UserId = data.ResponseData[i].UserId;

         HTML += "<div class='plug-frnd-main'>"            
         HTML += "<div class='plug-frnd'>"
         HTML += "<div class='fl single-frnd-imgarea' ><img userId=" + UserId + "src=" + profilePicture + "></div>"
         HTML += "<div>"+ data.ResponseData[i].UserName+ "</div>"
         HTML += "</div>"
         HTML += "<div  id='plug' class='plug-btn-div' userId=" + data.ResponseData[i].UserId + "><button type='button' class='plug-btn'>PLUG</button></div></div>"
            //console.log(data.ResponseData.length);
       }
                $(".add-frnd-list").html(HTML);
}
          
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


function AddFriend(friendId) {

    var postData = {
        userId: userId,
        friendId: friendId,
    };
   
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
       // url: "http://localhost:6269/users/AddFriend",
       url: "http://174.141.233.6/YuY/users/AddFriend",
        data: postData,
        success: function (data) {
          
            console.log(data);
           GetPeopleRandom();
            //alert("success..." + data);
        },
        error: function (xhr) {
         
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}
