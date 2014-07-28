function GetPeopleRandom() {
    var inputdata = {
        "userId": 4,
        "start": 1,
        "end": 10
    };
    $.ajax({
        type: "GET",
     //   url: "http://localhost:6269/Users/GetPeopleRandom",
         url: "http://174.141.233.6/YuY/Users/GetPeopleRandom",
        data: inputdata,
        dataType: "json",

        success: function (data) {
          
            console.log(data);
            var HTML="";
          
            if (data.ResponseData.length > 0) {
               
                for (var i = 0; i < data.ResponseData.length; i++) {

         HTML += "<div class='plug-frnd-main'>"            
         HTML += "<div class='plug-frnd'>"
         HTML += "<div class='fl single-frnd-imgarea'><img src=''></div>"
         HTML += "<div>"+ data.ResponseData[i].UserName+ "</div>"
         HTML += "</div>"
         HTML += "<div  id='plug' class='plug-btn-div'><button type='button' class='plug-btn'>PLUG</button></div></div>"
            //console.log(data.ResponseData.length);
       }
                $(".add-frnd-list").html(HTML);
}
          
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}


function AddFriend() {
    var postData = {
        userId: 4,
        friendId: 13,
    };
    $.ajax({
        type: "POST",
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
    });
}
