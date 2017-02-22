/**
 * Created by Lenovo on 2017/1/27.
 */
$.get('/ajax/rank',function(d){
    for(var i=0;i< d.items.length;i++){
        d.items[i].description = d.items[i].description.split('\n');
    }
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var headerOffset=$(".common-header").offset().height;
    var content_height = $(window).height()-headerOffset;
    new Vue({
        el: '#app',
        data: {
            datas:d,
            content_height:content_height
        }
    });
},'json');