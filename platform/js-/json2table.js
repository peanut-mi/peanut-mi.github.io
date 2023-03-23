// window.onload = function(){
//     $.getJSON("json/apt.json", function json2table(datas){
//     var htmlstr="";
//     for(var i=0; i<datas.length; i++){
//         var data=datas[i];
//         htmlstr += "<tr>";
//         htmlstr += "<td>"+data["Dst IP"]+"</td>";
//         htmlstr += "<td>"+data["Dst Port"]+"</td>";
//         htmlstr += "<td>"+data["Flow Duration"]+"</td>";
//         htmlstr += "<td>"+data["Flow ID"]+"</td>";
//         htmlstr += "<td>"+data["Protocol"]+"</td>";
//         htmlstr += "<td>"+data["Src IP"]+"</td>";
//         htmlstr += "<td>"+data["Src Port"]+"</td>";
//         htmlstr += "<td>"+data["Timestamp"]+"</td>";
//         htmlstr += "</tr>";
//     }
//     document.getElementById("tbody-apt").innerHTML=htmlstr;

// })
// }
var Ajax = function ()
{
    $.getJSON ("js/apt.json", function (data)
    {
        $.each (data, function (i, item)
        {
           console.log(item.name);
        });
    });
}();

$.ajax({
    url: "js/apt.json",//json文件位置，文件名
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法 
       //给info赋值给定义好的变量
       var pageData=data;
       for(var i=0;i<data.length;i++){
           console.log(pageData[i].name);
       }
    }
})

