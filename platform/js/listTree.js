
var setting = {
    view: {
        dblClickExpand: false
    },
    check: {
        enable: false
    }

};
var zNodes =[
    {"id":0,"name":"网络概况","open":true,icon:"img/home.png",children:[
        { "id":1,"pid":0, "name":"网络概况","open":true, icon:"img/point.png",
          
        },
        {"id":2,"pid":0,"name":"在线用户",icon:"img/point.png",
           
        },
        {"id":3,"pid":0,"name":"Top应用", icon:"img/point.png",
           
		},
		{"id":4,"pid":0,"name":"Top连接", icon:"img/point.png",
		 
		},
		{"id":5,"pid":0,"name":"域名概况", icon:"img/point.png",
		 
		}
    ]},
	{"id":1,"name":"安全态势","open":true,icon:"img/safe.png",children:[
	    { "id":1,"pid":1, "name":"威胁情报","open":true, icon:"img/point.png",
	      
	    },
	    {"id":2,"pid":1,"name":"主机监控",icon:"img/point.png",
	       
	    },
	    {"id":3,"pid":1,"name":"证书分析", icon:"img/point.png",
	    
		},
		{ "id":4,"pid":1, "name":"HTTP审计",icon:"img/point.png",
		  
		},
		{"id":5,"pid":1,"name":"邮件审计",icon:"img/point.png",
		   
		},
		{"id":6,"pid":1,"name":"FTP审计", icon:"img/point.png",
		
		},
		{"id":7,"pid":1,"name":"Telnet审计", icon:"img/point.png",
		
		}
	]},
	{"id":2,"name":"协议质量","open":true,icon:"img/quality.png",children:[
	    { "id":1,"pid":2, "name":"质量概况",icon:"img/point.png",
	      
	    },
	    {"id":2,"pid":2,"name":"重点协议",icon:"img/point.png",
	       
	    },
	    {"id":3,"pid":2,"name":"质量诊断", icon:"img/point.png",
	    
		},
		{ "id":4,"pid":2, "name":"会话时延",icon:"img/point.png",
		  
		},
		{"id":5,"pid":2,"name":"协议时延",icon:"img/point.png",
		   
		},
		{"id":6,"pid":2,"name":"协议重传", icon:"img/point.png",
		
		},
		{"id":7,"pid":2,"name":"分段时延", icon:"img/point.png",
		
		},
		{"id":8,"pid":2,"name":"质量白名单", icon:"img/point.png",
		
		}
	]},
	{"id":3,"name":"溯源分析","open":true,icon:"img/source.png",children:[
	    { "id":1,"pid":3, "name":"流量诊断",icon:"img/point.png",
	      
	    },
	    {"id":2,"pid":3,"name":"IP画像",icon:"img/point.png",
	       
	    },
	    {"id":3,"pid":3,"name":"报文搜索", icon:"img/point.png",
	    
		},
		{ "id":4,"pid":3, "name":"离线分析",icon:"img/point.png",
		  
		}
		
	]},
	{"id":4,"name":"对象管理","open":true,icon:"img/manage.png",children:[
	    { "id":1,"pid":4, "name":"元数据",icon:"img/point.png",
	      
	   },
	    {"id":2,"pid":4,"name":"遥测线路",icon:"img/point.png",
	       
	    },
		{"id":3,"pid":4,"name":"账号管理", icon:"img/point.png",
	    
		},
	 	{ "id":4,"pid":4, "name":"文件类型",icon:"img/point.png",
		  
		},
		{"id":5,"pid":4,"name":"域名群组",icon:"img/point.png",
		   
		}
		
	 ]} ,
	{"id":5,"name":"系统维护","open":true,icon:"img/uphold.png",children:[
	    { "id":1,"pid":5, "name":"系统信息",icon:"img/point.png",
	      
	    },
	    {"id":2,"pid":5,"name":"系统用户",icon:"img/point.png",
	       
	    },
	    {"id":3,"pid":5,"name":"系统升级", icon:"img/point.png",
	    
		},
		{"id":4,"pid":5,"name":"存储概况", icon:"img/point.png",
		
		},
		{"id":5,"pid":5,"name":"SNMP服务", icon:"img/point.png",
		
		},
		{"id":6,"pid":5,"name":"系统日志", icon:"img/point.png",
		
		}
		
	]}

];





var zTree;
$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $.fn.zTree.init($("#treeDemo1"), setting, zNodes);
    $.fn.zTree.init($("#treeDemo2"), setting, zNodes);
    
    zTree = $.fn.zTree.getZTreeObj("treeDemo");


});



function init(){
    $(".dataTabUl li").click(function(){
        var ins=$(this).index();
        $(this).find("a").addClass("dataActive").end().siblings().find("a").removeClass("dataActive");
        $(".dataConBox .dataBoxSub").eq(ins).show().siblings().hide();
    })
}
function Tail(){
    layer.open({
        type: 2,
        title: '涉案人员详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '600px'],
        content: 'openPerTail.html'
    });
}
function TailLaw(){
    layer.open({
        type: 2,
        title: '法律文书详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '300px'],
        content: 'lawTail.html'
    });
}
function TailList(){
    layer.open({
        type: 2,
        title: '宗卷详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '300px'],
        content: 'caseListTail.html'
    });
}
