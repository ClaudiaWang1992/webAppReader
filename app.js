var koa = require('koa');
var controller = require('koa-route');
//返回koa的实例
var app = koa();
//views中间件
var views = require('co-views');
var render = views('./view',{
    map:{html:'ejs'}
});
var koa_static=require('koa-static-server');
var service = require('./service/webAppService.js');

app.use(koa_static({
    rootDir:'./static/',
    rootPath:'/static/',
    maxage:0
}));

app.use(controller.get('/route_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body= 'Hello world!';
}));

app.use(controller.get('/ejs_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body= yield render('test',{title:'title_test'});
}));

app.use(controller.get('/api_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body= service.get_test_data();
    console.log(this);
}));

app.use(controller.get('/',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('index',{title:'index_page'});
}));

app.use(controller.get('/book',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params=querystring.parse(this.req._parsedUrl.query);
    this.body = yield render('book',{title:'book_page'});
}));

app.use(controller.get('/categroy',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('categroy',{title:'categroy_page'});
}));

app.use(controller.get('/female',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('female',{title:'female'});
}));

app.use(controller.get('/male',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('male',{title:'male'});
}));

app.use(controller.get('/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('rank',{title:'rank_page'});
}));

app.use(controller.get('/reader',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.body = yield render('reader',{title:'rank_page',id:id});
}));

app.use(controller.get('/search',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('search',{title:'search_page'});
}));

app.use(controller.get('/user_center',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('user_center',{title:'user_center_page'});
}));



app.use(controller.get('/ajax/index',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/book',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params=querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id = "";
    }
    this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/categroy',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_categroy_data();
}));

app.use(controller.get('/ajax/female',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/male',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/chapter',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id=params.id;
    if(!id){
        id="";
    }
    this.body = service.get_chapter_data(id);
}));

app.use(controller.get('/ajax/chapter_data',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    var chapter = params.chapter;
    if(!id){
        id="";
    }
    this.body = service.get_chapter_content_data(chapter,id);
}));

app.use(controller.get('/ajax/search',function*(){
 this.set('Cache-Control','no-cache');
 var _this=this;
 var querystring = require('querystring');
 var params = querystring.parse(this.req._parsedUrl.query);
 var start = params.start;
 var end = params.end;
 var keyword = params.keyword;
 this.body = yield service.get_search_data(start,end,keyword);
 }));
/*app.use(controller.get('/ajax/search', function*(){
    this.set('Cache-Control', 'no-cache');
    var _this = this;
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start,end,keyword);
}));*/
app.listen(3001);
console.log("Koa server is started!");
