const btn = document.querySelector("button");
const form = document.querySelector("form");
const onBtnClick = (e) => {
  console.log(e);
};
// btn.forEach((eve) => eve.addEventListener("click", onBtnClick));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
});
// window.addEventListener("scroll", (e) => {
//   console.log(e);
// });
// btn.addEventListener("click", onBtnClick);
// setTimeout(() => {
//   btn.removeEventListener("", onBtnClick);
// }, 2000);

//aqui tem uma para bem util, o browser executa o evento de dentro para fora, ou seja o log da div é o segundo logo
//por conta do btn estar dentro dela
const div = document.querySelector("div");
div.addEventListener(
  "click",
  (e) => {
    console.log("div", e);
  },
  // porem se adicionar true aqui a div passa a ser o primeiro, pq esse true set o evento para capture e não bubbling
  false
);
//capture o representa a entrada, bubbling representa a saída
btn.addEventListener("click", (e) => {
  // e.stopPropagation() esse cara aqui para a propagação (bubbling) dos eventos, a div no caso é ignorada pelo click
  console.log(e);
});

const liItems = document.querySelectorAll("li");
// for (const li of liItems) {
//   li.addEventListener("click", (e) => {
//     e.target.classList.toggle("highlight");
//   });
// }

// uma alternativa para esse for loop ou forEach é a seguinte, btw esse método é mais optimizado
const list = document.querySelector("ul");
list.addEventListener("click", function (e) {
  //nesse caso o evento acontece no elemento em que voce clicar
  // e.target.classList.toggle("highlight");
  //com o currentTarget o evento acontece em toda a ul ja que é o elemento ouvinte
  //   e.currentTarget.classList.toggle("highlight");
  //e por fim o cara que seleciona o elemento especifico apontado
  e.target.closest("li").classList.toggle("highlight");
  //isso invoca o submit event em qualquer lugar que tenha evento, mas ele ignora o próprio evento, ou seja sem preventDefault()
  //   form.submit();
  //   btn.click();
  //this funciona como um currentTarget
  console.log(this);
});
