class OldPerson {
  printAge() {
    console.log(this.age);
  }
}
class Person extends OldPerson {
  name = "max";
  constructor() {
    super();
    this.age = 30;
  }
  greet() {
    console.log(this.name, this.age);
  }
}

console.dir(Person);
const per = new Person();
per.greet();
console.log(per.__proto__);
