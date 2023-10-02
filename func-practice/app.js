let multiplier = 1.5;
function createTaxCalculator(tax) {
  console.log(tax);
  function calculate(amount) {
    console.log(multiplier);
    return amount * tax * multiplier;
  }
  return calculate;
}
//passa o parâmetro da primeira func
const calculated = createTaxCalculator(0.2);
const calculating = createTaxCalculator(0.5);
const calculatingThings = createTaxCalculator(0.9);

//atribui um novo valor
multiplier = 1.7;
//passa o parâmetro da func dentro da primeira
console.log(calculated(500));
/*conclusão, é algo que ja sabia por praticar muito o uso de func, mas basicamente a o valor fora do corpo da func sempre é printado dentro da fun com o último valor antes do loop
entrar no corpo da func, ou seja, voce pode alterar o valor do multiplier nesse caso antes de printar a func responsável por realizar o calculo!
o mesmo se aplica para o primeiro parâmetro passado, se por algum acaso voce alterar o valor dele antes da func calculate realize seu calculo a func calculate assumira o valor de tax mais recente
como é o caso desse setup que montei, mesmo eu usando a const calculated que passa o parâmetro de 0.2 para a func createTaxCalculator o jS vai considerar o valor de 0.9 da calculatingThings. 
Então deve se prestar atenção com esses erros, pois as func quando usa valores que vem de fora de seu corpo elas sempre pega o valor mais recente possível!!! */

//
function helloUser() {
  let name = "Ana";
  console.log("hello", name);
}
let name = "Luiz";
helloUser();
/*Aqui é qual variável toma prioridade, nesse caso a variável dentro do corpo da func sempre vai ter preferência */

//corpo da func = lexical environment

//
function powerOf(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
console.log(powerOf(4, 5));
//escrevendo essa func de forma recursiva, mesmo resultado da powerOf, porém de forma recursiva
function powerOfR(x, n) {
  if (n === 1) {
    return x;
  }

  return x * powerOfR(x, n - 1);
}
console.log(powerOfR(4, 5));

//Situação onde a recursiva brilha, imagina um cenário onde voce tem um nest muito inserto, como o caso da const myFriends
const myFriends = {
  name: "Luiz",
  friends: [
    {
      name: "Gustavinho zika",
      friends: [{ name: "alguém", friends: [{ name: "mais alguém" }] }],
    },
    {
      name: "Julio",
      friends: [{ name: "Valter" }],
    },
  ],
};
//essa func refaz o loop até todos os friends entrar no array, graças ao for loop
function printFriend(person) {
  const friendCollection = [];
  if (!person.friends) {
    return [];
  }
  for (const friend of person.friends) {
    friendCollection.push(friend.name);
    friendCollection.push(...printFriend(friend));
  }
  return friendCollection;
}

console.log(printFriend(myFriends));

//
function maths(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(maths(5, 50));

//construindo string com functions
function productDescription(strings, productName, productPrice) {
  console.log(strings);
  console.log(productName);
  console.log(productPrice);
  let priceCategory = "cheap";
  if (prodPrice > 20) {
    priceCategory = "unfair";
  }
  return `${strings[0]}${productName}${strings[1]}${priceCategory} ${productPrice}${strings[2]}`;
}

const productName = "algum produto";
const prodPrice = 55.5;

const productOutput = productDescription`this product (${productName}) is (${prodPrice}). Know or products...`;
console.log(productOutput);

//validações com o regex
const regex = new RegExp(/^\S+@\S+\.\S+$/);
//o dot funciona como um curinga para aquele caractere, caso queira ler o dot como um caractere tem de colocar a \
const regex1 = new RegExp(/.ello/);
const regex2 = new RegExp(/^\S+@\S+\.\S+$/);
const regex3 = new RegExp(/^\S+@\S+\.\S+$/);
