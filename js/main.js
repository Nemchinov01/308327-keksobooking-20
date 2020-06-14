'use strict';

var TITLES = ['Проживание с тёщей'];
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
var OBJECT_COUNT = 7;
var GAP_X = 10;
var MAP_PIN_X = 64;
var MAP_PIN_Y = 86;
var WIDTH_X = 1200;
var MIN_RANGE_Y = 130;
var MAX_RANGE_Y = 630;

// функция случайного числа max
var getRandomNumber = function (max) {
  return Math.floor(max * Math.random());
};

// функция случайного числа max/min
var getRangeRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var minNumberX = GAP_X;
var maxNumberX = WIDTH_X - GAP_X;
var minNumberY = MIN_RANGE_Y;
var maxNumberY = MAX_RANGE_Y;

var mapUser = document.querySelector('.map');
mapUser.classList.remove('map--faded');

var placements = [];
var fillPlacements = function () {
  var location = {
    x: getRangeRandomNumber(minNumberX, maxNumberX) + 'px',
    y: getRangeRandomNumber(minNumberY, maxNumberY) + 'px'
  };
  for (var j = 0; j <= OBJECT_COUNT; j++) {
    placements.push({
      author: {
        avatar: 'img/avatars/user0' + j + '.png',
      },
      offer: {
        title: TITLES[j],
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
      location: location
    });
  }
};
fillPlacements();

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRenderPin = function (placement) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = placement.location.x - MAP_PIN_X / 2;
  pinElement.style.top = placement.location.y - MAP_PIN_Y;
  pinElement.setAttribute('src', placement.avatar);
  pinElement.setAttribute('alt', placement.title);
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < placements.length; i++) {
    fragment.appendChild(getRenderPin(placements[i]));
  }
  return fragment;
};

similarListElement.appendChild(getFragment());
