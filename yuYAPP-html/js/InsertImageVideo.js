/*Insert user post*/
function InsertPostImage(imageURLs) {
	
   
	var title= $("#UploadTitle").val();
	var description= $("#UploadDescription").val();
	var a1= $("#Upload1Annotate").val();
	var a2= $("#Upload2Annotate").val();
	
    var postData = {
    		
        postedBy: 1, /*user who Post the status or the Post */
        postFileTitle: title, /*This is for both Post and status*/
        description: description,
        allowedUser: "",
        deniedUser: "",
        postType: "1", /*0 for Status, 1 for the Image,  2 for VIdeo*/
        file: imageURLs,
        positiveAnnotation: a1,
        negativeAnnotation: a2,
        extention: "png"
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/add",
        url: "http://174.141.233.6/YuY/posts/add",
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
    }).done(function () {
        hideLoader();
    });
}


function InsertPostVideo() {
    debugger;
    var files = $("#file1").get(0).files;
    if (files.length > 0) {
        var postData = new FormData();
        postData.append("postedBy", 4); /*user who Post the status or the Post */
        postData.append("postFileTitle", "This is My New Video"); /*This is for both Post and status*/
        postData.append("allowedUser", "5,6");
        postData.append("deniedUser", "7");
        postData.append("postType", "2"); /*0 for Status, 1 for the Image,  2 for VIdeo*/
        postData.append("file", files[0]);
        postData.append("positiveAnnotation", "Good");
        postData.append("negativeAnnotation", "Bad");
        postData.append("extention", "png");
        $.ajax({
            type: "POST",
            url: "http://localhost:6269/posts/add",
            //url: "http://174.141.233.6/YuY/posts/add",
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
}