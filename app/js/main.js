
$(function(){

    //scroll animation
    new WOW().init();

    
    //Clippy
    window.CLIPPY_CDN = '../helpers/agents/';
    clippy.load('Rover', function(agent) {
        agent.animate();
        const clippyItem = document.querySelector('.clippy');
        const clippyText = ['Тесак себя не убивал', 'подпишись на канал', 'агагагаг'];

        const clippySay = function(){
          const index = Math.floor(Math.random() * clippyText.length);
          agent.speak(clippyText[index]);
        }

        clippyItem.addEventListener('mouseenter', () => {
          clippySay();
        })

      }
        
    ) 


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



    //CONTACTS FORM & MODALS
    {
      const forms = document.querySelectorAll('.contacts__form');
      const modals = document.querySelectorAll('.modal');
      const closeBtn = document.querySelectorAll('.close-btn');
      const orderBtn = document.querySelector('.header__promo-btn');
      const orderForm = document.querySelector('.modal__form');
      const message = document.querySelector('.modal__message');
      const messageText = document.querySelector('.modal__content-info');
  
      forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(form);
          const req =  fetch("mailer/mailer/smart.php", {
            method: 'post',
            body: formData
          });
          req.then(response => {
            if(response.ok && response.status === 200){
              if(form.classList.contains('order-form')) {
                orderForm.classList.remove('open');
              } 
              message.classList.add('open');
              setTimeout(() => {
                message.classList.remove('open');
              }, 1000)
              form.reset();
              
            } else {
              messageText.textContent = 'Форма не отправлена';
              message.classList.add('open');
            }
          })
        })
      })
      
      

      closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.parentNode.parentNode.classList.remove('open');
        })
      })

      modals.forEach((modal) => {
        modal.addEventListener('click', (e) => {
          if(e.target.classList.contains('modal') && !e.target.classList.contains('modal__content')) {
            modal.classList.remove('open');
          }
        })

        document.addEventListener('keydown', (e) => {
          if(e.key === 'Escape') {
              modal.classList.remove('open');
          }
        })

      })

      orderBtn.addEventListener('click', () => {
          orderForm.classList.add('open');
      })
  
    }

   
});