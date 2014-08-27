/*Insert user post*/
function InsertPostImage() {
    var postData = {
        postedBy: "4", /*user who Post the status or the Post */
        postFileTitle: "This is My New Image", /*This is for both Post and status*/
        allowedUser: "",
        deniedUser: "",
        postType: "1", /*0 for Status, 1 for the Image,  2 for VIdeo*/
        file: "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",
        positiveAnnotation: "Good",
        negativeAnnotation: "Bad",
        extention: "png"
    };
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