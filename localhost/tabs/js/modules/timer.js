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

export default timer;
