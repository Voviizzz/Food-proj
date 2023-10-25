window.addEventListener("DOMContentLoaded", () => {
  //Разбиваем на константы
  //вся коллекция кнопок хранится в btns
  //   --
  const btns = document.querySelectorAll(".tabheader__item");
  //   console.log(btns);
  //   --
  //вся коллекция контента хранитя в tabcontent
  const tabContent = document.querySelectorAll(".tabcontent");
  //   console.log(tabcontent);
  //   --
  //родитель нам нужен для делегирования
  const btnParrent = document.querySelector(".tabheader__items");
  // Функция для скрытия контента
  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    //убираем активный класс у кнопок и ставим NONE контенту
    btns.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  //по умолчанию у нас отображается первый контент из коллекции контента и кнопки
  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    btns[i].classList.add("tabheader__item_active");
  }
  //вызываем обе функции
  hideTabContent();
  showTabContent();

  //Делегирование событий, чтобы при нажатии на таб - менялся контент
  btnParrent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      btns.forEach((btn, i) => {
        if (target == btn) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
});
