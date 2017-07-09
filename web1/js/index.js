/**
 * Created by Administrator on 2017/7/9.
 */




$(function () {


    console.log('ddddddddddddd');




    $.ajax({
        type: 'post',
        url: 'http://route.showapi.com/852-1',
        dataType: 'jsonp',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": '41714',
            "showapi_sign": 'e9e47a2df55e41c5acf8df09a72c9cfe'

        },
        jsonp: 'jsonpcallback',
        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {

            // console.log(result.showapi_res_body.list[3].list)


            var temp=result.showapi_res_body.list[3].list;
            for(var i=0;i<temp.length;i++){




                $('.nav-right ul ').append(' <li><a href="index.html?type='+temp[i].id+'">'+temp[i].name+'</a></li>');


            }



        }
    });
    console.log('bbbbbbbbbbbbbb');



//    请求图片数据



    //获取URL的参数
    // window.location.search

   var typeTemp=   GetQueryString('type');
    getPhoto(typeTemp,1);



});


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


function getPhoto(type,page) {


    $.ajax({
        type: 'get',
        url: 'http://route.showapi.com/852-2',
        dataType: 'jsonp',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": '41714',
            "showapi_sign": 'e9e47a2df55e41c5acf8df09a72c9cfe',
            "type":type,
            "page":page

        },
        jsonp: 'jsonpcallback',
        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {



            //403 (Forbidden)图片权限错误【图片跨域权限】
            //使用JS库解决
            //https://github.com/jpgerek/referrer-killer
            var contentLists=result.showapi_res_body.pagebean.contentlist;

            for(var i=0;i<contentLists.length;i++){
                var str='<li>'+
                    '<div class="content-img">'+
                    ReferrerKiller.imageHtml(contentLists[i].list[0].middle,{
                   width: '235px',
                height: '350px'
                    })+
                    '</div>'+
                    '<div class="content-info">'+
                    '<a href="#">'+contentLists[i].title+'</a>'+
                    '</div>'+
                    '</li>';
                $('.content ul').append(str);
            }










        }
    });

}


function formatterDateTime() {
    var date = new Date()
    var month = date.getMonth() + 1
    var datetime = date.getFullYear()
        + ""// "年"
        + (month >= 10 ? month : "0" + month)
        + ""// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate())
        + ""
        + (date.getHours() < 10 ? "0" + date.getHours() : date
            .getHours())
        + ""
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
            .getMinutes())
        + ""
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
            .getSeconds());
    return datetime;
}