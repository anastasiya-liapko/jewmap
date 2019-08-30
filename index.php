<!DOCTYPE html>
<html lang="ru">
	<head>
		<title>jewmap</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="shortcut icon" href="#" type="image/png">
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:400,700,900&display=swap&subset=cyrillic-ext,latin-ext" rel="stylesheet">
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
                    <a class="lang__link active">Ru</a>
                </li>
                <li class="lang__item">
                    <a class="lang__link">Eng</a>
                </li>
            </ul>

            <a class="jewmap__logo">Еврейская<br>Община России</a>

            <div id="map" class="jewmap__map map" style="height: 100vh"></div>

            <div id="js-overlay" class="jewmap__overlay overlay">
                <div class="overlay__content">
                    <p class="overlay__text"><strong>Еврейская община России</strong> сегодня - это многопрофильная    инфраструктура с охватом всех сфер национально-культурной жизни и представительствами во всех уголках страны: общинные, культурные  и научные центры, образовательные и просветительские учреждения,  благотворительные фонды, общественные, религиозные организации,  музеи ,  театры, издательства и многое другое. Данный портал призван максимально полно представить все многообразие Еврейской общины России</p>
                    <button class="overlay__close" type="button">Закрыть</button>
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
                    <ul class="nav__list">
                        <li class="nav__list-item">
                            <a class="nav__list-link" data-popup="about">О нас</a>
                        </li>
                        <li class="nav__list-item">
                            <a class="nav__list-link" data-popup="geo">География</a>
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
            <!-- nav -->

            <div id="js-about" class="popup about">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">О нас</h2>
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
            <!-- about -->

            <div id="js-geo" class="popup geo">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">География</h2>
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
            <!-- geo -->

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
        <!-- <script src="/wp-content/themes/feor/public/js/scrollBar.js"></script> -->
        <script src='https://api.mapbox.com/mapbox.js/v3.2.0/mapbox.js'></script>
        <!-- <script src="https://unpkg.com/rbush@2.0.1/rbush.min.js"></script> -->
        <!-- <script src="https://unpkg.com/labelgun@6.0.0/lib/labelgun.min.js"></script> -->
        <!-- <script type="text/javascript" src="/wp-content/themes/feor/public/js/map-page-mapbox/fill_template_popup_menu.js"> </script> -->
        <!-- <script type="text/javascript" src="/wp-content/themes/feor/public/js/map-page-mapbox/add_popup_menu.js"> </script> -->
        <!-- <script type="text/javascript" src="/wp-content/themes/feor/public/js/map-page-mapbox/util.js"> </script> -->
        <script type="text/javascript" src="public/js/main.min.js"> </script>
    </body>
</html>