console.log('It works well.');

new Vue({
    el: '#app',
    data: {
        total: 0.00, 
        items: [
            {title: 'Item 1'},
            {title: 'Item 2'},
            {title: 'Item 3'},
            {title: 'Item 4'},
            {title: 'Item 5'},
        ],
        imageSrc: 'http://placekitten.com/300/300',
        cart: []
    },
    methods: {
        addItem: function(index){
            console.log(index);
            this.total += 9.99;
            this.cart.push(this.items[index]);
            console.log(this.cart);
        },
        removeItem: function(index){
            this.cart.splice(index, 1);
        }
    }
})