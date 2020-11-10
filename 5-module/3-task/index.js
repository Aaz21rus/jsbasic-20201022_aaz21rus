function initCarousel() {
  const carusel = document.querySelector('.carousel__inner')
  const caruselWidth = carusel.offsetWidth
  const rightBtn = document.querySelector('.carousel__arrow_right')
  const leftBtn = document.querySelector('.carousel__arrow_left')
  let countClick = 0

  leftBtn.style.display = 'none'

  rightBtn.addEventListener('click', () => {
    countClick = ++countClick
    carusel.style.transform = `translateX(-${caruselWidth*countClick}px)`
    if(countClick === 3) {
      rightBtn.style.display = 'none'
    } else {
      rightBtn.style.display = ''
      leftBtn.style.display = ''
    }
  })

  leftBtn.addEventListener('click', () => {
    countClick = --countClick
    carusel.style.transform = `translateX(-${caruselWidth*(countClick)}px)`
    if(countClick === 0) {
      leftBtn.style.display = 'none'
    } else {
      leftBtn.style.display = ''
      rightBtn.style.display = ''
    }
  })
}
