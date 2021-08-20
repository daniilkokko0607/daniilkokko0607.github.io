// Компоненты внизу, поскольку используют некотые переменные, созданные в объекте app

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        searchLine: '',
        isVisibleCart: true,
        totalPriceMessage: '',
        totalPriceCoin: ''
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
                xhr.open('GET', url, true);
                xhr.onload = () => resolve(JSON.parse(xhr.responseText));
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
        },
        makePOSTRequest(url, data) {
            return new Promise((resolve, reject) => {
                let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
                xhr.onload = () => resolve(JSON.parse(xhr.responseText));
                xhr.onerror = () => reject(xhr.statusText);
                // Вот где-то здесь собака порылась
                xhr.send(JSON.stringify(data));
            });
        },
        addToBasket(id) {
            let toBasket;

            this.goods.forEach(function(item) {
                if(id == item.id) {
                    toBasket = {id: item.id,title: item.title,price: item.price,img: item.img}
                }
            });
            this.basketGoods.push(toBasket);
            this.calcAllGoods();
            // Обновляем card.json
            this.makePOSTRequest('/addToCard', toBasket);
        },
        deleteFromBasket(id) {
            let getIdElemen;
            this.basketGoods.forEach(function(item, i) {
                let thisId = item.id;
                if(id == thisId) {
                    getIdElemen = i;
                }
                
            });
            this.basketGoods.splice(getIdElemen, 1);
            this.calcAllGoods();
            // Обновляем card.json
            this.makePOSTRequest('/updateCart', this.basketGoods);
        },
        viewCart() {
            switch(this.isVisibleCart) {
                case(false): {
                    this.isVisibleCart = true;
                    break;
                }
                case(true): {
                    this.isVisibleCart = false;
                    break;
                }
            }
        },
        calcAllGoods() {
            let totalPrice = 0;
            this.basketGoods.forEach((good) => {
                if (good.price !== undefined) {
                    totalPrice += good.price;
                }
            });
            this.totalPriceMessage = 'Cумма товаров в корзине: ' + totalPrice;
            this.totalPriceCoin = totalPrice;
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        }
    },
    async created() {
        try {
            this.goods = await this.makeGETRequest('/catalog');
            this.filteredGoods = this.goods;

            this.basketGoods = await this.makeGETRequest('/cart');
            let basketArray = this.basketGoods;

            if(basketArray.lenght !== 0) {
                this.calcAllGoods();
            } 
        } catch(err) {
            console.error(err);
        }
    },
    mounted() {
        this.calcAllGoods();
    }
})

// Компоненты товаров
Vue.component('goods-list', {
    props: ['goods'],
    template: '<section class="goods-list"><slot name="title"></slot><goods-item v-for="good in goods" :key="good.id" :good="good"></goods-item><slot name="nothing"></section>'
})
Vue.component('goods-item', {
    props: ['good'],
    template: '<div class="goods-item"><img :src="good.img" :alt="good.title"><h3>{{good.title}}</h3><p>{{good.price}}</p><button :id="good.id" v-on:click="addBasket(event)">Добавить</button></div>'
})
// Компоненты корзины
Vue.component('basket-list', {
    props: ['goods'],
    template: '<aside class="basket-list"><slot name="title"></slot><basket-item v-for="good in goods" :key="good.id" :good="good"></basket-item><slot name="totalCart"></slot></aside>'
})
Vue.component('basket-item', {
    props: ['good'],
    template: '<div class="basket-item"><img :src="good.img" :alt="good.title"><button :id="good.id" v-on:click="deleteItem(event)">&times;</button><div class="basket-item-info"><h3>{{good.title}}</h3><p>{{good.price}}</p></div></div>'
})
// Компоненты товаров
Vue.component('search', {
    props: [],
    template: '<div class="search"><input type="search" v-on:keydown.enter="filterGoods" v-model="app.searchLine" placeholder="Type and press enter"></div>'
});

function filterGoods() {
    app.filterGoods();
}
function addBasket(event) {
    app.addToBasket(event.target.id);
}
function deleteItem(event) {
    app.deleteFromBasket(event.target.id);
}