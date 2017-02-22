/**
 * Created by Lenovo on 2017/2/4.
 */
var windowWidth = $(window).width();
if(windowWidth<320){
    windowWidth = 320;
}
var headerOffset=$(".common-header").offset().height;
var content_height = $(window).height()-headerOffset;
new Vue({
        el:"#app_search",
        data:{
            search:[],
            condition:true,
            empty:false,
            screen_width: windowWidth,
            content_height:content_height
        },
        methods:{
            doSearch:function(e){
                var keyword = $("#search_box").val();
                var _this=this;
                $.get('/ajax/search',{
                    keyword:keyword,
                    start:0,
                    end:100
                },function(d){
                    _this.condition=false;
                    _this.search= d.items;
                    if(_this.search.length==0){
                        _this.empty = true;
                    }else{
                        _this.empty = false;
                    }
                },'json');
            }
        }
});