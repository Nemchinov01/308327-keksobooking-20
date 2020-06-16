'use strict';

var TITLES = ['Проживание с тёщей', 'В гараже у Тарена', 'На Титанике'];
var PRICE = [30000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECT_COUNT = 8;
var MAP_GAP_X = 30;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HIGHT = 70;
var MAP_WIDTH = 1200;
var MAP_MIN_HIGHT = 130;
var MAP_MAX_HIGHT = 630;

// функция случайного числа max
var getRandomNumber = function (max) {
  return Math.floor(max * Math.random());
};

// функция случайного числа max/min
var getRangeRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var minNumberX = MAP_GAP_X;
var maxNumberX = MAP_WIDTH - MAP_GAP_X;
var minNumberY = MAP_MIN_HIGHT;
var maxNumberY = MAP_MAX_HIGHT;

var mapUser = document.querySelector('.map');
mapUser.classList.remove('map--faded');

var placements = [];
var fillPlacements = function () {
  for (var j = 1; j <= OBJECT_COUNT; j++) {
    var location = {
      x: getRangeRandomNumber(minNumberX, maxNumberX) - MAP_PIN_WIDTH / 2 + 'px',
      y: getRangeRandomNumber(minNumberY, maxNumberY) - MAP_PIN_HIGHT + 'px'
    };
    placements.push({
      author: {
        avatar: 'img/avatars/user0' + j + '.png',
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        address: location.x + ', ' + location.y,
        price: PRICE,
        type: TYPES[getRandomNumber(TYPES.length)],
        rooms: ROOMS[getRandomNumber(ROOMS.length)],
        guests: GUESTS[getRandomNumber(GUESTS.length)],
        checkin: CHECK_IN[getRandomNumber(CHECK_IN.length)],
        checkout: CHECK_OUT[getRandomNumber(CHECK_OUT.length)],
        features: FEATURES.slice(0, getRandomNumber(FEATURES.length)),
        description: ' ',
        photos: PHOTOS.slice(0, getRandomNumber(PHOTOS.length)),
      },
      location: location,
    });
  }
};
fillPlacements();

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRenderPin = function (placement) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = placement.location.x;
  pinElement.style.top = placement.location.y;
  pinElement.querySelector('img').setAttribute('src', placement.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', placement.offer.title);
  return pinElement;
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < placements.length; i++) {
    fragment.appendChild(getRenderPin(placements[i]));
  }
  return fragment;
};

similarListElement.appendChild(getFragment());
