import { getResourse } from "./services/service";
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
  getResourse("http://localhost:3000/menu").then((data) => {
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

export default cards;
