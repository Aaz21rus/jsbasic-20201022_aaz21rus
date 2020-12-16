import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let products = await (await fetch('products.json')).json()

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon,products);

    document.addEventListener('click', (event) => {
      let button = event.target.closest('button');
      if (!button) {
        return;
      }

      let addProductId = button.dataset.addProductId;
      let productToAdd = products.find((product) => product.id === addProductId);

      if (productToAdd) {
        cart.addProduct(productToAdd);
      }
    })

    let carousel = new Carousel(slides);
    let containerElement = document.body.querySelector('[data-carousel-holder]');
    containerElement.append(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let container = document.querySelector('[data-ribbon-holder]');
    container.append(this.ribbonMenu.elem);

    let slider = document.querySelector('[data-slider-holder]')
    this.stepSlider = new StepSlider({
      steps: 5
    });
    slider.append(this.stepSlider.elem);

    document.querySelector('.products-grid').remove()
    let grid = document.querySelector('[data-products-grid-holder]')
    this.productsGrid = new ProductsGrid(products);
    grid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.categories
    });

    document.querySelector('body').addEventListener('product-add', e => {
      let chosenProduct = e.target.getAttribute('data-id')
      products.forEach(element => {
        if (element.id === chosenProduct) {
          this.cart.addProduct(element)
        }
      })
    })
  }
}
