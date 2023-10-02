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
    const formEmail = document.querySelector('.email');

    function formReset(){
      form.reset();
    }
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const req = fetch("send_mail.php");
      req.then(response => {
        if(response.ok && response.status === 200){
          alert('Форма отправлена!');
          formReset();
        }
      })
    })
   
});