/*Завдання 2 - Генератор промісів

Додай в HTML файл розмітку форми. Форма складається з поля вводу для введення значення затримки в мілісекундах, 
двох радіокнопок, які визначають те, як виконається проміс, і кнопки з типом submit, 
при кліку на яку має створюватися проміс.
Напиши скрипт, який після сабміту форми створює проміс. 
В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має 
виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. 
Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

Якщо проміс виконується вдало, виводь у консоль наступний рядок, 
де delay — це значення затримки виклику промісу в мілісекундах.
`✅ Fulfilled promise in ${delay}ms`

Якщо проміс буде відхилено, то виводь у консоль наступний рядок, 
де delay — це значення затримки промісу в мілісекундах.

`❌ Rejected promise in ${delay}ms`
 */

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSnackbar = document.querySelector('.form');
formSnackbar.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();
  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}
