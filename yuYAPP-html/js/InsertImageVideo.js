var userId = localStorage.getItem("userId");

/*Insert user post*/
function InsertPostImage(imageURLs) {
	
   
	var title= $("#UploadTitle").val();
	var description= $("#UploadDescription").val();
	var a1= $("#Upload1Annotate").val();
	var a2= $("#Upload2Annotate").val();
	
    var postData = {
    		
        postedBy: userId, /*user who Post the status or the Post */
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
        	 $("#UploadTitle").val('');
        	 $("#UploadDescription").val('');
        	 $("#Upload1Annotate").val('');
        	$("#Upload2Annotate").val('');
            window.plugins.toast.show('Feed Added!', 'long', 'center', function (a) { }, function (b) { });
            
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

