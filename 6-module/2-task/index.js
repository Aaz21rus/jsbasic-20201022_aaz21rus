import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('DIV')
    this.elem.classList.add('card')
    this.elem.insertAdjacentHTML('afterbegin',`
      <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button"}>
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
      ${clickBtn()}
    `)

    function clickBtn() {
      console.log(document.querySelector('.card'));
      // this.elem.querySelector('card__button').addEventListener('click', () => {
      //   this.elem.querySelector('.card').classList.add('product-add')
      // })
    }

  }
}

// let card = new ProductCard({
//   name: "Laab kai chicken salad",
//   price: 10,
//   category: "salads",
//   image: "laab_kai_chicken_salad.png",
//   id: "laab-kai-chicken-salad"
// });
