/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/calc.js":
/*!*************************!*\
  !*** ./modules/calc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//________________________________________________Модуль калькулятор калорий

function calc() {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  // *________________________________________________Работа с LOCAL STORAGeE
  // *

  //Проверка есть ли данные в LocalStorage, если нет, то значения по умолчанию !
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  //Иницализация клаасов активнойсти вместо с local storage, Один раз сработает, установка классов в нужные блоки!
  function initLocalSettings(selector, acticveClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.classList.remove(acticveClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(acticveClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(acticveClass);
      }
    });
  }
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  // console.log(ratio);
  //   console.log(sex);
  // *
  // *__________________________________________________

  // добавляем дефолтные значения

  //подсчитать конечный результта
  function calcTotlal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "_______";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (444.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotlal();

  function getStaticInformation(selector, acticveClass) {
    const elements = document.querySelectorAll(selector); //внутри родителя получать дивы
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          // console.log(ratio); //вытаскиваем активность, которая в элементе на который мы нажали
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
          // console.log(localStorage.getItem(ratio));
          // console.log("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
          // console.log("sex", sex);
        }
        elements.forEach((element) => {
          element.classList.remove(acticveClass);
        });
        e.target.classList.add(acticveClass);
        calcTotlal();
      });
    });
    //это делегирование событий, но он багнутый
    // document.querySelector(parentSelector).addEventListener("click", (e) => {
    // });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  calcTotlal();

  //функция для инпутов
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;

          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotlal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);



/***/ }),

/***/ "./modules/cards.js":
/*!**************************!*\
  !*** ./modules/cards.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/service */ "./modules/services/service.js");

function cards() {
  class menuCard {
    constructor(
      src,
      altimg,
      title,
      descr,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 100;
      this.classes = classes;
      // console.log(this.parent);
      this.changeToRub();
    } 

    changeToRub() {
      this.price += this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      //условие на класс по умолчанию

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      //--------------------------------------------------------

      // console.log(this.classes);
      this.classes.forEach((className) => element.classList.add(className));
      element.innerHTML = ` 
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">
            ${this.descr}      
          </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
`;
      this.parent.append(element);
    }
  }

  // * функция getResourse нужна для получения данных с сервера, а именоо для карточек
  // * по сути та же функция что и POST
  // *
  // *

// __________________________________________________ Врезаем эту функцию в service. а тут оставляем вызов этой функции
  // const getResourse = async (url) => {
  //   const res = await fetch(url);

  //   //Обработка состояния fetch
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }
  //   //возвращаем в json формате
  //   return await res.json();
  // };


// ______________________________________________

  // getResourse("http://localhost:3000/menu").then((data) => {
  //   //в foreach находится деструктуризация класса
  //   data.forEach(({ img, altimg, title, description, price }) => {
  //     new menuCard(
  //       img,
  //       altimg,
  //       title,
  //       description,
  //       price,
  //       ".menu .container",
  //       "menu__item"
  //     ).render();
  //   });
  // });
  (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResourse)("http://localhost:3000/menu").then((data) => {
  //в foreach находится деструктуризация класса
  data.forEach(({ img, altimg, title, descr, price }) => {
    new menuCard(
      img,
      altimg,
      title,
      descr,
      price,
      ".menu .container",
      "menu__item"
    ).render();
  });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./modules/forms.js":
/*!**************************!*\
  !*** ./modules/forms.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/service */ "./modules/services/service.js");




function forms(formSelector, timerModal) {
  const form = document.querySelectorAll(formSelector);
  // const formData = new FormData(form);
  // const json = JSON.stringify(Object.fromEntries(formData.entries()));

  // console.log(form);

  // const timerModal = setTimeout(openModal, 10000);

  // function openModal() {
  //   modalWindow.style.display = "block";
  //   //так же можно через toggle, но сначала нужно добавить класс к модальному окну
  //   document.body.style.overflow = "hidden"; //для отсутсвия прокрутки при скроле
  //   clearInterval(timerModal);
  // }

  // //текстовое сообщение, чтобы пользователь понимал, что у нас что-то прозошло
  // openModalBtn.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     openModal(()=> ,moda);
  //   });
  // });

  const message = {
    //можно вставить картинку
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы свяжемся",
    failture: "Ошибка",
  };

  form.forEach((item) => {
    // console.log(item);
    bindPostData(item);
  });

 

  //привязка постинга данных
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); //отменяем стандартное поведение брапузера

      //вывод сообщения пользователю
      // const statusMessages = document.createElement("div");
      // statusMessages.classList.add("status");

      //для картинки
      const statusMessages = document.createElement("img");
      statusMessages.src = message.loading;
      statusMessages.style.cssText = `
        display:block;
        margin: 0 auto;
      `;
      statusMessages.textContent = message.loading;
      // form.append(statusMessages);
      // это нужно для того, чтобы не рушить верстку при вставки спинера
      form.insertAdjacentElement("afterend", statusMessages);

      // const request = new XMLHttpRequest();
      // request.open("POST", "js/server.php");
      // request.setRequestHeader("Content-Type", "application/json");

      //считывание данных с формы
      const formData = new FormData(form);

      //чтобы отправить в json - заголовок точно нужно
      //отправить данные в формате JSON
      // *
      // *
      // *  const obj = {};
      //   formData.forEach(function (value, key) {
      //   obj[key] = value;
      //   });
      // *
      // *  Но для преобразования в JSON, есть запись получше!
      // * Берем form data превращаем в массив ((formData.entries()))), затем превращаем в классический объект(Object.fromEntries), затем в JSON формат
      // *
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // console.log(obj);
      // const json = JSON.stringify(obj);
      // console.log(json);

      //_______________________________FETCH API ________________________________________________
      // postData("http://localhost:3000", json)
      //   // .then((data) => data.text())
      //   .then((data) => {
      //     // console.log(data);
      //     showThanksModal(message.success);
      //     statusMessages.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failture);
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });
      (0,_services_service__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/names", json)
      // .then((data) => data.text())
      .then((data) => {
        // console.log(data);
        showThanksModal(message.success);
        statusMessages.remove();
      })
      .catch(() => {
        showThanksModal(message.failture);
      })
      .finally(() => {
        form.reset();
      });

      //когда связка const request = new XMLHttpRequest(); + объект + form data, тогда заголовок не нужен!
      // request.setRequestHeader("Content-type", "multipart/form-data"); //что именно приходть на сервер
      // если выскакивает ошибка 404 скорей всего неправильный путь
      // const formData = new FormData(form);
      // request.send(json);

      //обработчик отправки данных на сервер
      //   request.addEventListener("load", () => {
      //     if (request.status === 200) {
      //       console.log(request.response);
      //       showThanksModal(message.success);
      //       form.reset();
      //       statusMessages.remove();
      //     } else {
      //       showThanksModal(message.failture);
      //     }
      //   });
      // });
    });

    // function closeModal() {
    //   modalWindow.style.display = "none";
    //   document.body.style.overflow = "";
    // }

    function showThanksModal(message) {
      const prevModalDialog = document.querySelector(".modal__dialog");
      prevModalDialog.classList.add("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", timerModal);
      const thanksModal = document.createElement("div");
      thanksModal.classList.add("modal__dialog");
      thanksModal.innerHTML = `
    <div class="modal__content">
       <div class="modal__close" data-close>x</div>
       <div class = "modal__title">${message} </div>
    </div>`;

      document.querySelector(".modal").append(thanksModal);
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
      }, 5000);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./modules/modal.js":
/*!**************************!*\
  !*** ./modules/modal.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, timerModal) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = "block";
  //так же можно через toggle, но сначала нужно добавить класс к модальному окну
  document.body.style.overflow = "hidden"; //для отсутсвия прокрутки при скроле
  console.log(timerModal);
  if (timerModal) {
    clearInterval(timerModal);
  }
}
function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = "none";
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, timerModal) {
  const openModalBtn = document.querySelectorAll(triggerSelector);
  const modalWindow = document.querySelector(modalSelector);
  // //   openModalBtn.forEach((item) => {
  // //     item.addEventListener("click", () => {
  // //     });
  // //   });
  // //   closeModalBtn.forEach((item) => {
  // //     item.addEventListener("click", () => {
  // //       modalWindow.style.display = "none";
  // //     });
  // //   });

  // //решение чела

  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, timerModal));
  });

  // openModalBtn.addEventListener("click", () => {
  //   // modalWindow.style.display = "block";
  //   //так же можно через toggle, но сначала нужно добавить класс к модальному окну
  //   // document.body.style.overflow = "hidden"; //для отсутсвия прокрутки при скроле
  //   openModal();
  // });
  // closeModalBtn.forEach((closeBtn) => {
  //   closeBtn.addEventListener("click", () => {
  //     closeModal();
  //   });
  // });

  // function closeModal() {
  //   modalWindow.style.display = "none";
  //   document.body.style.overflow = "";
  // }

  //для закрытия при клике на подложке
  //можно отследить куда кликнул пользователь использую event.target

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });
  //приницип DRY
  //   dont repeat yoyself, нельзя повтораять код два раза
  // const timerModal = setTimeout(openModal, 10000);

  //------ОТСЛЕЖИВАНИЕ СКРОЛА, ДЛЯ ПОЯВЛЕНИЯ Модального окна

  //document.documentElement.scrollHeight - высота полностью страницы
  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 50
    ) {
      openModal(modalSelector,timerModal);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal("modalSelector");

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
  <div class = "modal__content"
    <div class = "modal__close" data-close>x</div>
    <div class = "modal__title">${message}<div> 
    
  </div>  
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./modules/services/service.js":
/*!*************************************!*\
  !*** ./modules/services/service.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourse: () => (/* binding */ getResourse),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    //нужно hraders, чтобы отправить в формате json
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(obj),
    body: data,
  });

  //возвращаем в json формате
  return await res.json();
};


const getResourse = async (url) => {
  const res = await fetch(url);

  //Обработка состояния fetch
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  //возвращаем в json формате
  return await res.json();
};





/***/ }),

/***/ "./modules/slider.js":
/*!***************************!*\
  !*** ./modules/slider.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const modal = require("./modal");

function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slider = document.querySelector(container);
  const slides = document.querySelectorAll(slide);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + "%";
  slides.forEach((slide) => {
    slide.style.width = width;
  });
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  next.addEventListener("click", () => {
    if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, "") * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, "");
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // *
  // *
  // *
  // *   Добавляем точки на слайдер
  // *
  // *
  // *
  // *
  // const slider = document.querySelector(".offer__slider");
  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  const dots = [];

  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;`;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;`;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      // console.log("click");
      const slideTo = e.target.getAttribute("data-slide-to");
      // console.log(slideTo);
      slideIndex = slideTo;
      //буквы px - удалятся
      offset = +width.replace(/\D/g, "") * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => {
        dot.style.opacity = ".5";
        dots[slideIndex - 1].style.opacity = 1;
      });
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./modules/tabs.js":
/*!*************************!*\
  !*** ./modules/tabs.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelecotr, tabContent, tabsParentSelector, acticveClass) {
  const tabs = document.querySelectorAll(tabsSelecotr);
  const tabsContent = document.querySelectorAll(tabContent);
  const tabParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((tab) => {
      tab.classList.remove(acticveClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add(acticveClass);
  }
  hideTabContent();
  showTabContent();

  //ДЕлегироование собитиый
  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    // console.log(target);
    if (target && target.classList.contains(tabsSelecotr.slice(1))) {
      console.log('i');
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./modules/timer.js":
/*!**************************!*\
  !*** ./modules/timer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  // const deadline = "2023-08-29";

  function getTimeRemaning(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); //разница в милисекундах;
    // console.log(t);
    //проверка прошел ли таймер дедлайн, если он прошел - то все нули
    if (t <= 0) {
      days = 0;
      seconds = 0;
      hours = 0;
      minutes = 0;
    } else {
      // !!!ОБЯЗАТЕЛЬНО ПРОПИСЫВАЕМ ЧЕРЕЗ ЗПЯТЫЕ И НУЖНО СЛЕДАТЬ ЗА СКОБКАМИ!!!
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (seconds = Math.floor((t / 1000) % 60)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)); //количество дней на таймере
      // получим часы, которые не хватают до полных суток
      //получим хвостик (минуты), которые будут менбше 60
    }
    //интересный возврат !
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  //   console.log(getTimeRemaning(deadline));
  //   console.log(setClock(".timer", deadline));

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timerInterval = setInterval(updateClock, 1000);

    //для удаления бага при обновлении
    function updateClock() {
      const t = getTimeRemaning(endtime);

      days.innerHTML = getZero(t.days);

      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    }
    updateClock();
  }
  setClock(id, deadline);
}
//справляем мигание верстки черрез обновалние страницы}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./modules/calc.js");









window.addEventListener("DOMContentLoaded", () => {
  const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", timerModal), 10000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", timerModal);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("form", timerModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])(".timer", "2023-12-12");
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map