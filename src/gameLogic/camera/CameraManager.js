/**
 * Created by confiner.kang on 2016/12/3.
 */
/* 摄像头管理器 */
var CameraManager = (function(){
    function CameraManager(){

        return{
            /* 设置当前的摄像机 */
            setCamera : function(camera){
                _camera = camera;
            },

            /* 添加目标*/
            addTarget : function(target){
                if(target.hasOwnProperty("mask")){
                    target.mask = _camera.viewPort;
                    _camera.addTarget(target);
                }
                else
                    console.error("the target can not set to the camera!");
            }
        }
    }

    var _instance;

    var _camera;

    return{
        getInstance : function(){
            return _instance || (new CameraManager());
        }
    }
})()

/* 摄像头类 */
var Camera = function(width, height, offset)
{
    /* 视窗 */
    var _viewPort = new Sprite();
    _viewPort.graphics.drawRect(offset.x, offset.y, width, height, "#ffffff");

    var targets = new Dictionary();
    return{
        /* 视窗 */
        viewPort : _viewPort,
        /* 添加目标*/
        addTarget : function(target){
            console.log("添加了一个目标");
            targets.set(target, true);
        },
        /* 移除目标*/
        removeTarget : function (target) {
           targets.remove(target);
        }
    }
}
