async function main() {
    const [citiesModule, personModule, specializationsModule] =
        await Promise.all([
            import('./cities.json', { with: { type: 'json' } }),
            import('./person.json', { with: { type: 'json' } }),
            import('./specializations.json', { with: { type: 'json' } })
        ]);

    const cities = citiesModule.default;
    const persons = personModule.default;
    const specializations = specializationsModule.default;

    const moscowCity = cities.find(city=>
    city.name === 'Москва'
    );
    const moscowCityId = moscowCity.id;

    const designerSpecialization= specializations.find(specialization=>
    specialization.name === 'designer'
    );

    const designerSpecializationId=designerSpecialization.id;

    const frontendSpecialization = specializations.find(specialization =>
    specialization.name ==='frontend'
    );
    const frontendSpecializationId =frontendSpecialization.id;

    const backendSpecialization = specializations.find(specialization =>
    specialization.name ==='backend'
    );
    const backendSpecializationId = backendSpecialization.id;


    function getInfo (){
        const city = cities.find(city => city.id === this.personal.locationId)

        return this.personal.firstName + ' ' + this.personal.lastName + ' '+ city.name;

    }
    console.log(getInfo.call(persons[0]));



    const designer = persons.filter(person =>{
        return  person.personal.specializationId === designerSpecializationId
    });
    console.log(designer);

    const designerFigma = designer.filter(person =>
        person.skills.some(skill => skill.name === 'Figma')
    );

    console.log(designerFigma)

    designerFigma.forEach(person => console.log(getInfo.call(person)));

    const frontendDevelopers = persons.filter(person =>
        person.personal.specializationId === frontendSpecializationId
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
        return person.personal.specializationId === backendSpecializationId &&
            person.personal.locationId === moscowCityId;
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
        person.personal.specializationId === backendSpecializationId
    );
    backendDevelopers.forEach(person => console.log(person.skills));

    const designerFigmaSkills = designer
        .map(person => person.skills)
        .flat()
        .filter(skill => skill.name === 'Figma')
        .map(skill => skill.level);

    const designerFigmaMaxLevel = Math.max(...designerFigmaSkills);

    const designerFigmaMax = designer.find(person =>
        person.skills.some(skill =>
            skill.name === 'Figma' &&
            skill.level === designerFigmaMaxLevel
        )
    );

    const frontendAngularSkills = frontendDevelopers
        .map(person => person.skills)
        .flat()
        .filter(skill => skill.name === 'Angular')
        .map(skill => skill.level);

    const frontendAngularMaxLevel = Math.max(...frontendAngularSkills);

    const frontendAngularMax = frontendDevelopers.find(person =>
        person.skills.some(skill =>
            skill.name === 'Angular' &&
            skill.level === frontendAngularMaxLevel
        )
    );

    const backendGoSkills = backendDevelopers
        .map(person => person.skills)
        .flat()
        .filter(skill => skill.name === 'Go')
        .map(skill => skill.level);

    const backendGoMaxLevel = Math.max(...backendGoSkills);

    const backendGoMax = backendDevelopers.find(person =>
        person.skills.some(skill =>
            skill.name === 'Go' &&
            skill.level === backendGoMaxLevel)
    );



    console.log(getInfo.call(designerFigmaMax));
    console.log(getInfo.call(frontendAngularMax));
    console.log(getInfo.call(backendGoMax));
}


main()


