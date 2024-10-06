//Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.

for (let i = 1; i <= 10; i++) {
    console.log(i)
}

let i = 1
while (i <= 10) {
    console.log(i)
    i++;
}

//Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів.
// Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами:
// методом forEach, циклами for, while і do while.

const array = [1, true, false, 10, 'qwe', 23, '0', 0, 23, true];

console.log('----------')
for (const arrayElement of array) {
    console.log(typeof arrayElement)
}

console.log('----------')
for (let j = 0; j < 10; j++) {
    console.log(typeof array[j])
}

console.log('----------')
let arrayIndex = 0
while (arrayIndex < array.length) {
    console.log(typeof array[arrayIndex])
    arrayIndex++;
}

console.log('----------')
arrayIndex = 0;
do {
    console.log(typeof array[arrayIndex])
    arrayIndex++;
} while (arrayIndex < array.length)


//Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.

const arrayObjects = [
    {name: 'Bobko', age: 21, pets: ['cat', 'dog']},
    {name: 'Olfred', age: 11, pets: ['cat', 'dog']},
    {name: 'Kikimaru', age: 51, pets: ['cat', 'dog']},
    {name: 'Naruto', age: 16, pets: ['cat', 'dog']},
    {name: 'Hinata', age: 34, pets: ['cat', 'dog']}]

console.log(arrayObjects.filter(i => i.age > 21))

arrayObjects.map((v, i) => i % 2 === 0 ? v.pets.push('pig') : v.pets.push('parrot'))

console.log(arrayObjects);

//Створити масив із 10 елементів і заповнити його числом 42 за допомогою відповідного методу (завдання знайти його в документації, посилання в описі до лекції).
// За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його у консоль.
let arrayForFill = Array(10);

arrayForFill = arrayForFill.fill(42);

console.log(arrayForFill);
arrayForFill.splice(5,0, 'Answer');

const foundWord = arrayForFill.find(i => i === 'Answer');

console.log(foundWord);

//Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.
const pc = {
    model: "bv8",
    color: "red",
    power: 700,
    year: 2003
}

for (const pcElement of Object.values(pc)) {
    console.log(pcElement)
}

if (Object.hasOwn(pc, 'model')) {
    console.log(pc.model)
} else  {
    console.log('Can\'t found')
}