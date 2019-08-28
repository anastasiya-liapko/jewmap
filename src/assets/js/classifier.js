$(function () {
    
    var citiesArray = [];

    var cities = 
    [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Казань',
        'Челябинск',
        'Омск',
        'Самара',
        'Ростов-на-Дон',
        'Уфа',
        'Красноярск',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Краснодар',
        'Саратов',
        'Тюмень',
        'Тольятти',
        'Ижевск',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Краснодар',
        'Саратов',
        'Тюмень',
        'Тольятти',
        'Ижевск',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Казань',
        'Челябинск',
        'Омск',
        'Самара',
        'Ростов-на-Дон',
        'Уфа',
        'Красноярск',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Краснодар',
        'Саратов',
        'Тюмень',
        'Тольятти',
        'Ижевск',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Краснодар',
        'Саратов',
        'Тюмень',
        'Тольятти',
        'Ижевск'
    ]

    // generate array with cities
    for (var i = 0; i < cities.length; i++) {
        citiesArray.push({
            id: i,
            name: cities[i],
            address: '',
            preson: '',
            phone: '',
            point: ''
        })
    }

    // sort array
    var sortArray = function (array) {

        // sort by alphabet
        array.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });

        // spb to top
        array.forEach(function (elem) {
            if (elem.name === 'Санкт-Петербург') {
                array.splice(array.indexOf(elem), 1)
                array.unshift(elem);
                return false;
            }
        });

        // moscow to top
        array.forEach(function (elem) {
            if (elem.name === 'Москва') {
                array.splice(array.indexOf(elem), 1)
                array.unshift(elem);
                return false;
            }
        });

        // get index of center elem
        var halfLength = Math.ceil(array.length / 2);

        // cut array on two halves (half - first half, array - second half)
        var half = array.splice(0, halfLength);

        // add one elem from each half at a time
        var interimArray = [];
        for (var i = 0; i < halfLength; i++) {
            half[i] !== undefined ? interimArray.push(half[i]) : '';
            array[i] !== undefined ? interimArray.push(array[i]) : '';
        };

        return array = interimArray;
    }
    sortedArray = sortArray(citiesArray);

    // create classifier from template and array
    var addPopup = function (array) {
        var fragmentMenu = document.createDocumentFragment();
        var template = document.querySelector('#js-templateClassifier').content.querySelector('.classifier');
        var templateElement = template.cloneNode(true);
        fragmentMenu.appendChild(templateElement);
        $('#js-jewmap').append(fragmentMenu);

        Array.prototype.forEach.call(array, function (elem) {

            var fragmentMenuItem = document.createDocumentFragment();
            var template = document.querySelector('#js-templateClassifierItem').content.querySelector('.classifier__list-item');
            var templateElement = template.cloneNode(true);
            templateElement.querySelector('.classifier__list-link').setAttribute('data-id', elem.id);
            templateElement.querySelector('.classifier__list-link').textContent = elem.name;
            templateElement.querySelector('.classifier__list-link').setAttribute('data-address', elem.address);
            templateElement.querySelector('.classifier__list-link').setAttribute('data-person', elem.person);
            templateElement.querySelector('.classifier__list-link').setAttribute('data-phone', elem.phone);
            templateElement.querySelector('.classifier__list-link').setAttribute('data-point', elem.point);

            fragmentMenuItem.appendChild(templateElement);
            document.querySelector('.classifier__list').append(fragmentMenuItem);
        });

        $('#js-classifierScrollbar').scrollBox();
    }
    addPopup(sortedArray);
});