class Course {
  room = [
    {
      title: "math",
      lengthSize: 15,
      price: 59,
    },
    {
      title: "eng",
      lengthSize: 8,
      price: 99,
    },
    {
      title: "art",
      lengthSize: 12,
      price: 69,
    },
  ];
  classValue() {
    for (const classRoom of this.room) {
      const app = document.getElementById("app");
      const classContainer = document.createElement("div");
      const valOfCourse = classRoom.price / classRoom.lengthSize;
      classContainer.innerHTML = `
      <p>${classRoom.title}</p>
      <p>${classRoom.price}$</p>
      <p>${classRoom.lengthSize}</p>
      <p>price per slot: ${valOfCourse.toFixed(0)}$</p>
      `;
      app.append(classContainer);
      console.log(valOfCourse.toFixed(0));
    }
  }
}
class PracticalCourse extends Course {
  numOfExercises = [];
}
class TheoreticalCourse extends Course {
  publish() {}
}
class App {
  static init() {
    console.log(new Course());
    new Course().classValue();
    new TheoreticalCourse().publish();
  }
}
App.init();
