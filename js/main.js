new Vue({
    el: '#app',
    data: {
        rotate: 0,
        left_arrived: true,
        right_arrived: false,
        count: 365,
        print: "1",

        // タイマー
        start: null,
        // 開始時間
        startTime: 0,
        // 停止時間
        stopTime: 0,
        // タイムアウトID
        timeoutID: null,
        time: '00:00:000',
    },
    watch:{
        rotate: function(newValue) {
            // 左から右
            if(this.left_arrived && newValue == 100){
                this.left_arrived = false;
                this.right_arrived = true;
                this.count -= 1;
                // ページが破られる処理を書く
            }
            // 右から左
            if(this.right_arrived && newValue == 0){
                this.left_arrived = true;
                this.right_arrived = false;
                this.count -= 1;
                // ページが破られる処理を書く
            }
            if(this.start == null){
                this.start = false;
                this.startTime=new Date()
                const onInterval = ()=>{
                    this.displayTime()
                };
                this.timeoutID = window.setInterval(onInterval,10)
            }
            if(this.count == 0){
                this.stopTime=new Date();
                clearInterval(this.timeoutID)
                this.timeoutID = null
            }
        }
    },
    methods:{
        displayTime() {
            const now = new Date();
            const ellapsed = now.getTime() - this.startTime.getTime();
            const current = new Date(ellapsed);
            const m = String(current.getMinutes()).padStart(2, '0');
            const s = String(current.getSeconds()).padStart(2, '0');
            const ms = String(current.getMilliseconds()).padStart(3, '0');
            this.time = `${m}:${s}.${ms}`;
        }
    },
})
