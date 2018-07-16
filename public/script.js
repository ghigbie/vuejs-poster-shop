const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue({
    el: '#app',
    data: {
        total: 0.00, 
        items: [],
        results: [],
        cart: [],
        searchTerm: 'gummy bears',
        lastSearchTerm: '',
        loading: false,
        price: PRICE
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
        appendItems: function(){
            console.log('append items');
            if(this.results.length > this.items.length){
                const append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        onSubmit: function(event){
            this.items = [];
            this.loading = true;
            console.log(this.searchTerm);
            console.log(this.$http);
            this.appendItems();
            this.$http
                .get('/search/'.concat(this.searchTerm))
                .then(function(res){
                    this.results = res.data;
                    this.items = res.data.slice(0, LOAD_NUM);
                    this.lastSearchTerm = this.searchTerm;
                    console.log(res.body);
                    console.log(res.data);
                    this.loading = false;
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
    mounted(){
        this.onSubmit();
        const vueInstance = this;
        const elem = document.getElementById('product-list-bottom');
        const watcher = scrollMonitor.create(elem);
        watcher.enterViewport(() =>{
            vueInstance.appendItems();
        });
    },
    filters: {
        currency: function(price){
            return '$'.concat(price.toFixed(2));
        }
    }
})
