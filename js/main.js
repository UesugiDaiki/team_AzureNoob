new Vue({
    el: '#app',
    data: {
        rotate: 0,
        leftArrived: false,
        rightArrived: false,
        // ページ数
        count: 368,
        // count: 5,
        displayNum: 3,
        displayCss: 'before-starting',
        // タイマー
        start: null,
        // 開始時間
        startTime: 0,
        // 停止時間
        stopTime: 0,
        // タイムアウトID
        timeoutID: null,
        time: '00:00.00',
        // タイマーのcss
        timerCss: "timer",
        // ゲームが終了したか
        end: false,
        reset: false
    },
    watch:{
        count: function () {
            // スタート前
            if (this.count > 365) {
                this.displayCss = 'before-starting';
                this.displayNum = this.count - 365;
            }
            // スタート後
            if (this.count <= 365) {
                this.displayNum = 366 - this.count;
                this.displayCss = 'after-starting';
            }
            // タイマースタート
            // arriveLeft,arriveRightでstartのnullをtrueに
            if(this.start == true && this.count <= 365 && !this.reset){
                this.start = false;
                this.startTime=new Date()
                const onInterval = ()=>{
                    this.displayTime()
                };
                this.timeoutID = window.setInterval(onInterval,10)
            }
            // 枚数が0になった時タイマーストップ
            if(this.count == 0){
                // ゲーム終了時の処理を呼び出し
                this.gameEnd()
                this.stopTime=new Date();
                clearInterval(this.timeoutID)
                this.timeoutID = null
            }
        },
        // timeのoverflow対策
        time: function() {
            if(this.time >= "59:59.99"){
                this.stopTime=new Date();
                clearInterval(this.timeoutID)
                this.timeoutID = null
            }
        }
    },
    methods:{
        // カーソルが左のdivにhoverしたとき
        arriveLeft() {
            if (!this.reset) {
                if (!this.rightArrived && !this.leftArrived) {
                    this.leftArrived = true;
                    // タイマートリガー
                    this.start = true;
                }
                if (this.count > 0 && this.rightArrived) {
                    this.leftArrived = true;
                    this.rightArrived = false;
                    this.count--;
                }
            }
        },
        // カーソルが右のdivにhoverしたとき
        arriveRight() {
            if (!this.reset) {
                if (!this.rightArrived && !this.leftArrived) {
                    this.rightArrived = true;
                    // タイマートリガー
                    this.start = true;
                }
                if (this.count > 0 && this.leftArrived)  {
                    this.leftArrived = false;
                    this.rightArrived = true;
                    this.count--;
                }
            }
        },
        // タイマー表示
        displayTime() {
            const now = new Date();
            const ellapsed = now.getTime() - this.startTime.getTime();
            const current = new Date(ellapsed);
            const m = String(current.getMinutes()).padStart(2, '0');
            const s = String(current.getSeconds()).padStart(2, '0');
            const ms = String(current.getMilliseconds()).padStart(3, '0');
            this.time = `${m}:${s}.${ms.replace(/\d$/,"")}`;
        },
        // ゲーム終了時の処理
        async gameEnd(){
            this.timerCss = "timer_finish";
            await sleep(530)
            this.end = true;
        },

        //ゲーム再起動   
        remakeGame(){
            this.remakeCalendar();
            this.resetValue();
        },

        // カレンダー再生成
        async remakeCalendar(){
            this.reset = true;
            for(let j=0; j < 368;j++){
                this.count++;
                await sleep(10)
            }
            this.reset = false;
        },

        //値を初期化 
        resetValue(){
            // カーソル位置
            this.leftArrived = false;
            this.rightArrived = false;
            // タイマー
            this.start = null;
            // 開始時間
            this.startTime = 0;
            // 停止時間
            this.stopTime = 0;
            // タイムアウトID
            this.timeoutID = null;
            // タイマーリセット
            this.time = '00:00.00';
            // タイマーのcss
            this.timerCss = "timer";
            // ゲームが終了したか
            this.end = false;
        },
    },
})

/**
 * 処理を一定時間停止する
 *
 * 参考サイト:https://note.affi-sapo-sv.com/js-sleep.php
 * @param {number} waitTime
 */

var sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime))
