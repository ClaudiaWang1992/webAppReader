/**
 * Created by Lenovo on 2017/1/23.
 */
var id = location.href.split('?id=').pop();
$.get('/ajax/book?id='+id,function(d){
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var headerOffset=$(".common-header").offset().height;
    var content_height = $(window).height()-headerOffset;
    new Vue({
        el:'#app',
        data:{
            content:d,
            screenWidth:windowWidth,
            content_height:content_height
        },
        methods:{
            readBook:function(){
                location.href="/reader?id="+id;
            }
        }
    });
},'json');