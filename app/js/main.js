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

    menu.addEventListener ('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
      
    })


    //FIXED MENU
    window.addEventListener('scroll', () => {
        const ScrollHeight = window.pageYOffset;
        const headerWrapper = document.querySelector('.header__top');
        const headerTopHeight = headerWrapper.getBoundingClientRect().height;
        const clippyItem = document.querySelector('.clippy');
    
        if(ScrollHeight > headerTopHeight) {
          headerWrapper.classList.add('header__fixed');
          
        } else {
          headerWrapper.classList.remove('header__fixed');
        }
      })



    //CONTACTS FORM
    {
      const form = document.querySelector('.contacts__form');
      const formEmail = document.querySelector('.email');
      const modal = document.querySelector('.modal');
      const closeBtn = document.querySelector('.close-btn');
  
      function formReset(){
        form.reset();
      }
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const req =  fetch("mailer/mailer/smart.php", {
          method: 'post',
          body: formData
        });
        req.then(response => {
          if(response.ok && response.status === 200){
            alert('new!');
            modal.classList.add('open');
            setTimeout(() => {
              modal.classList.remove('open');
            }, 500)
            formReset();
          }
        })
      })
  
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
      })
  
      modal.addEventListener('click', (e) => {
        if(!e.target.classList.contains('modal__content')) {
          modal.classList.remove('open');
        }
      })
  
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            modal.classList.remove('open');
        }
    })
  
    }


    

    //Clippy

    window.CLIPPY_CDN = '../helpers/agents/'

    clippy.load('Rover', function(agent) {
   
      agent.play('Searching');
    });
      
 

   
});