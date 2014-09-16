var userId = localStorage.getItem("userId");

/*Insert user post*/
function InsertPostImage(imageURLs) {
 	//checkConnection();
   
	var title= $("#UploadTitle").val();
	var description= $("#UploadDescription").val();
	var a1= $("#Upload1Annotate").val();
	var a2= $("#Upload2Annotate").val();
	var anony=  localStorage.getItem("isAnonymous");
	
    var postData = {
    		
        postedBy: userId, /*user who Post the status or the Post */
        postFileTitle: title, /*This is for both Post and status*/
        description: description,
        allowedUser: "",
        deniedUser: "",
        postType: "1", /*0 for Status, 1 for the Image,  2 for VIdeo*/
        isanonymous:anony,
        file: imageURLs,
        positiveAnnotation: a1,
        negativeAnnotation: a2,
        extention: "png"
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:6269/posts/add",
        url: webservicesiteurl + "posts/add",
        data: postData,
        success: function (data) {
            debugger;
            console.log(data);
        	 $("#UploadTitle").val('');
        	 $("#UploadDescription").val('');
        	 $("#uploadScreen").css("display","none");
        	 var isall=true;
        	 var  posttype= 0;
        	 var start=1;
        	 var end=10;
        	GetPostNonAnonymousList(isall, posttype, start, end);
            window.plugins.toast.show('Feed Added!', 'long', 'center', function (a) { }, function (b) { });
            
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

