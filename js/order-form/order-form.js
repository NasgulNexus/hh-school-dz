
const wrapperOrderForm = document.querySelector(".order-form-wrapper");
const orderForm = document.querySelector(".order-form");


document.querySelector('.js-close-button-form').addEventListener("click", () => {
    wrapperOrderForm.classList.add("order-form-wrapper_hidden");
    document.body.style.overflow = "auto";
    if (!!orderForm.querySelector('.product-card__sale')) orderForm.querySelector('.product-card__sale').remove();
});

function getPopularProducts(productsArray) {
    console.log(productsArray);
    let products = "";
    for (let item in productsArray) {
        product += makeProductCard(productsArray[item]);
        products += product;
    };
    return products;
}


function makeProductCard(productData) {
    const saleElement = (productData.sale) ? `<div class="product-card__sale checkout__sale">sale</div>` : "";
    const oldPriceElement = (productData.oldPrice) ? `<span class="product-card__old-price">${productData.oldPrice}</span>` : "";
    const sizes = createSizes(productData);

    return `<div class="product-card js-product-card" data-product-id="${productData.id}">
    <div class="product-card__image-container">
        <img class="product-card__image" src="${productData.image}">
        ${saleElement}
    </div>
    <div class="product-card__name">${productData.name}</div>
    <div class="product-card__price">${oldPriceElement} ${productData.price}</div>
    <div class="product-card__details__show-order-form">
    <div class="product-card__description">${productData.description}</div>
    ${sizes}
    </div>
    </div>`;
    function createSizes(productData) {
        if (productData.sizes.length === 0) return "";

        let sizes = `<div class="product-card__sizes">`;
        productData.sizes.forEach(element => {
            let size = `<div class="product-card__size">
            <label class="radio-box">
                <input class="radio-box__input" type="radio" name="size" value="${element}">
                <span class="radio-box__text">${element}</span>
            </label>
        </div>`;
            sizes += size;
        });

        sizes += `</div>`;
        return sizes;
    }
}


export { makeProductCard, getPopularProducts }