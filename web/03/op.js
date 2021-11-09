/*获取真实返回路径*/
function getPath(id) {
    var imgURL = "";
    var node=document.getElementById(id);
    try{
        var file = null;
        if(node.files && node.files[0] ){
            file = node.files[0];
        }else if(node.files && node.files.item(0)) {
            file = node.files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
            //Firefox7.0
            imgURL =  file.getAsDataURL();
            //alert("//Firefox7.0"+imgRUL);
        }catch(e){
            //Firefox8.0以上
            imgURL = window.URL.createObjectURL(file);
            //alert("//Firefox8.0以上"+imgRUL);
        }
    }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (node.files && node.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(node.files[0]);
        }
    }
    return imgURL;
}

//
function closediv(){
    document.getElementById('TVedit').style.display = 'none';
}
function showdiv(){
    document.getElementById('TVedit').style.display = 'block';
}

//删除行
function deleteRow(deleteButton){
    var currentIndex = deleteButton.parentNode.parentNode.rowIndex;
    var TVtable = document.getElementById('TVlist');
    TVtable.deleteRow(currentIndex);
}
//在Index位置添加行，默认添加在首个数据行
function appendRow(index){

    var tvtable = document.getElementById('TVlist');
    //添加的位置索引
    var row = tvtable.insertRow(index);

    var tvpicture = row.insertCell(0);//必须从0开始，不然会没法显示
    var tvname = row.insertCell(1);
    var tvtype = row.insertCell(2);
    var tvguider = row.insertCell(3);
    var tvplayers = row.insertCell(4);
    var tvstory = row.insertCell(5);
    var editcell = row.insertCell(6);
    var deletecell = row.insertCell(7);

    var path = getPath('fileUpload');
    console.log(path);
    tvpicture.innerHTML='<img src="'+path+'">';
    // 由于浏览器的安全机制，input file的路径时被fakepath代替，隐藏了真实物理路径。

    tvname.innerHTML=document.getElementById('name').value;
    tvtype.innerHTML=document.getElementById('type').value;
    tvguider.innerHTML=document.getElementById('guider').value;
    tvplayers.innerHTML=document.getElementById('players').value;
    tvstory.innerHTML=document.getElementById('story').value;
    editcell.innerHTML = "<td><button value='TVedit' onclick='edit(this);'><a href='#TVedit'>编辑</a></button></td>";
    deletecell.innerHTML = "<button value='TVdelete' onclick='deleteRow(this)'>删除</button>";

     
    alert('信息已经提交到表单里');
}

//清空
function clearAll(){
    document.getElementById('name').value=null;
    document.getElementById('type').value=null;
    document.getElementById('guider').value=null;
    document.getElementById('players').value=null;
    document.getElementById('story').value=null;
}

//编辑
function edit(editButton){
    document.getElementById('TVedit').style.display = 'block';
   
    var table = document.getElementById('TVlist');
    var index = editButton.parentNode.parentNode.rowIndex;

    var info = document.getElementsByName('tv');//表单标签栏，被填写部分
    var elements = ['picture', 'name', 'type', 'guider', 'players', 'story'];
    
    //图片部分
    console.log(table.rows[index].cells[0].src);

    //文字部分
    var i;
    for(i=0; i<info.length-1; i++){
        console.log(table.rows[index].cells[i].innerHTML);
        info[i].value = table.rows[index].cells[i+1].innerHTML;
        
    }
    console.log(table.rows[index].cells[i].innerHTML);
    info[i].innerHTML = table.rows[index].cells[i+1].innerHTML;

    deleteRow(editButton);
}

//非空检查
function nullcheck(editbutton){
    var info = document.getElementsByName('tv');
    
    for(var i=0; i<info.length; i++){
        if(info[i].value == null || info[i].value == undefined || info[i].value == ''){
            console.log(info[i].value);
            alert('表单没有填写完整啊！');
            return false;
        }
    }

    return true;
}
