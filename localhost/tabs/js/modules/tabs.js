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

export default tabs;
