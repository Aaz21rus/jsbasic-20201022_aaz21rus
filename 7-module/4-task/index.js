export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value +1
    this.elem = document.createElement('DIV')
    this.elem.className = 'slider'
    this.elem.insertAdjacentHTML('afterbegin',`
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 25%;">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->

      <div class="slider__progress" style="width: 25%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps"></div>
    `)
    this.renderStep(steps)
    this.elem.querySelectorAll('span')[this.value].classList.add('slider__step-active')
    this.sliderClick(steps)
  }

  renderStep(steps) {
    const stepS = this.elem.querySelector('.slider__steps')
    const span = document.createElement('SPAN')
    for(let i = 0; i < steps; i++) {
      stepS.innerHTML += '<span></span>'
    }
  }

  sliderClick(steps) {
    const thumb = this.elem.querySelector('.slider__thumb')
    const sliderVal = this.elem.querySelector('.slider__value')
    const sliderProg = this.elem.querySelector('.slider__progress')
    const span = Array.from(this.elem.querySelectorAll('span'))

    thumb.onpointerdown = function(e) {
      thumb.ondragstart = () => false
      const slider = document.querySelector('.slider')

      function onMouseMove(e) {
        moveAt(e.clientX, slider)
        document.querySelector('.slider').classList.add('slider_dragging')

        // generate Custom Event for pointermove
        this.sliderChange = new CustomEvent('slider-change', {
          detail: sliderVal,
          bubbles: true
        })
        this.dispatchEvent(this.sliderChange)
      }

      document.addEventListener('pointermove', onMouseMove)

      function moveAt(x,target) {
        console.log(e);
        let left =  x - target.getBoundingClientRect().left
        let leftRelative = left / target.offsetWidth;


        if (leftRelative < 0) {
          leftRelative = 0
        }

        if (leftRelative > 1) {
          leftRelative = 1
        }

        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        sliderProg.style.width = `${leftPercents}%`;
        let segments = steps - 1
        let approximateValue = leftRelative * segments
        let value = Math.round(approximateValue)
        sliderVal.textContent = value
        span.forEach(item => item.classList.remove('slider__step-active'))
        if(value+1 <= segments) {
          span[value+2].classList.add('slider__step-active')
        }
      }

      thumb.onpointerup = (sliderVal, steps) => {
        document.removeEventListener('pointermove', onMouseMove);
        thumb.onmouseup = null;

        // generate Custom Evrnt for pointerup
        this.sliderChange = new CustomEvent('slider-change', {
          detail: sliderVal,
          bubbles: true
        })
        this.dispatchEvent(this.sliderChange)
      }

      // generate Custom Event for pointerdown
      this.sliderChange = new CustomEvent('slider-change', {
        detail: sliderVal,
        bubbles: true
      })
      this.dispatchEvent(this.sliderChange)
    }

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      thumb.style = `left: ${valuePercents}%;`
      sliderVal.textContent = value
      sliderProg.style = `width: ${valuePercents}%;`
      span.forEach(item => item.classList.remove('slider__step-active'))
      if(value+1 <= segments) {
        span[value+2].classList.add('slider__step-active')
      }

      this.sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(this.sliderChange)
    })
  }

  // generate Custom Event for click
  customEv() {
    this.sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })
    this.elem.dispatchEvent(this.sliderChange)
  }
}
