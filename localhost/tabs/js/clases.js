// "use strict";

// //html файл находится в tabs

// //по сути это шаблон
// class Rectangle {
//   //начинаем конструировать класс
//   constructor(height, width) {
//     //должны их записать в свойства новго объекта
//     this.height = height;
//     this.width = width;
//   }
//   //слздаем метод
//   clcArea() {
//     return this.height * this.width;
//   }
// }
// //создаем еще один класс, на основе базового
// class ColorReactangleWithText extends Rectangle {
//   constructor(height, width, text, backgroundColor) {
//     //чтобы не копировать все свойства класса родителя, можно прописать super(), super()всегда идет первой строчкой

//     super(height, width);
//     this.text = text;
//     this.backgroundColor = backgroundColor;
//   }
//   showMyProps() {
//     console.log(`текст: ${this.text} и цвет ${this.backgroundColor}`);
//   }
// }

// // использвуем класс
// const square = new Rectangle(12, 12);
// const long = new Rectangle(12, 44);
// const div = new ColorReactangleWithText(12, 22, "hello", "red");
// div.showMyProps();
// console.log(div.clcArea());

// console.log(long.clcArea());

// __________________________________________________Принципы ООП__________________________________________________

// 1) Абстракция - отделяем концепцию от ее экземпляра
// 2) Наследование - способность объекта или калсса базироваться на основе другого объекта или класса
// 3) Полиморфизм - решение задачи разными способами
// 4) Инкапсуляция - размещение одного объекта или класса внутри другого для разграничения доступа к ним.

//теперь мы подключаемся к html tabs и будем конструировать через классы карточки

window.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.querySelectorAll("[data-modal]");
  const modalWindow = document.querySelector(".modal");

  class menuCard {
    constructor(
      src,
      altimg,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.altimg = altimg;
      this.title = title;
      this.description = description;
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
            ${this.description}      
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
  const getResourse = async (url) => {
    const res = await fetch(url);

    //Обработка состояния fetch
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    //возвращаем в json формате
    return await res.json();
  };
  getResourse("http://localhost:3000/menu").then((data) => {
    //в foreach находится деструктуризация класса
    data.forEach(({ img, altimg, title, description, price }) => {
      new menuCard(
        img,
        altimg,
        title,
        description,
        price,
        ".menu .container",
        "menu__item"
      ).render();
    });
  });

  // *  Второй вариант для динамического отображения файлов, она через функцию!
  // *
  // *
  // *
  // *
  // *
  // *

  // *
  // *

  // getResourse("http://localhost:3000/menu").then((data) => createCard(data));
  // //в foreach находится деструктуризация класса
  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, description, price }) => {
  //     //создаем блок, где будет распологаться элемент
  //     const element = document.createElement("div");
  //     element.classList.add("menu__item");
  //     element.innerHTML = `<img src=${img} alt=${altimg} />
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //           <div class="menu__item-descr">
  //             ${description}
  //           </div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> руб/день</div>`;
  //     document.querySelector(".menu .container").append(element);
  //   });
  // }

  //плохой метод для рендеринга, нужно делать так, как написано выше!
  // new menuCard(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   `Меню "Фитнес"`,
  //   `   Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  // свежих овощей и фруктов. Продукт активных и здоровых людей. Это
  // абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //   9,
  //   ".menu .container",
  //   "menu__item",
  //   "big"
  // ).render(); //используем объект на месте и он исчезнет
  // new menuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   `Меню "Премиум"`,
  //   `     В меню “Премиум” мы используем не только красивый дизайн упаковки,
  //   но и качественное исполнение блюд. Красная рыба, морепродукты,
  //   фрукты - ресторанное меню без похода в ресторан!`,
  //   10,
  //   ".menu .container",
  //   "menu__item"
  // ).render(); //используем объект на месте и он исчезнет
  // new menuCard(
  //   "img/tabs/elite.jpg",
  //   "vegy",
  //   `Меню "Фитнес"`,
  //   `   Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  // свежих овощей и фруктов. Продукт активных и здоровых людей. Это
  // абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //   11,
  //   ".menu .container",
  //   "menu__item"
  // ).render(); //используем объект на месте и он исчезнет

  //Foms работа с формой по технологии Ajax

  const form = document.querySelectorAll("form");
  // console.log(form);

  const timerModal = setTimeout(openModal, 10000);

  function openModal() {
    modalWindow.style.display = "block";
    //так же можно через toggle, но сначала нужно добавить класс к модальному окну
    document.body.style.overflow = "hidden"; //для отсутсвия прокрутки при скроле
    clearInterval(timerModal);
  }

  //текстовое сообщение, чтобы пользователь понимал, что у нас что-то прозошло
  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

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

  // * __________________________________ функция PostData отвечает за отправку данных на сервер
  // * async/await всегда тспользуется в паре, когда мы запускаем PostData - js ждет результат запрос, потому что есть await
  // * только когда вернется результат await пропустит код дальше
  // *
  // *
  // *
  // *
  // *
  // *
  // *

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
      postData("http://localhost:3000/emploe", json)
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

    function closeModal() {
      modalWindow.style.display = "none";
      document.body.style.overflow = "";
    }

    function showThanksModal(message) {
      const prevModalDialog = document.querySelector(".modal__dialog");
      prevModalDialog.classList.add("hide");
      openModal();
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
        closeModal();
      }, 5000);
    }

    // ______________________________________FETCHAPI___________________________________________________________________________
    //классический гет запрос, фетч использует промисы!
    // response - ответ
    // response.json(()) возвращает промис, и получаем обычный объект
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //   method: "POST",
    //   body: JSON.stringify({ name: "Alex" }),
    //   headers: {
    //     "Content-type": "application/json"
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  }

  // *
  // *
  // *
  // *________________________________________________ SLIDER __________________________________
  // *
  // *

  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
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
  const slider = document.querySelector(".offer__slider");
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

  // *
  // *
  // *
  // *
  // *___________________________________________   ДЕЛАЕМ КАЛЬКУЛЯТОР ДЛЯ ВЫСЧЕТА СУТОЧНОЙ НОРМЫ КАЛОРИЙ
  // *
  // *
  // *
  // *
  // *

  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  // *________________________________________________Работа с LOCAL STORAGeE
  // *

  //Проверка есть ли данные в LocalStorage, если нет, то значения по умолчанию ! 
  if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex')
  } else {
    sex = 'female'
    localStorage.setItem('sex', 'female')
  }
  if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio')
  } else {
    ratio = 1.375
    localStorage.setItem('ratio', 1.375)
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
});


