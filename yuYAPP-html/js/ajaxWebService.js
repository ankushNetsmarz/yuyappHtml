var mainUrl = "http://174.141.233.6/YuY/users/";
var webservicesiteurl = "http://174.141.233.6/YuY/";
//var webservicesiteurl = "http://174.141.233.6/YuY_Demo/";
//<!--http://174.141.233.6/YuY/UserData/ProfilePic/-->

function hideLoader() {

    $('.loader-bg').css("display", "none");
}

function showLoader() {

    $('.loader-bg').css("display", "block");


}
function newcall() {
    localStorage.setItem("start", 1);
    localStorage.setItem("end", 10);

    localStorage.setItem("htmlcontent", "new");

}

///*Ajax Call Custom Made Plugin*/
//(function ($) {
//    $.fn.ajaxcall = function (option, Callback) {
//        var defaults = {
//            HttpVerb: "GET",
//            Data: {},
//            async: true,
//            //  contentType: "application/json; charset=utf-8",
//            dataType: "json"
//        }

//        var settings = $.extend({}, defaults, option);

//        $.ajax({
//            type: settings.HttpVerb,
//            url: webservicesiteurl + settings.url,
//            contentType: settings.contentType,
//            data: settings.Data,
//            dataType: settings.dataType,
//            async: settings.async,
//            beforeSend: function () { showLoader(); },
//            complete: function () { hideLoader(); },
//            success: function (data) {
//                return Callback(data);
//            },
//            error: function (error) {
//                alert(error.status + "<--and--> " + error.statusText);
//            }
//        });
//    }
//})(jQuery)