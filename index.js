import cities from './cities.json' with { type: 'json' };
import specializations from './specializations.json' with { type: 'json' };
import persons from './person.json' with { type: 'json' };


function getInfo (){
    const city = cities.find(city => city.id === this.personal.locationId)

    return this.personal.firstName + ' ' + this.personal.lastName + ' '+ city.name;
}
console.log(getInfo.call(persons[0]));

const designer = persons.filter(person =>{
   return  person.personal.specializationId === 3
});
console.log(designer);

const designerFigma = designer.filter(person =>
    person.skills.some(skill => skill.name === 'Figma')
);

console.log(designerFigma)

designerFigma.forEach(person => console.log(getInfo.call(person)));

const frontendDevelopers = persons.filter(person =>
    person.personal.specializationId === 1
);

console.log(frontendDevelopers);

const developerReact=frontendDevelopers.find(person =>
person.skills.some(skill =>skill.name === 'React')
);
console.log(getInfo.call(developerReact));


function getAge(birthday) {
    const dateParts = birthday.split('.').map(Number);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const birthDay = dateParts[0];
    const birthMonth = dateParts[1];
    const birthYear = dateParts[2];

    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

const allAdults = persons.every(person => getAge(person.personal.birthday) > 18);
console.log(allAdults);



//6 Получаем backend-разработчиков из Москвы//
const backendMoscow = persons.filter(person => {
    return person.personal.specializationId === 2 &&
        person.personal.locationId === 1;
});

// Оставляем тех, кто ищет полную занятость//
const fullTime = backendMoscow.filter(person => {
    return person.request.some(requestItem =>
        requestItem.name === 'Тип занятости' &&
        requestItem.value === 'Полная'
    );
});

// Получение ЗП//
function getSalary(person) {
    return person.request.find(requestItem =>
        requestItem.name === 'Зарплата'
    ).value;
}

// Сортируем ЗП//
fullTime.sort((a, b) => getSalary(a) - getSalary(b));


fullTime.forEach(person => {
    console.log(getInfo.call(person), getSalary(person));
});

//7//
const designerPhotoshop = designer.filter(person =>
    person.skills.some(skill =>
        skill.name === 'Photoshop' && skill.level >= 6
    )
);

const designerBoth = designerPhotoshop.filter(person =>
    person.skills.some(skill =>
        skill.name === 'Figma' && skill.level >= 6
    )
);

designerBoth.forEach(person => console.log(getInfo.call(person)));
designer.forEach(person => console.log(person.skills));
frontendDevelopers.forEach(person => console.log(person.skills));

const backendDevelopers = persons.filter(person =>
    person.personal.specializationId === 2
);
backendDevelopers.forEach(person => console.log(person.skills));

const designerFigmaMax = designer.find(person =>
    person.skills.some(skill => skill.name === 'Figma' && skill.level === 10)
);

const frontendAngularMax = frontendDevelopers.find(person =>
    person.skills.some(skill => skill.name === 'Angular' && skill.level === 9)
);

const backendGoMax = backendDevelopers.find(person =>
    person.skills.some(skill => skill.name === 'Go' && skill.level === 9)
);

console.log(getInfo.call(designerFigmaMax));
console.log(getInfo.call(frontendAngularMax));
console.log(getInfo.call(backendGoMax));