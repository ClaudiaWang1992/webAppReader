/**
 * Created by Lenovo on 2017/1/27.
 */
var channel=location.href.split("/").pop();
$.get('/ajax/'+channel,function(d){
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var headerOffset=$(".common-header").offset().height;
    var content_height = $(window).height()-headerOffset;
    new Vue({
        el:"#app",
        data: {
            datas:d,
            content_height:content_height
        },
        method:{}
    });
},'json');