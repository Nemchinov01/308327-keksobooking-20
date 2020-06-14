'use strict';

var AVATARS = [];
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
var LOCATION_X = [];
var LOCATION_Y = [];
var OBJECT_COUNT = 7;
var GAP_X = 5;
var MAP_PIN = 65;
var WIDTH_X = 846;
var MIN_RANGE_Y = 130;
var MAX_RANGE_Y = 629;

// наполнение массива AVATARS
var getAddressAvatars = function () {
  for (var t = 1; t <= 7; t++) {
    var userAddress = 'img/avatars/user0' + t + '.png';
    AVATARS.push(userAddress);
  }
};
getAddressAvatars();

// функция случайного числа max
var getRandomNumber = function (max) {
  return Math.floor(max * Math.random());
};

// функция случайного числа max/min
var getRangeRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// наполнение массива LOCATION
var minNumberX = GAP_X + MAP_PIN / 2;
var maxNumberX = WIDTH_X - (GAP_X + MAP_PIN / 2);
var minNumberY = MIN_RANGE_Y + MAP_PIN / 2;
var maxNumberY = MAX_RANGE_Y + MAP_PIN / 2;

var getLocation = function () {
  for (var j = 1; j <= OBJECT_COUNT; j++) {
    LOCATION_X.push(getRangeRandomNumber(minNumberX, maxNumberX) + 'px');
    LOCATION_Y.push(getRangeRandomNumber(minNumberY, maxNumberY) + 'px');
  }
};
getLocation();

var mapUser = document.querySelector('.map');
mapUser.classList.remove('map--faded');

var Placements = [];
var getPlacement = function () {
  for (var k = 0; k <= 7; k++) {
    Placements.push({
      author: {
        avatar: AVATARS,
      },
      offer: {
        title: TITLES,
        address: LOCATION_X[k] + ', ' + LOCATION_Y[k],
        price: PRICE,
        type: TYPES [getRandomNumber(TYPES.length)],
        rooms: ROOMS [getRandomNumber(ROOMS.length)],
        guests: GUESTS [getRandomNumber(GUESTS.length)],
        checkin: CHECK_IN [getRandomNumber(CHECK_IN.length)],
        checkout: CHECK_OUT [getRandomNumber(CHECK_OUT.length)],
        features: FEATURES.length = getRandomNumber(FEATURES.length),
        description: ' ',
        photos: PHOTOS.length = getRandomNumber(PHOTOS.length),
      },
      location: {
        x: LOCATION_X[k],
        y: LOCATION_Y[k],
      },
    });
  }
};
getPlacement();

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRenderPin = function (placement) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector('.map__pin').style.left = placement.location.x;
  pinElement.querySelector('.map__pin').style.top = placement.location.y;
  pinElement.querySelector('.map__pin').setAttribute('src', placement.avatar);
  pinElement.querySelector('.map__pin').setAttribute('alt', placement.title);
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < Placements.length; i++) {
    fragment.appendChild(getRenderPin(Placements[i]));
  }
  return fragment;
};

similarListElement.appendChild(getFragment());

