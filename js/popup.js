import { makeProductCard, getPopularProducts } from './order-form/order-form';
import popularProducts from './products/goods';

window.onload = () => {
    let popularProductsWrapper = document.querySelector('.js-popular-products');
};


const buttonsInProductCards = document.querySelectorAll('.js-card-button');
const wrapperOrderForm = document.querySelector(".js-order-form-wrapper");
const orderForm = document.querySelector(".js-order-form");
const productCards = document.querySelectorAll('.js-product-card');
console.log(productCards);
let checkedSize;

for (let card of productCards) {

    let sizesWrapper = card.querySelector('.js-product-card-sizes');
    if (sizesWrapper) {
        let sizes = sizesWrapper.querySelectorAll('.js-size-input');
        for (let radio of sizes) {
            radio.addEventListener('click', e => {
                checkedSize = e.target.value;
                card.querySelector('.js-card-button').classList.remove('default-button__disabled');
            });
        }
    } else {
        card.querySelector('.js-card-button').classList.remove('default-button__disabled');
    }


    card.addEventListener('mouseover', e => {
        card.querySelector('.js-product-card-details').classList.add('product-card__details__show');
        let sizesWrapper = card.querySelector('.js-product-card-sizes');
        let orderButtonAvailable = false;
        if (sizesWrapper) {
            let sizes = sizesWrapper.querySelectorAll('.js-size-input');
            for (let radio of sizes) {
                if (radio.checked) orderButtonAvailable = true;
            }
        } else {
            orderButtonAvailable = true;
        }

        if (orderButtonAvailable) {
            card.querySelector('.js-card-button').classList.remove('default-button__disabled');
        } else {
            card.querySelector('.js-card-button').classList.add('default-button__disabled');
        }
    });
    card.addEventListener('mouseout', (e) => {
        card.querySelector('.js-product-card-details').classList.remove('product-card__details__show');
    });
}

for (let button of buttonsInProductCards) {
    button.addEventListener("click", (e) => {

        let productId = e.target.dataset.productId;

        let currentProduct = {
            id: popularProducts[productId].id,
            name: popularProducts[productId].name,
            description: popularProducts[productId].description,
            image: popularProducts[productId].image,
            sale: popularProducts[productId].sale,
            price: popularProducts[productId].price,
            oldPrice: popularProducts[productId].oldPrice,
            checkedSize: checkedSize,
            sizes: popularProducts[productId].sizes
        }

        if (!button.classList.contains('default-button__disabled')) {
            wrapperOrderForm.classList.remove("order-form-wrapper_hidden");
            document.body.style.overflow = "hidden";
        }

        const productCard = makeProductCard(currentProduct);
        orderForm.querySelector('.js-product-card-template').innerHTML = productCard;
        let chekedSizeElement = orderForm.querySelector(`input[value=${currentProduct.checkedSize}]`);
        if (chekedSizeElement) {
            chekedSizeElement.checked = true;
        }
    });
}