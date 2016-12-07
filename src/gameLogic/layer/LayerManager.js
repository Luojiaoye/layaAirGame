/**
 * Created by confiner.kang on 2016/12/2.
 */
/* 层级管理器 */
var LayerManager = (function(){

    /* 地图层 */
    var _mapLayer;
    /* 地图特效层 */
    var _mapEffectLayer;
    /* 场景层 */
    var _sceneLayer;
    /* 场景特效层 */
    var _sceneEffectLayer;
    /* 窗体层 */
    var _windowLayer;

    function initLayers()
    {
        _mapLayer = new Sprite();
        Laya.stage.addChild(_mapLayer);

        _mapEffectLayer = new Sprite();
        Laya.stage.addChild(_mapEffectLayer);

        _sceneLayer = new Sprite();
        Laya.stage.addChild(_sceneLayer);

        _sceneEffectLayer = new Sprite();
        Laya.stage.addChild(_sceneEffectLayer);

        _windowLayer = new Sprite();
        Laya.stage.addChild(_windowLayer);
    }

    function initStage(){
        // 不支持WebGL时自动切换至Canvas
        // Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_RIGHT;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#ADD9F2";
    }

    function addStageBg()
    {
        var stageBg = new Sprite();
        Laya.stage.addChild(stageBg);
        stageBg.pos(158,40);
        stageBg.loadImage("http://10.10.17.189:8080/layaAirGame/res/stage/bg.jpg");
    }

    /* 初始化摄像机*/
    function initCamera() {
        // 创建摄像机
        var offset = new Point(460, 192);   // 设置偏移
        var camera = new Camera(1000, 600, offset);
        CameraManager.getInstance().setCamera(camera);

        // 给地图层添加摄像机
        CameraManager.getInstance().addTarget(_mapLayer);
        CameraManager.getInstance().addTarget(_sceneLayer);
    }

    function LayerManager()
    {
        // 添加公开接口
        this.register = function(stage)
        {
            if(stage == Stage)
            {
                initStage();
                addStageBg();
                initLayers();
                initCamera();
            }
            else
                console.log("stage is not supported");
        }

        this.mapLayer = _mapLayer;
        this.mapEffectLayer = _mapEffectLayer;
        this.sceneLayer = _sceneLayer;
        this.sceneEffectlayer = _sceneEffectLayer;
        this.windowLayer = _windowLayer;
    }

    var _instance;

    return{
        getInstance : function(){
            return _instance || (new LayerManager());
        }
    }
})();