import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('DIV')
    this.elem.className = 'container'
    this.elem.innerHTML = `
    <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `
    this.closeBtn()
    this.closeEsc()
  }
  open() {
    document.querySelector('body').append(this.elem)
    document.querySelector('body').classList.add('is-modal-open')
  }
  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title
    console.log(title);
  }
  setBody(element) {
    this.elem.querySelector('.modal__body').append(element)
    console.log(typeof(element));
  }
  close() {
    this.elem.remove()
    document.querySelector('body').classList.remove('is-modal-open')
  }
  closeBtn() {
    const btnClose = this.elem.querySelector('.modal__close')
    btnClose.addEventListener('click', () => {
      this.elem.remove()
      document.querySelector('body').classList.remove('is-modal-open')
    })
  }
  closeEsc() {
    window.addEventListener('keydown', (ev) => {
      if(ev.code === 'Escape') {
        document.querySelector('body').classList.remove('is-modal-open')
        this.elem.remove()
      }
    })
  }
}
