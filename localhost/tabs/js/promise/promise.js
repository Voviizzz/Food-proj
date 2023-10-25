// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Привет, я первый вывод промиса!");
//   });
// })
//   .then((firstLog) => {
//     console.log(firstLog);
//     //дальше если у нас встречается асинхрнный код мы должны вернуть новый промис
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(
//           console.log(
//             firstLog + " Этоя я асинхроонный! Должен сработать через 2с"
//           )
//         );
//       }, 2000);
//     });
//   })
//   .then((secondLog) => {
//     console.log(secondLog + "а это конец цепочки!");
//   });

//что понятно из этого примера, что если у нас есть асинхронный код, то мы все равно его оборачиваем в then
// .then(()=>{
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(данные попадут сюда из then выше, можем их модифицировать!)
//     })
// })

// ____________________________________ПРИМЕР ИСПОЛЬЗОВАНИЯ ПРОМИСОВ fetch__________________________________________________________

// Мы будем использовать метод fetch, чтобы подгрузить информацию о пользователях с удалённого сервера. Этот метод имеет много опциональных параметров, разобранных в соответствующих разделах, но базовый синтаксис весьма прост:
// let promise = fetch(url)

// fetch("article/promise-chanjing/user")
//   .then((response) => response.json())
//   .then((user) => fetch(`hhtps/api/github/user/${user.name}`))
//   .then((response) => response.json())
//   .then(
//     (gitHubUser) =>
//       new Promise((resolve, reject) => {
//         let img = document.createElement("img");
//         img.src = gitHubUser.avatar.url;
//         img.className = "promise-test-avatar";
//         document.body.append(img);

//         setTimeout(() => {
//           img.remove();
//           resolve(gitHubUser);
//         }, 3000);
//       })
//   )
//   .then((gitHubUser) => {
//     alert(`закончили показ ${gitHubUser.name}`);
//   })
//  let urls = ['user.json', 'guest.json']

// let result = []

// urls.forEach(function(url){
//   console.log(url);
// })

// ___________________________________________Пример с промисом ____________________________________________________
// pending - ожидание
// fulfield - выполнился успешно
// reject - ожибка
let mesages = {
  error: "Ошибка",
  done: "Все хорошо!",
};
// const promise = new Promise((resolve, reject) => {
//   fetch("https://jsonplaceholder.typicode.com/toasasasdos/1")
//     .then((response) => {
//       // console.log(response);
//       // if (response.ok) resolve(response.json());
//       // else reject(response);
//       console.log(response);
//       console.log(mesages.done);
//       resolve(response);
//     })
//     .catch((e) => {
//       reject(e);
//       console.log(mesages.error);
//     });
//   // прилетел response, но состояние промиса не изменилось оно <..pending..>
// });

//не обязателоьно объявлять явно промис new Promise, достаточно просто послать fetch запрос!
fetch("https://jsonplaceholder.typicode.com/todos/1")
  // когда промис отработал then, промис изменил свое состояние на fulfield!
  // запись ниже не правильная, данный лог не выведет данных!
  // response => response.json() - ловит состояния фетча
  // .then(responce => {
  //   console.log(responce.json());
  // 1) первый then ловит состояние, 2 then выводит результат в формате json
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

//на практике зачем нужна цепочка запросов then
//либо такая запись! 
const promise_1 = new Promise((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/todos/1").then((data) =>
    resolve(console.log(data.json()))
  );
});
const promise_2 = new Promise((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/todos/2").then((data) =>
    resolve(console.log(data.json()))
  );
});
Promise.all([promise_1,promise_2]).then((data)=>{
  console.log(data);
})