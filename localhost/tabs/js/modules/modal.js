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

export default modal;
export { openModal };
export { closeModal };
