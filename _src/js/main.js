"use strict"

document.addEventListener('DOMContentLoaded', function() {

// Глобальные
const body = document.querySelector('body');

// Меню
const menu = document.querySelector('#navMenu'),
      menuBody = document.querySelector('.nav__menu__body'),
      burger = document.querySelector('.nav-burger-icon'),
      menuClose = document.querySelector('.nav__menu-close');

burger.addEventListener('click', function(e) {
  e.stopPropagation();
  menu.classList.add('_show');
  body.classList.add('_lock');
});

menuClose.addEventListener('click', function() {
  menu.classList.remove('_show');
  body.classList.remove('_lock');
});

const form = document.querySelector('#formSendTelegram');

form.addEventListener('submit', formSend);

async function formSend(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('telegram.php', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    const result = await response.json();
    form.reset();
    // alert(result.message);
    const successful = document.querySelector('.response-successful');
    successful.classList.add('_show');
    setTimeout(() => {
      successful.classList.remove('_show');
    }, 3000);
  } else {
    const error = document.querySelector('.response-error');
    error.classList.add('_show');
    setTimeout(() => {
      error.classList.remove('_show');
    }, 3000);
  }
}

// Аккордион в меню
const accordionHeaders = document.querySelectorAll('.acc-header');

accordionHeaders.forEach(accordionHeader => {
  const accordionBody = accordionHeader.nextElementSibling;

  accordionHeader.addEventListener('click', e => {
    accordionHeader.parentNode.classList.toggle('_active');

    if (accordionHeader.parentNode.classList.contains('_active')) {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    } else {
      accordionBody.style.maxHeight = 0;
    }
  });

  if (accordionHeader.parentNode.classList.contains('_active')) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
  } else {
    accordionBody.style.maxHeight = 0;
  }
});

// плавный скролл до якорей
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        menu.classList.remove('_show');
        body.classList.remove('_lock');
    });
}
});