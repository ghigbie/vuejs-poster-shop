console.log('It works well.');

new Vue({
    el: '#app',
    data: {
        total: 0.00, 
        items: [
            { id: 1, title: 'Item 1'},
            { id: 2, title: 'Item 2'},
            { id: 3, title: 'Item 3'},
            { id: 4, title: 'Item 4'},
            { id: 5, title: 'Item 5'},
        ],
        imageSrc: 'http://placekitten.com/300/300',
        cart: []
    },
    methods: {
        addItem: function(index){
            this.total += 9.99;
            const item = this.items[index];
            let found = false;
            for(let i = 0; i < this.cart.length; i++){
                if(this.cart[i].id === item.id){
                    found = true;
                    this.cart[i].qty++;
                }
            }
            if(!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1
                })
            }
        },
        removeItem: function(index){
            this.cart.splice(index, 1);
        }
    }
})