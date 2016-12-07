/**
 * Created by confiner.kang on 2016/12/3.
 */
/* 玩家对象管理器 */
var PlayerManager = (function(){
    // 玩家列表
    var _players = new Dictionary();

    function PlayerManager(){

        /* *
         * 创建玩家
         * @param playerID 玩家ID
         * */
        this.createPlayer = function createPlayer(playerID){
            var player = new Player(playerID);
            _players.set(playerID, player);
            return player;
        }

        /* *
         * 获取玩家独享
         * @param playerID 玩家ID
         *  */
        this.getPlayer = function getPlayer(playerID){
            return _players.get(playerID);
        }
    }

    var _instance;
    return{
        getInstance : function(){
            return _instance || (new PlayerManager());
        }
    }
})()

/* 玩家对象 */
// 此处没有把数据和显示对象分离[待优化]
var Player = function(playerID){
    var id = playerID;
    var mAniPath;
    var mFactory;
    var mActionIndex = 0;
    var mCurrIndex = 0;
    var mArmature;
    var mStartX;
    var mStartY;
    var mCurrSkinIndex = 0;
    var mSkinList = ["goblin","goblingirl"];
    (function Player(){
        mAniPath = "http://10.10.17.189:8080/layaAirGame/res/skeleton/player/" + id + "/goblins.sk";//../../res/spine/spineRes2/goblins.sk";
    })();

    function parseComplete() {
        //创建模式为1，可以启用换装
        mArmature = mFactory.buildArmature(1);
        console.log("parseComplete");
        LayerManager.getInstance().sceneLayer.addChild(mArmature);
        mArmature.x = mStartX;
        mArmature.y = mStartY;
        // Laya.stage.addChild(mArmature);
        play();
    }

    function changeSkin()
    {
        mCurrSkinIndex++;
        if (mCurrSkinIndex >= mSkinList.length)
        {
            mCurrSkinIndex = 0;
        }
        mArmature.showSkinByName(mSkinList[mCurrSkinIndex]);
    }

    function play()
    {
        if(!mArmature)
        {
            console.log("mArmature有问题");
            return;
        }

        // mCurrIndex++;
        // if (mCurrIndex >= mArmature.getAnimNum())
        // {
        //     mCurrIndex = 0;
        // }
        mArmature.play(mCurrIndex,true);
        mArmature.showSkinByName(mSkinList[mCurrSkinIndex]);
    }

    function born(pos){
        mStartX = pos.x;
        mStartY = pos.y;
        mFactory = new Templet();
        mFactory.on(Event.COMPLETE, this, parseComplete);
        mFactory.loadAni(mAniPath);
    }

    function moveTo(target){
        play();
        Tween.clearAll(mArmature);
        var dis = target.x - mArmature.x < 0 ? -(target.x - mArmature.x) : (target.x - mArmature.x);
        console.log("distance: " + dis);
        Tween.to(mArmature,{x:target.x }, ( dis / 50 ) * 1000);
    }

    function x(){
        return mArmature.x;
    }

    return{
        x:x,
        id : id,
        walk : play,
        born : born,
        moveTo:moveTo
    }
}
