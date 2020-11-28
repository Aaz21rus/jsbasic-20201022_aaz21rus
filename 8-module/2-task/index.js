import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render()
    this.renderCarts()

    this.updateFilter()
  }

  render() {
    this.elem = document.createElement('DIV')
    this.elem.classList.add('products-grid')
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`
  }

  renderCarts() {
    for(const product of this.products) {
      this.elem.querySelector('.products-grid__inner').insertAdjacentHTML('afterbegin',`
        <div class="card">
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
        </div>
      `)
      this.renderProduct = {}
      this.renderProduct[product.id] = {}
      const filterKey = Object.keys(product)
      filterKey.forEach(item => {
        if(item === 'nuts') {
          this.renderProduct[product.id].noNuts = product[item]
        }
        if (item === 'vegeterian') {
          this.renderProduct[product.id].vegeterianOnly = product[item]
        }
        if (item === 'category') {
          this.renderProduct[product.id].category = product[item]
        }
        if(item === 'spiciness') {
          this.renderProduct[product.id].maxSpiciness = product[item]
        }
      })
      //объект в котором хранятся св-ва для фильтрации
      console.log(this.renderProduct);
      this.clickBtn(product)
    }
  }

  clickBtn(product) {
    this.elem.querySelector('.card__button').addEventListener('click', () => {
      this.event = new CustomEvent("product-add", {
        detail: product.id,
        bubbles: true
      })
      this.elem.dispatchEvent(this.event)
    })
  }
  // записываю в фильр - каегории по котрым нужно отфильтровывать
  updateFilter(filters) {
    if(!filters) {
      return
    }
    this.filters[Object.keys(filters)] = Object.values(filters)[0]
    console.log(this.filters);
  }
}
