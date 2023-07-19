$(function(){
    //scroll audio
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


    //hamburger menu
    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu__list');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
    })
});