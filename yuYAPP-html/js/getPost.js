var userId = localStorage.getItem("userId");
        /*get user post*/
        function GetUserPost() {
            var postData = {
            	userId: userId,
                postType: 0,/*0 for status, 1 for Image, 2 for Videos*/
                start: 1,
                end: 10
            }
            $.ajax({
                type: "GET",
              //  url: "http://localhost:6269/posts/GetPosts",
                url: "http://174.141.233.6/YuY/posts/GetPosts",
                data: postData,
                success: function (data) {
                  
                    console.log(data);
                    var HTML = "";

                    if (data.ResponseData.length > 0) {

                        for (var i = 0; i < data.ResponseData.length; i++) {
                HTML+= "<div class='single-user'>"

                HTML += "<div class='user-title'> " + data.ResponseData[i].UserName;
                HTML+= "<div class='fl user-list-pic'><img src='images/user-pic-list.jpg' /></div>"
                HTML+=  data.ResponseData[i].Status + "</div>"
                HTML+=  "<div class='wordwall-btns'>"
                HTML+=  "<input type='button' class='like-btn' value='Like'>"
                HTML+=  "<input type='button' class='like-btn' value='Comment'>"
                HTML+=  "<input type='button' class='like-btn' value='Dislike'>"
                HTML+=  "</div>"
                HTML+=  "<div class='clr'></div>"
                HTML+=  "</div>"
                    //alert("success..." + data);
                        }
                        $(".list-area").html(HTML);
                    }

                    //console.log(data.ResponseData.length);
                },
                error: function (xhr) {
                   
                    alert(xhr.responseText);
                }
            });
        }
