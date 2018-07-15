const PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0.00, 
        items: [],
        cart: [],
        searchTerm: 'gummy bears',
        lastSearchTerm: ''
    },
    methods: {
        addItem: function(index){
            this.total += PRICE;
            const item = this.items[index];
            let found = false;
            for(let i = 0; i < this.cart.length; i++){
                if(this.cart[i].id === item.id){
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            if(!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                })
            }
        },
        onSubmit: function(event){
            console.log(this.searchTerm);
            console.log(this.$http);
            this.$http
                .get('/search/'.concat(this.searchTerm))
                .then(function(res){
                    this.items = res.data;
                    this.lastSearchTerm = this.searchTerm;
                    console.log(res.body);
                    console.log(res.data);
                });
        },
        increment: function(item){
            item.qty++;
            this.total += PRICE;
        },
        decrement: function(item){
            item.qty--;
            this.total -= PRICE;
            if(item.qty <= 0){
                for(let i = 0; this.cart.length; i++){
                   if(this.cart[i].id === item.id){
                       this.cart.splice(i, 1);
                       break;
                   }
                }
            }
        }
    },
    beforeMount(){
        this.onSubmit();
    },
    filters: {
        currency: function(price){
            return '$'.concat(price.toFixed(2));
        }
    }
})