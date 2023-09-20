new Vue({
    el: '#app',
    data: {
        rotate: 0,
        left_arrived: false,
        right_arrived: false,
        // ページ数
        // count: 365,
        count: 5,
        // レンジの初期値
        range_value: "0",
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
        timer_css: "timer",
        // ゲームが終了したか
        end: false,
    },
    watch:{
        count: function () {
            // タイマースタート
            if(this.start == null){
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
                this.game_end()
                this.stopTime=new Date();
                clearInterval(this.timeoutID)
                this.timeoutID = null
            }
        }
    },
    methods:{
        // カーソルが左のdivにhoverしたとき
        arriveLeft() {
            console.log('左');
            if (!this.right_arrived && !this.left_arrived) {
                this.left_arrived = true;
            }
            if (this.count > 0 && this.right_arrived) {
                console.log('左');
                this.left_arrived = true;
                this.right_arrived = false;
                this.count--;
            }
        },
        // カーソルが右のdivにhoverしたとき
        arriveRight() {
            console.log('右');
            if (!this.right_arrived && !this.left_arrived) {
                this.right_arrived = true;
            }
            if (this.count > 0 && this.left_arrived)  {
                console.log('右');
                this.left_arrived = false;
                this.right_arrived = true;
                this.count--;
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
        
            // 正規表現
            this.time = `${m}:${s}.${ms.replace(/\d$/,"")}`;
        },
        // ゲーム終了時の処理
        async game_end(){
            this.timer_css = "timer_finish";
            await sleep(530)
            this.end = true;
        },

        //ゲーム再起動   
        remake_game(){
            this.remake_calender();
            this.reset_value();
        },

        // カレンダー再生成
        async remake_calender(){
            // for(let i=0; i < 365;i++){
            for(let j=0; j < 5;j++){
                this.count++;
                await sleep(10)
            }
        },

        //値を初期化 
        reset_value(){
            // カーソル位置
            this.left_arrived = false;
            this.right_arrived = false;
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
            this.timer_css = "timer";
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
