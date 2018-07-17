const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue({
    el: '#app',
    data: {
        total: 0.00, //this is the initial var that represents the price in the shopping cart
        items: [], //this is the sliced res.data
        results: [], //this is the complete res.data
        cart: [], //this var is used to store items in the shopping cart
        searchTerm: 'gummy bears', //this is the initial search Term
        lastSearchTerm: '', //this is the used to display the search tern in the search message
        loading: false, //this var is used to determine if a loading message should be displayed
        price: PRICE //this is the hard coded price var
    },
    methods: {
        addItem: function(index){
            this.total += PRICE; //the price is one single value
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
                this.cart.push({ //this adds items to the cart array
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                })
            }
        },
        appendItems: function(){ //this funciton adds 10 items from the results to the current array. It is called when the user scrolls to the bottom of the page
            if(this.results.length > this.items.length){ //if the results is greater than the items
                const append = this.results.slice(this.items.length, this.items.length + LOAD_NUM); //then take the next 10 results and store them in the variable append
                this.items = this.items.concat(append); //concat the append to the items array so they will display on the page
            }
        },
        onSubmit: function(event){
            this.items = []; //reset items to empty array on a new search
            this.loading = true; //this var is used to show a loading message
            this.$http //ajax request
                .get('/search/'.concat(this.searchTerm)) //the type of request and api specifications
                .then(function(res){ //the promise that is returned
                    this.results = res.data; //this populates the results array
                    this.items = res.data.slice(0, LOAD_NUM); //this populates the items array with ten items
                    this.lastSearchTerm = this.searchTerm; // this assigns the value of last search term
                    this.loading = false; //change loading back to false
                });
        },
        increment: function(item){ //increments one item in the cart
            item.qty++;
            this.total += PRICE;
        },
        decrement: function(item){ //decremtns one item in the cart
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
    mounted(){ //these items are called on components mounting
        this.onSubmit(); 
        const vueInstance = this; //this redefines vueInstance as this
        const elem = document.getElementById('product-list-bottom'); 
        const watcher = scrollMonitor.create(elem);
        watcher.enterViewport(() =>{
            vueInstance.appendItems();
        });
    },
    computed: {
        noMoreItems: function(){
            return this.items.length === this.results.length && this.results > 0;
        }
    },
    filters: {
        currency: function(price){ //a currency filter used to display a dollar sign and a price at two decimal points
            return '$'.concat(price.toFixed(2));
        }
    }
})
