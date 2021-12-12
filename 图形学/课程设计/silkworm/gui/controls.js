var controls;
function addGUI(){
    controls = new function(){
    
        this.lightUP = "S键控制点光照角度缩小";
        this.lightDown = "W键控制点光照角度增大";
        this.lightLeft = "A键控制点光照沿z轴缩小";
        this.lightRight = "D键控制点光照沿z轴增大";
        this.know= "跳动时不能改变属性";
        this.positionUP = "上键控制虫子往上动";
        this.positionDown = "下键控制虫子往下动";
        this.positionLeft = "左键控制虫子往左动";
        this.positionRight = "右键控制虫子往右动";
        this.positionIn = "I键控制虫子往里动";
        this.positionOut = "O键控制虫子往外动";
        

        this.animjump = false;//是否跳动
        this.showrotation = false;// 是否进行旋转
        this.showarrowhelper = false;// 是否显示绕自身的旋转轴

        this.plane = true;
        this.planecolor = "#112233";
        this.planeangle = 0.5;

        this.js = '控件不能改变效果';
        this.ambientlight = true;//环境光
        this.spotlight = true;//点光源
        this.directionlight = true;//平行光
        this.ambientcolor = "#c0c0c0";
        this.spotcolor = "#ffffff";
        this.directioncolor = "#ffffff";

        this.eyecolor = "#345678";
        this.bodycolor1 = "#3f8696";
        this.bodycolor2 = "#1b3f64";
        this.eyewireframe = false;
        this.bodywireframe1 = false;
        this.bodywireframe2 = false;
        this.size = 1.0;

        this.addlight = function(){
            AddLight();
        }
        this.removelight = function(){
            RemoveLight();
        }
    };

    var gui = new dat.GUI();

    var explain = gui.addFolder('explain');
    var lightexplain = explain.addFolder('lightexplain');
    lightexplain.add(controls, 'lightUP');
    lightexplain.add(controls, 'lightDown');
    lightexplain.add(controls, 'lightLeft');
    lightexplain.add(controls, 'lightRight');
    var positionexplain = explain.addFolder('positionexplain');
    positionexplain.add(controls, 'positionUP');
    positionexplain.add(controls, 'positionDown');
    positionexplain.add(controls, 'positionLeft');
    positionexplain.add(controls, 'positionLeft');
    positionexplain.add(controls, 'positionIn');
    positionexplain.add(controls, 'positionOut');
    explain.add(controls, 'know');

    var anim = gui.addFolder('anim');
    anim.add(controls, 'animjump').name("跳动展示");
    anim.add(controls, 'showrotation').name("360度旋转展示");
    anim.add(controls, 'showarrowhelper').name("展示旋转轴");
    anim.add(controls, 'addlight').name("增加光照强度");
    anim.add(controls, 'removelight').name("减少光照强度");

    var plane = gui.addFolder('plane');
    plane.add(controls, 'plane').name("平面");
    plane.addColor(controls, 'planecolor').name("平面颜色");
    plane.add(controls, 'planeangle', -1, 1).name("平面角度");

    var light = gui.addFolder('light-not change');
    light.add(controls, 'js').name('说明');
    light.add(controls, 'ambientlight').name("显示环境光");
    light.addColor(controls, 'ambientcolor').name("环境光颜色");
    light.add(controls, 'spotlight').name("显示点光源");
    light.addColor(controls, 'spotcolor').name("点光源颜色");
    light.add(controls, 'directionlight').name("显示平行光");
    light.addColor(controls, 'directioncolor').name("平行光颜色");

    var silkwarm = gui.addFolder('silkwarm');
    silkwarm.addColor(controls, 'eyecolor').name("眼睛颜色");
    silkwarm.add(controls, 'eyewireframe').name("眼睛线框结构");
    silkwarm.addColor(controls, 'bodycolor1').name("身体颜色1");
    silkwarm.add(controls, 'bodywireframe1').name("身体线框结构1");
    silkwarm.addColor(controls, 'bodycolor2').name("身体颜色2");
    silkwarm.add(controls, 'bodywireframe2').name("身体线框结构2");
    silkwarm.add(controls, 'size', 0.01, 5).name("身体大小");


}