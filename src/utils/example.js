// create imput file html and load the image in page

// const fileInput = document.getElementById("fileInput");
// const previewImage = document.getElementById("previewImage");

// fileInput.addEventListener("change", function (event) {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function (event) {
//       previewImage.src = event.target.result;
//     };

//     reader.readAsDataURL(file);
//   }
// });

// create json object wich fields name, age and number cars but cars have fields the model, year and color

const person = {
  name: "John Doe",
  age: 30,
  cars: [
    {
      model: "BMW",
      year: 2020,
      color: "blue"
    },
    {
      model: "Ford",
      year: 2015,
      color: "red"
    }
  ]
};
// give me a array objects person wich years from 2000 to 2020

const filterYears = person.cars.filter(
  (car) => car.year >= 2000 && car.year < 2020
);

console.log(filterYears);

// what version node is that

console.log(process.version);

import fs from "node:";
// write a file text wich anaway works and load in the directory root wich fs promise?

fs.promises
  .writeFile("example.txt", "Hello, World!")
  .then(() => console.log("File created successfully"))
  .catch((err) => console.error(err));
