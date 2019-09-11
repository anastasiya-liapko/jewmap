<!DOCTYPE html>
<html lang="ru">
	<head>
		<title>jewmap</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="shortcut icon" href="#" type="image/png">
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300i,400,500,700,900&display=swap&subset=cyrillic-ext,latin-ext" rel="stylesheet">
		<!-- <link rel="stylesheet" href="/wp-content/themes/feor/public/css/scrollBar.css"> -->
		<link href='https://api.mapbox.com/mapbox.js/v3.2.0/mapbox.css' rel='stylesheet' />
		<!-- <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />
		<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' /> -->
        <link rel="stylesheet" href="public/css/main.min.css">
	</head>

	<body>
        <div id="js-jewmap" class="jewmap">
            <button id="js-jewmapHamburger" class="jewmap__button jewmap__hamburger hamburger hamburger_squeeze" type="button">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>

            <button id="js-jewmapSearch" class="jewmap__button jewmap__search" type="button">
                <span class="jewmap__search-icon icon-search"></span>
            </button>

            <div id="js-classifier" class="classifier">
                <form id="js-classifierSearch" class="classifier__search-wrapper">
                    <div class="classifier__search">
                        <input class="classifier__search-input" type="text" name="classifier" placeholder="Поиск">
                        <button class="classifier__search-submit" type="submit">
                            <span class="classifier__search-icon icon-search"></span>
                        </button>
                    </div>
                </form>
                <div id="js-classifierScrollbar" class="classifier__scrollbar mCustomScrollbar">
                    <ul class="classifier__list"></ul>
                </div>
            </div>

            <button id="js-infoButton" class="jewmap__info-button info__button" type="button">
                <span class="info__button-icon icon-i"></span>
            </button>

            <ul id="js-lang" class="jewmap__lang lang">
                <li class="lang__item">
                    <a class="lang__link">RU</a>
                </li>
                <li class="lang__item">
                    <a class="lang__link active">EN</a>
                </li>
            </ul>

            <a class="jewmap__logo">Еврейская<br>Община России</a>

            <div id="map" class="jewmap__map map" style="height: 100vh"></div>

            <div id="js-overlay" class="jewmap__overlay overlay">
                <div class="overlay__content">
                    <p class="overlay__text"><strong>Еврейская община России</strong> - это многопрофильная структура с охватом всех сфер национальной жизни и представительствами​ во всех уголках страны: общественные, религиозные,​ благотворительные организации и фонды, ​ общинные, культурные центры,​ образовательные учреждения и многое другое.​ ​ Данный портал призван представить инфраструктуры общины во всем ее многообразии.</p>
                    <button class="overlay__close" type="button"></button>
                </div>
            </div>

            <div id="js-nav" class="jewmap__nav nav">
                <button id="js-navHamburger" class="nav__hamburger hamburger hamburger_squeeze" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>

                <a class="nav__logo">Еврейская<br>Община России</a>

                <div id="js-navListWrapper" class="nav__list-wrapper">
                    <div>
                        <ul class="nav__list">
                            <li class="nav__list-item">
                                <a class="nav__list-link" data-popup="about">О нас</a>
                            </li>
                            <li class="nav__list-item">
                                <a class="nav__list-link" data-popup="geoDistricts">География</a>
                            </li>
                            <li class="nav__list-item">
                                <a class="nav__list-link" data-popup="orgs">Организации</a>
                            </li>
                            <li class="nav__list-item">
                                <a class="nav__list-link" data-popup="traditions">Традиции</a>
                            </li>
                            <li class="nav__list-item">
                                <a class="nav__list-link" data-popup="calendar">Календарь</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- nav -->

            <div id="js-about" class="popup about">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">О нас</h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    <div class="popup__main">
                        <p>
                        Еврейская община России-многопрофильная структура с охватом всех сфер национальной жизни на всей территории нашей страны.
                        Данный портал - это универсальный навигатор по Еврейской карте России, призванный объединить и сделать доступной информацию о еврейских организациях, учреждениях и объединениях.
                        </p>
                        <p>
                        Развитая инфраструктура Общины дает возможность людям, исповедующим иудаизм, в полной мере соблюдать еврейский закон, хранить традиции своих предков, это многочисленные культурные и просветительские проекты, позволяющие каждому желающему узнать больше об истории еврейского народа, познакомиться с обычаями и мировоззрением евреев.
                        Сегодня еврейская община России - одна из самых процветающих и развитых общин в мире. Еврейские организации охватывают религиозную, культурную, благотворительную, просветительскую и социальную сферу общественной жизни.
                        У российских евреев есть возможность соблюсти весь цикл жизни согласно еврейскому закону: от рождения и брит-милы у мальчиков до проведения еврейской свадьбы и организации еврейских похорон. В синагогах звучат праздничные и шабатние молитвы, проводятся торжественные трапезы. Родители могут выбирать, какого уровня еврейское образование дать своему ребёнку: от воскресных школ, в игровой форме знакомящих с традициями и историей народа, до религиозных классов, в которых подробно изучаются священные тексты. Продолжить еврейское образование можно в высших учебных заведениях - факультеты по изучению иудаики представлены как в негосударственных, так и в государственных вузах.
                        Фундаментальные труды еврейской философии впервые издаются на русском языке, тем самым выводя российскую иудаику на мировой уровень. Еврейские музеи, театры, культурные центры открывают свои двери для всех желающих. Здесь можно узнать не только об иудаизме и истории евреев России, но и проследить развитие еврейской культуры, познакомиться с современным искусством.
                        Действуют многочисленные социальные и благотворительные программы направленные на оказание необходимой помощи нуждающимся.
                        </p>
                        <p>Портал «Еврейская община России» является некоммерческим проектом, деятельность которого ведется в благотворительных целях на волонтерских основах. Справочная информация сайта постоянно пополняется.
                        Мы будем признательны Вам за участие в его работе и предоставление актуальных и проверенных сведений.
                        </p>
                    </div>
                </div>
            </div>
            <!-- about -->

            <div id="js-geo" class="popup geo popup_geo">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">
                            <span>География</span>
                        </h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    <!-- <span class="geo__district-title">
                        <span class="geo__decor">|</span>
                        <span class="geo__district-text">Дальневосточный</span>
                    </span>
                    <span class="geo__city-title">Москва</span> -->
                    <div class="popup__main popup__main_padding"></div>
                </div>
            </div>
            <!-- geo -->

            <div id="js-geoDistricts" class="popup geo popup_geo">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">
                            <span>География</span>
                        </h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    
                    <div class="popup__main"></div>
                </div>
            </div>
            <!-- geo districts -->

            <div id="js-geoCities" class="popup geo popup_geo">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">
                            <span>География</span>
                        </h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    
                    <!-- <span class="geo__district-title">
                        <span class="geo__decor">|</span>
                        <span class="geo__district-text">Дальневосточный</span>
                    </span> -->
                    <div class="popup__main popup__main_padding"></div>
                </div>
            </div>
            <!-- geo cities -->

            <div id="js-orgs" class="popup orgs">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">Организации</h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    <div class="popup__main">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a
                        </p>
                    </div>
                </div>
            </div>
            <!-- orgs -->

            <div id="js-traditions" class="popup traditions">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">Традиции</h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    <div class="popup__main">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a
                        </p>
                    </div>
                </div>
            </div>
            <!-- traditions -->

            <div id="js-calendar" class="popup calendar">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">Календарь</h2>
                        <button class="popup__close" type="button"></button>
                    </div>
                    <div class="popup__main">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a
                        </p>
                    </div>
                </div>
            </div>
            <!-- calendar -->
        </div>

        <!-- <template id="js-templateClassifier" style="display: none">
            <div id="js-classifier" class="classifier">
                <form id="js-classifierSearch" class="classifier__search-wrapper">
                    <div class="classifier__search">
                        <input class="classifier__search-input" type="text" name="classifier" placeholder="Поиск">
                        <button class="classifier__search-submit" type="submit">
                            <span class="classifier__search-icon icon-search"></span>
                        </button>
                    </div>
                </form>
                <div id="js-classifierScrollbar" class="classifier__scrollbar mCustomScrollbar">
                    <ul class="classifier__list"></ul>
                </div>
            </div>
        </template> -->

        <template id="js-templateClassifierItem" style="display: none">
            <li class="classifier__list-item">
                <a class="classifier__list-link"></a>
            </li>
        </template>

        <!-- <template id="js-templatePopupCity" style="display: none">
                <div class="popup popup-city">
                    <span class="popup__close"></span>
                    <img src="" class="popup__img"/> <br/>
                    <strong class="popup__name"></strong> <br/>
                    <span class="popup__address"></span>
                    <p class="popup__descr"></p>
                    <a href="" class="popup__more" target="_blank">Подробнее</a>
                </div>
            </template> -->

        <!--  <template id="js-templatePopupPlace" style="display: none">
                <div class="popup popup-place d-flex flex-column">
                    <p class="popup__name"></p>
                    <p class="popup__person d-flex align-items-start">
                        <span class="popup__icon icon-map-person d-flex align-items-center justify-content-center"></span>
                        <span class="popup__text d-flex align-items-center"></span>
                    </p>
                    <a href="" class="popup__address d-flex align-items-start" target="_blank">
                        <span class="popup__icon icon-map d-flex align-items-center justify-content-center"></span>
                        <span class="popup__text d-flex align-items-center"></span>
                    </a>
                    <a href="" class="popup__phone d-flex align-items-start">
                        <span class="popup__icon icon-phone d-flex align-items-center justify-content-center"></span>
                        <span class="popup__text d-flex align-items-center"></span>
                    </div>
                </div>
            </template> -->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src='https://api.mapbox.com/mapbox.js/v3.2.0/mapbox.js'></script>
        <!-- <script src="https://unpkg.com/rbush@2.0.1/rbush.min.js"></script> -->
        <!-- <script src="https://unpkg.com/labelgun@6.0.0/lib/labelgun.min.js"></script> -->
        <script type="text/javascript" src="public/plugins/nicescroll/jquery.nicescroll.iframehelper.min.js"> </script>
        <script type="text/javascript" src="public/plugins/nicescroll/jquery.nicescroll.min.js"> </script>
        <script type="text/javascript" src="public/js/main.min.js"> </script>
    </body>
</html>