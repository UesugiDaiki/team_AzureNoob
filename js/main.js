new Vue({
    el: '#app',
    data: {
        rotate: 0,
        left_arrived: true,
        right_arrived: false,
        count: 365,
        print: "1",
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
        }
    }
})
