import { openModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "./services/service";

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
      postData("http://localhost:3000/names", json)
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
      openModal(".modal", timerModal);
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
        closeModal(".modal");
      }, 5000);
    }
  }
}

export default forms;
