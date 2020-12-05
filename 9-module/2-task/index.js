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

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon,products);

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

    let ribbon = new RibbonMenu(categories);
    let container = document.querySelector('[data-ribbon-holder]');
    container.append(ribbon.elem);

    let slider = document.querySelector('[data-slider-holder]')
    let stepSlider = new StepSlider({
      steps: 5
    });
    slider.append(stepSlider.elem);

    document.querySelector('.products-grid').remove()
    let grid = document.querySelector('[data-products-grid-holder]')
    let productGrid = new ProductsGrid(products);
    grid.append(productGrid.elem);
  }
}
