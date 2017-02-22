/**
 * Created by Administrator on 2017/1/18.
 */
$.get('ajax/index',function(d){
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var offset =$($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;
    var headerOffset=$(".header-tab").offset().height;
    var content_height = $(window).height()-headerOffset;
    new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            index_header_tab_width:index_header_tab_width,
            content_height:content_height,
            //共有多少张轮播图
            topNum: d.items[0].data.count,
            banner_left:-windowWidth,
            banner_num:1,
            top: d.items[0].data.data,
            hot: d.items[1].data.data,
            recommend: d.items[2].data.data,
            female: d.items[3].data.data,
            male: d.items[4].data.data,
            free: d.items[5].data.data,
            topic: d.items[6].data.data,
            duration:0,
            position:0,
            header_position:0,
            header_duration:0,
            tab_1_class:'Swipe-tab__on',
            tab_2_class:'',
            tab_class:'',
            /*styleObject:{
                height:content_height+'px',
                overflow:'hidden',
                width:windowWidth*2+'px',
                transitionDuration:'.5s',
                transform:"translate3d("+this.position+'px'+",0px,0px)"
            }*/
        },
        computed:{
            styleObject:function(){
                return{
                    height:this.content_height+'px',
                    overflow:'hidden',
                    width:this.screen_width*2+'px',
                    transitionDuration:'.5s',
                    transform:"translate3d("+this.position+'px'+",0px,0px)"
                }
            },
            bannerObject:function(){
                return{
                    width:this.screen_width*(this.topNum+2)+'px',
                    height:'100%',
                    transitionDuration:this.duration+'s',
                    transform:'translate3d('+this.banner_left+'px,0px,0px)'
                }
            }
        },
        methods:{
            tabSwitch:function(pos){
                this.duration = 0.5;
                this.header_duration = 0.5;
                if(pos == 0){
                    this.position = 0;
                    this.header_position = 0;
                    this.tab_1_class = 'Swipe-tab__on';
                    this.tab_2_class = '';
                }else{
                    this.position=(-windowWidth);
                    this.header_position=index_header_tab_width;
                    this.tab_2_class = "Swipe-tab__on";
                    this.tab_1_class ="";
                }
            },
            bannerSlide:function(){
                    this.duration=0.5;
                    this.banner_left =-this.banner_num*this.screen_width;
                    $(".banner-tab a").eq(this.banner_num-1).addClass("tab_on").siblings().removeClass("tab_on");
                    if(this.banner_num > this.topNum){
                        this.duration=0;
                        this.banner_num = 0;
                        this.banner_left =-this.banner_num*this.screen_width;
                        setTimeout(this.bannerSlide,0);
                    }else{
                        setTimeout(this.bannerSlide,5000);
                    }
                   // console.log( $(".banner-tab a").length);
                    this.banner_num++;
                   // console.log(this.banner_num);
                    //this.bannerSlide();

            }
        }
    })
},'json');
