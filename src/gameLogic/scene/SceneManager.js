/**
 * Created by confiner.kang on 2016/12/2.
 */
/* 场景管理器 */
var SceneManager = (function(){
    // 初始化管理器
    function init()
    {
        // 当前
        this.sceneID = 0;

        /* 进入场景 */
        this.enter = function(sceneID){
            this.sceneID = sceneID;
            // 添加场景数据
            var sceneData = new SceneData();
            sceneData.sceneID = sceneID;
            sceneData.sceneName = "mainCity";
            console.log("进入场景" + this.sceneID);
            MapManager.getInstance().render(sceneID);
        }

        /* 退出场景 */
        this.exit = function()
        {
            this.sceneID = 0;
            console.log("退出场景");
        }

        /* 当前场景ID */
        this.getCurSceneID = function(){
            return this.sceneID;
        }
    }

    var _instance;
    return{
        /* 对外提供管理器 */
        getInstance:function(){
            return _instance ||(new init());
        }
    }
})();

/* 场景数据 */
// 两种方案：1、传入id内部解析配置 2、外表创建对象设置值 [暂时使用第二种]
var SceneData = function(){
    return{
        sceneID : 0,
        sceneName: "默认场景名称",
        mapRes:"默认场景资源路径"
    }
};
