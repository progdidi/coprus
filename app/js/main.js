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
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formSubmit();
    })

    async function formSubmit() {
      alert ('сообщение отправили! та-дам!');
      const data = serializeForm(form);
      const response = await sendData(data);
      if (response.ok) { 
        let result = await response.json();
        alert(result.message);
        formReset();
      } else {
        alert ("Код ошибки: " + response.status);
      }
    }

    function serializeForm(formNode) {
      return new FormData(form);
    }

    async function sendData(data) {
      return await fetch("send_mail.php", {
        method: "POST",
        body: data,

      })
    }

    function formReset() {
      form.reset();
    }


    //fixed scroll
    const clippy = document.querySelector('.clip');
    const step = document.querySelector('.step');

    function scrollToItem(item) {
      clippy.addEventListener('click', () => {item.scrollIntoView();})
    };

    scrollToItem(step);

   
});