$(function(){

    //scroll animation
    new WOW().init();

    //SCROLL AUDIO
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../helpers/print.mp3';
    audio.type = 'audio/mpeg';
    let timer = null;

    document.addEventListener('scroll', () => {
        audio.play();

        clearTimeout(timer);
        timer = setTimeout(function() {
            audio.pause()
        }, 100);
    })

    //HAMBURGER MENU
    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu__list');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
    })


    //FIXED MENU
    window.addEventListener('scroll', () => {
        const ScrollHeight = window.pageYOffset;
        const headerWrapper = document.querySelector('.header__top');
        const headerTopHeight = headerWrapper.getBoundingClientRect().height;
    
        if(ScrollHeight > headerTopHeight) {
          headerWrapper.classList.add('header__fixed');
        } else {
          headerWrapper.classList.remove('header__fixed');
        }
      })



    //CONTACTS FORM
    const form = document.querySelector('.contacts__form');

    function createError(input, text) {
      const parentBox = input.parentNode;
      parentBox.classList.add('error');

      const errorLabel = document.createElement('label');
      errorLabel.classList.add('error-label');
      errorLabel.textContent = text;

      parentBox.appendChild(errorLabel);
      
    }

    function removeError(input) {
      const parentBox = input.parentNode;
      if (parentBox.classList.contains('error')) {
        parentBox.querySelector('.error-label').remove();
        parentBox.classList.remove('error');
      }
    }

    function formValidate(form) {
      let result = true;
      const requiredInputs = form.querySelectorAll('.required');
      
      requiredInputs.forEach((input) => {
        removeError(input);
        if (input.value == "") {
          result = false;
          createError(input, 'поле не заполнено');
        }})

      return result;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      formValidate(form) ? alert('все хорошо!') : alert('everything is bad');
    })


    //fixed scroll
    const clippy = document.querySelector('.clip');
    const step = document.querySelector('.step');

    function scrollToItem(item) {
      clippy.addEventListener('click', () => {item.scrollIntoView();})
    };

    scrollToItem(step);

   
});