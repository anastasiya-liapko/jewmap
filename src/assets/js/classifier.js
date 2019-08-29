$(function () {
    var MOBILE_WIDTH = 600;

    var hideClassifier = function () {
        $('#js-jewmapHamburger').removeClass('active');
        $('#js-classifier').removeClass('open');
        if ($(window).width() <= MOBILE_WIDTH) {
            $('.leaflet-control-container').removeClass('hide');
            $('#js-lang').removeClass('hide');
        }
    }

    // hide classifier on nav click
    $(window).on('resize', function () {
        hideClassifier();
    });

    // hide classifier on resize
    $('#js-navListWrapper>ul>li>a').on('click', function () {
        hideClassifier();
    });

    // remove submit button default behavior
    $('#js-classifier button[type="submit"]').click(function(e) {
        e.preventDefault();
    });

    // show classifier items equal to entered by user
    $('#js-classifier input[type="text"]').on('change keydown keyup', function() {
        var input = $(this);
        var cityToFind = input.val().toUpperCase();
        var cityToFindLength = cityToFind.length;
        
        var block = $('#js-classifier ul')

        block.find('a').each(function() {
            var cityWrapper = $(this).closest('li');
            var city = $(this).text().toUpperCase();
            city = city.substring(0, cityToFindLength);
    
            if (city !== cityToFind) {
                cityWrapper.hide();
            } else {
                cityWrapper.show();
            }
        })
    });
    
    // var citiesArray = [];

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

    var addClassifier = function (map, orgs) {

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

        sortedArray = sortArray(orgs);

        // create classifier from template and array
        var addPopup = function (array) {
            // var fragmentMenu = document.createDocumentFragment();
            // var template = document.querySelector('#js-templateClassifier').content.querySelector('.classifier');
            // var templateElement = template.cloneNode(true);
            // fragmentMenu.appendChild(templateElement);
            // $('#js-jewmap').append(fragmentMenu);

            Array.prototype.forEach.call(array, function (elem) {
                var fragmentMenuItem = document.createDocumentFragment();
                var template = document.querySelector('#js-templateClassifierItem').content.querySelector('.classifier__list-item');
                var templateElement = template.cloneNode(true);
                templateElement.querySelector('.classifier__list-link').setAttribute('data-id', elem.id);
                templateElement.querySelector('.classifier__list-link').textContent = elem.name;
                // templateElement.querySelector('.classifier__list-link').setAttribute('data-address', elem.address);
                // templateElement.querySelector('.classifier__list-link').setAttribute('data-person', elem.person);
                // templateElement.querySelector('.classifier__list-link').setAttribute('data-phone', elem.phone);
                templateElement.querySelector('.classifier__list-link').setAttribute('data-status', elem.status);
                templateElement.querySelector('.classifier__list-link').setAttribute('data-point', elem.point);
                fragmentMenuItem.appendChild(templateElement);
                document.querySelector('.classifier__list').append(fragmentMenuItem);
            });

            $('#js-classifierScrollbar').scrollBox();

            $('.classifier__list-link').on('click', function () {
                var point = $(this).attr('data-point').split(',');
                window.util.flyTo(map, [ parseFloat(point[0]), parseFloat(point[1]) ]);
                hideClassifier();
            })

            // show/hide classifier on jewmap hamburger click
            $('.jewmap__hamburger').on('click', function () {
                $('#js-jewmapHamburger').toggleClass('active');
                $('#js-classifier').toggleClass('open');
                if ($(window).width() <= MOBILE_WIDTH) {
                    $('.leaflet-control-container').toggleClass('hide');
                    $('#js-lang').toggleClass('hide');
                }
                if ($('.popup').hasClass('open')) {
                    $('.popup').removeClass('open');
                    $('#js-navListWrapper>ul>li>a').removeClass('active');
                }
            });
        }

        addPopup(sortedArray);
    }
    
    window.classifier = {
        addClassifier: function (map, array) {
            addClassifier(map, array);
        }
    }
});