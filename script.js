const data = [
    { title: 'Notebook', price: 2000 },
    { title: 'Keyboard', price: 200 },
    { title: 'Mouse', price: 100 },
    { title: 'Gamepad', price: 87 },
    { title: 'Новый Товар' }
];
const renderProduct = (title, price = 'Цена товара', img = "img/wp7157218.jpg") => {
    return `
    <div class="product-item">
    <img src = "${img}" alt = "${title}">
        <div>
            <h3>${title}</h3>
            <p>${price}</p>
            <button>Купить</button>
        </div>
    </div>
`
};

const render = (products) => {
document.querySelector('.products').innerHTML = products.map(item => renderProduct(item.title, item.price)).join('');
};

render(data);
console.log(data);