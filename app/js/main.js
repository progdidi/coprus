$(function(){

    //scroll animation
    new WOW().init();

    //SCROLL AUDIO
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../helpers/print.mp3';
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
        const headerWrapper = document.querySelector('.header__inner');
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
      $.ajax({
        type: "POST",
        url: "mailer/mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
      });
      return false;

    })
});