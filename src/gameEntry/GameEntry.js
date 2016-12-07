/**
 * Created by confiner.kang on 2016/12/2.
 */
/* 游戏入口类 */
// 引入layaEngine[优化为使用封装库]
var Stage   = Laya.Stage;
var Browser = Laya.Browser;
var WebGL   = Laya.WebGL;
var Sprite  = Laya.Sprite;
var Handler = Laya.Handler;
var Dictionary = Laya.Dictionary;
var Point = Laya.Point;
var Skeleton = Laya.Skeleton;
var Event    = Laya.Event;
var Templet  = Laya.Templet;
var Tween   = Laya.Tween;

/* 开始游戏*/
var entry = function()
{
    // console.log("开始游戏");
    GameManager.getInstance().init();
    GameManager.getInstance().start();

    loop();
}

// 轮询
function loop(){
    // 每秒心跳包
    TimerManager.getInstance().addTimerListener(1, 0, this, beat)
}

// 更新游戏逻辑
function beat(){
    GameManager.getInstance().update();
}
