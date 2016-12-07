/**
 * Created by confiner.kang on 2016/12/3.
 */
/* 时间管理器 */
var TimerManager = (function(){

    function TimerManager(){
        /* 添加时间事件
         * @param delay 延时[isFrame为true则以帧为单位 否则以秒为单位]
         * @param repeatCnt 重复次数
         * @param caller 调用对象
         * @callback 回调函数
         * @args 回调参数
         * @param isFrame 是否为帧timer
         */
        this.addTimerListener = function addTimerListener(delay, repeatCnt, caller, callback, args, isFrame){
            if(isFrame){ // 帧
                if(repeatCnt < 1){
                    // 帧循环
                    Laya.timer.frameLoop(delay, caller, callback, args);
                }
                else if(repeatCnt == 1){
                    // 单次延时执行
                    Laya.timer.frameOnce(delay, caller, callback, args);
                }
                else{
                    Laya.timer.frameOnce(delay, this, caculateCnt, [isFrame, repeatCnt, args]);
                }
            }
            else{ // 秒
                delay = delay * 1000;
                if(repeatCnt < 1){
                    // 秒循环
                    Laya.timer.loop(delay, caller, callback, args);
                }
                else if(repeatCnt == 1){
                    // 单次延时执行
                    Laya.timer.once(delay, caller, callback, args);
                }
                else{
                    Laya.timer.once(delay, this, caculateCnt, [isFrame, repeatCnt, args]);
                }
            }

            // 计算次数
            function caculateCnt(caller, callback, args){
                var isFrame = args[0];
                var cnt = args[1];
                cnt--;
                if(cnt == 1){
                    if(isFrame)
                        Laya.timer.frameOnce(delay, caller, callback, args[2]);
                    else
                        Laya.timer.once(delay, caller, callback, args[2]);
                }
                else{
                    if(isFrame)
                        Laya.timer.frameOnce(delay, this, caculateCnt, [cnt, args[1]]);
                    else
                        Laya.timer.once(delay, this, caculateCnt, [cnt, args[1]]);
                }
            }

            /* 移除timer
             * @caller 调用者
             * @callback 回调函数
             **/
            this.removeTimerListener = function removeTimerListener(caller, callback){
                Laya.timer.clear(caller, callback);
            }
        }
    }

    var _instance;
    return{
        getInstance : function(){
            return _instance || (new TimerManager());
        }
    }
})()
