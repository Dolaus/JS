//Створити функцію, яка при створенні приймає об'єкт, наприклад: {access-token: 'qwerty'} і додає його до кожної структури даних,
// що буде передана в результатуючу функцію.
// Також до об'єкта буде додано поле count. При кожному виклику воно має збільшуватися на 1.
// function addParamsToRequest(params) {........}
//
// const sendData = addParamsToRequest(.........);
//
// const result = sendData(......some data.....);
//
// console.log(result);

// {
//
//     access-token: 'qwerty',
//
//     data: …… // всі поля з об'єкта, переданого в addParamsToRequest
//
//     count: 0 // 1 … 2 … 3 … збільшується з кожним викликом sendData
//
// }

function addParamsToRequest(data) {
    let count = 0
    return function (newArguments) {
        return {...newArguments, data, count: count++}
    }
}

const sendData = addParamsToRequest({data: 23, name: "Peter"});

console.log(typeof sendData)

const result = sendData({ 'access-token': 'qwerty'});
const result1 = sendData({ 'access-token': 'qwerty'});
console.log(result)
console.log(result1)

//2. Контексти і this:
//
//
//
// У вас є об'єкт:
//
//
//
// const obj = {
//
// getData: function () {
//
// console.log(Person name is: ${this.name} and age ${this.age})
//
// }
//
// }
//
//
//
// Викличте його так, щоб ім'я та вік були вказані (значення неважливі). Потім створіть функцію, яка буде це робити постійно при її виклику.


const obj = {
    //name: 'Petro', ось так можна
    //age: 20,
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

obj.name = 'Petro' // або ось так
obj.age = 20
obj.getData();

let newFuncWithContext = obj.getData.bind({name: "Petro", age: 21});

newFuncWithContext();



//Задача — пройтися по об'єкту рекурсивно, знайти всі файли та повернути їхні імена у вигляді масиву.
const root = {

    name: 'name',

    type: 'folder',

    children: [

        {

            name: 'folder 1',

            type: 'folder',

            children: [

                {

                    name: 'folder 2',

                    type: 'folder',

                    children: [

                        {

                            name: 'file 3',

                            type: 'file',

                            size: 30

                        }

                    ]

                }

            ]

        },

        {

            name: 'file 1',

            type: 'file',

            size: 10

        },

        {

            name: 'file 2',

            type: 'file',

            size: 20

        }

    ]

};

function garbageFiles(root, myArray = []) {
    if (root.type === 'file') {
        myArray.push(root.name)
        return
    }

    root.children.forEach(value => {
        garbageFiles(value, myArray)
    })

    return myArray;
}

console.log(garbageFiles(root));

//4. Класи:
//
//
//
// Створіть базовий об'єкт Людина з такими властивостями:
//
// - name
//
// - phone
//
//
//
// Метод introduce, який виводить у консоль фразу: Привіт, мене звати {name}, мій номер {phone}.
//
//
//
// Створіть об'єкти Студент і Викладач, які будуть наслідувати властивості та методи від об'єкта Людина.
//
//
//
// - Для Студента додайте додаткову властивість course (курс) і метод study, який виводить: Я навчаюся на {course} курсі.
//
// - Для Викладача додайте додаткову властивість subject (предмет) і метод teach, який виводить: Я викладаю {subject}.
//
//
//
// Реалізуйте наслідування за допомогою конструктора функції або класів (оберіть один підхід).
//
//
//
// Очікуваний результат:
//
//
//
// При створенні об'єктів студента та викладача, вони повинні мати доступ до методу introduce з об'єкта Людина, а також до своїх специфічних методів (study і teach).
//
//
//
// Виконати у форматі ES5 та ES6 (тобто як через class, так і через prototype).

class People {

    constructor(name, phone) {
        this._name = name;
        this._phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this._name}, мій номер ${this._phone}`)
    }
}


class Student extends People {
    constructor(name, phone, course) {
        super(name, phone);
        this._course = course
    }

    study() {
        console.log(`Я навчаюся на ${this._course} курсі.`)
    }
}

class Teacher extends People {
    constructor(name, phone, subject) {
        super(name, phone);
        this._subject = subject
    }

    teach() {
        console.log(`Я викладаю ${this._subject}`)
    }
}

const teacher = new Teacher('Plav', '+380934251', 'Math')

teacher.introduce()
teacher.teach()

const student = new Student('Petro', '+380934251', 3)

student.introduce()
student.study()