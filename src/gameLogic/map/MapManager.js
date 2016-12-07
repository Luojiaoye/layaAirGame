/**
 * Created by confiner.kang on 2016/12/2.
 */
/* 地图管理器 */
var MapManager = (function(){
    function MapManager(){
        this.render = function(mapID){
            _mapID = mapID;
            renderMap();
        }

        this.scroll = function(offset, time){
            Tween.clearAll(_map);
            Tween.to(_map,{x:(_map.x + offset.x), y:(_map.y + offset.y) }, time * 1000);
        }

    }

    // 渲染
    function renderMap(){
        switch(_mapID){
            case 21:
                _map = new MainCityMap(_mapID);
                _map.pos(100, 190);
                LayerManager.getInstance().mapLayer.addChild(_map);
                break;
        }
    }

    var _instance;
    var _mapID;
    var _map;

    return{
        getInstance : function(){
            return _instance || (new MapManager());
        }
    }

})()

// 地图渲染类[此处需要优化]
var MainCityMap = function(mapID){
    var map;
    function MainCityMap(){
        map = new Sprite();
        var path = "http://10.10.17.189:8080/layaAirGame/res/scene/" + mapID + "/scene.png";
        Laya.loader.load(path, Handler.create(this, function(){
            var texture = Laya.loader.getRes(path);
            map.graphics.drawTexture(texture,0,0);
            // map.size(texture.width, texture.height);
            map.on(Event.CLICK, this, clickHandler);
            console.log("添加了鼠标事件");
        }));
        function clickHandler(evt){
            var player = PlayerManager.getInstance().getPlayer(21);
            if(player){
                // if(map.x > 1465 || map.x < 450){
                //     Tween.clearAll(map);
                //     var dis = (evt.stageX - player.x) < 0 ? -(evt.stageX - player.x) : (evt.stageX - player.x);
                //     Tween.to(map,{x:(map.x + dis) }, (dis / 50) * 1000);
                //     console.log("滚动地图");
                // }
                // else{
                //     var target = new Point(evt.stageX, evt.stageY);
                //     player.moveTo(target);
                // }
                var target = new Point(evt.stageX, evt.stageY);
                player.moveTo(target);
            }
            else{
                console.log("player is null");
            }
        }
    }

    MainCityMap();
    return map;
}
