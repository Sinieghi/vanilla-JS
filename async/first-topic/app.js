//acho que a API do setTimeout la do node funciona assim
// const setTimer = (duration) => {
//   const promise = new Promise((res, rej) => {
//     setTimeout(() => { res() }, duration);
//   });
//   return promise;
// };
const setTimer = (duration) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("olar");
    }, duration);
  });
  return promise;
};

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      setTimer(4000)
        .then((res) => console.log(res, posData))
        .catch((err) => console.log(err));
    },
    (err) => console.log(err)
  );
}
// getUserLocation();

//jeito mais simplificado de escrever o que esta acima
const trackUserHandler = (forwardOpt) => {
  const promise = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (posData) => res(posData),
      (err) => rej(err),
      forwardOpt
    );
  });
  return promise;
};
// function getUserLocationSimplify() {
//   trackUserHandler()
//     .then((res) =>
//       setTimeout(() => {
//         console.log(res);
//       }, 2000)
//     )
//     .catch((err) => console.log(err));
// }
//da para retornar uma promise dentro de um then chain ex:
function getUserLocationSimplify() {
  let position;
  trackUserHandler()
    .then((res) => {
      position = res;
      return setTimer(5000);
    })
    //essa res é a data retornada do then anterior return setTimer(5000);
    .then((res) => console.log(res, position))
    //tem um fator no chain com o catch, ele só retorna o err referente aos then antes dele, ou seja, da para continuar o chain mesmo com erro
    .catch((err) => {
      console.log(err);
      return err;
    })
    .then((data) => console.log(data))
    .finally((res) => "clear something");
  // não sabia, mas o async await transforma toda a function em .them, ou seja mesmo se vc iniciar outra promise na func ela só vai ser inicializada depois das promises acima dela
}
getUserLocationSimplify();

async function getUserLocationSimplify() {
  let position;
  let timerData;
  try {
    position = await trackUserHandler();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  //até aqui é o padrão
  //aqui entra um outro detalhe que nunca tentei, criar uma let para receber os val da promise, pois como var fora do trycatch eu tenho acesso a ela
  console.log(position, timerData);
  //outra coisa que não sabia, qualquer promise iniciada vai ter de respeitar a ordem, pois nesse setup de async toda a func vira um .then()
  setTimer(1000).then((res) => console.log(res));
  // no caso da minha set timer, ela so vai ser iniciada depois que as promises de cima for fulfilled
}
getUserLocationSimplify();

// método race ele aceita a promise que chegar primeiro e descarta a outra
Promise.race([trackUserHandler(), setTimer(2000)]).then((res) =>
  console.log(res)
);
//all, ele junta toda a data retornada das promises dentro de um obj, se uma for rejeitada não retorna nenhuma
Promise.all([trackUserHandler(), setTimer(2000)]).then((resData) =>
  console.log(resData)
);
//allSettled, retorna todas mesmo falhando, ela retorna um status também, se foi fulfilled ou rejected
Promise.allSettled([trackUserHandler(), setTimer(2000)]).then((resData) =>
  console.log(resData)
);

function promise(timer) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("hello");
    }, timer);
  });
  return promise;
}

function promises(timer) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("hello");
    }, timer);
  });
  return promise;
}

// promises(2000)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// promise(3000)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

Promise.allSettled([promises(2000), promise(3000)]).then((res) =>
  console.log(res)
);
