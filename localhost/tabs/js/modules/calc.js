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

export default calc;

