/**
 * Created by confiner.kang on 2016/12/2.
 */
/* 游戏管理器 */
var GameManager = (function(){
    // 初始化管理器
    function init(){
        /* 初始化游戏*/
        this.init = function()
        {
            console.log("游戏管理器-->初始化游戏");

            // 注册layaAirEngine
            LayerManager.getInstance().register(Stage);

            SceneManager.getInstance().enter(21);

            TimerManager.getInstance().addTimerListener(3, 1, this, test);

            var player = PlayerManager.getInstance().createPlayer(21);
            player.born(new Point(800, 700));
            // player.moveTo(new Point(1200, 700));
            // player.walk();

            // MapManager.getInstance().scroll(new Point(-300, 0), 10);
        }

        function test(){
            console.log("执行了timer");
        }

        /*开始游戏*/
        this.start = function(){
            console.log("游戏管理器-->开始游戏");
        }

        /*更新游戏*/
        this.update = function()
        {
            //console.log("更新游戏");
        }
    }

    var _instance;
    /* 对外提供公开的方法 */
    return{
        /* 对外提供管理器 */
        getInstance:function()
        {
            return _instance || (new init());
        }


    }
})();