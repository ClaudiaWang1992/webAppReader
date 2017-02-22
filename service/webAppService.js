/**
 * Created by Administrator on 2017/1/15.
 */
//把后端原始数据进行转换，变成json形式传给前端
var fs = require('fs');

exports.get_test_data = function(){
    var content = fs.readFileSync('./mock/test.json','utf-8');
    return content;
}

exports.get_index_data = function(){
    var content = fs.readFileSync('./mock/home.json','utf-8');
    return content;
}

exports.get_book_data = function(id){
    if (!id) {
        id = "18218";
    }
    if(fs.existsSync('./mock/book/' + id + '.json')){
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
}

exports.get_categroy_data = function(){
    var content = fs.readFileSync('./mock/category.json','utf-8');
    return content;
}

exports.get_channel_data = function(){
    var content = fs.readFileSync('./mock/channel.json','utf-8');
    return content;
}

exports.get_female_data = function(){
    var content = fs.readFileSync('./mock/channel/female.json','utf-8');
    return content;
}

exports.get_male_data = function(){
    var content = fs.readFileSync('./mock/channel/male.json','utf-8');
    return content;
}

exports.get_rank_data = function(){
    var content = fs.readFileSync('./mock/rank.json','utf-8');
    return content;
}

exports.get_chapter_data = function(id){
    if(!id){
        id = '18218';
    }
    if(fs.existsSync('./mock/reader/chapter_'+id+'.json','utf-8')){
        return fs.readFileSync('./mock/reader/chapter_'+id+'.json','utf-8');
    }else{
        //return fs.readFileSync('./mock/reader/chapter_18218.json','utf-8');
    }
}

exports.get_chapter_content_data=function(chapter,id){
    if(!id){
        id='1';
    }
    var content = fs.readFileSync('./mock/reader/data_'+chapter+'/data'+id+'.json','utf-8');
    return content;
}
exports.get_search_data = function(start,end,keyword) {
    //异步的http的结口
    return function(cb){
        var http = require('http');
        //把一个object对象变成一个查询参数
        var qs = require('querystring');
        var data={
            s:keyword,
            start:start,
            end:end
        };
       // console.log(cb);
        var content = qs.stringify(data);
        var http_request ={
            hostname:'dushu.xiaomi.com',
            port:80,
            path:'/store/v0/lib/query/onebox?'+content,
            method:'GET'
        };
        req_obj = http.request(http_request,function(_res){
            var callback_content='';
            var _this = this;
            var content = '';
            _res.setEncoding('utf8');
            _res.on('data',function(chunk){
                content += chunk;
            });
            _res.on('end',function(e){
                cb(null,content);
            });
        });
        req_obj.on('error',function(){

        });
        req_obj.end();
    }
}
