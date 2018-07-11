console.log('It works well.');

new Vue({
    el: '#app',
    data: {
        total: 0
    },
    methods: {
        addItem: funciton(){
            this.total += 9.99;
        }
    }
})