import tabs from "./modules/tabs";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import timer from "./modules/timer";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const timerModal = setTimeout(() => openModal(".modal", timerModal), 10000);

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", timerModal);
  cards();
  forms("form", timerModal);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  timer(".timer", "2023-12-12");
  calc();
});
