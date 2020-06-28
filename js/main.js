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
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 85;
var MAIN_PIN_LOCATION = {
  left: 570,
  top: 375,
};

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

var placements = [];
var fillPlacements = function () {
  for (var j = 1; j <= OBJECT_COUNT; j++) {
    var location = {
      x: getRangeRandomNumber(minNumberX, maxNumberX),
      y: getRangeRandomNumber(minNumberY, maxNumberY)
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
  pinElement.style.left = placement.location.x - MAP_PIN_WIDTH / 2 + 'px';
  pinElement.style.top = placement.location.y - MAP_PIN_HIGHT + 'px';
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

// Ф-ия откл/вкл полей формы
var getDisabledFieldset = function (field) {
  for (var k = 0; k < field.length; k++) {
    field[k].setAttribute('disabled', 'true');
  }
};

var getFieldset = function (field) {
  for (var k = 0; k < field.length; k++) {
    field[k].removeAttribute('disabled');
  }
};

// Отключение полей формы объявления
var fieldsetForm = document.querySelector('.ad-form--disabled');
getDisabledFieldset(fieldsetForm);

// Отключение полей формы на карте
var fieldsetFormMap = document.querySelector('.map__filters');
getDisabledFieldset(fieldsetFormMap);

var getMapOpen = function () {
  var mapCity = document.querySelector('.map');
  mapCity.classList.remove('map--faded');
};

var inputAddress = document.querySelector('#address');
// Координаты для поля адрес в скрытом состоянии
var mapPinLocationFaded = function (x, y, width, height) {
  inputAddress.placeholder = x + Math.floor(width / 2) + ', ' + (y + Math.floor(height / 2));
};
mapPinLocationFaded(MAIN_PIN_LOCATION.left, MAIN_PIN_LOCATION.top, MAP_PIN_MAIN_WIDTH, MAP_PIN_MAIN_HEIGHT);

// Координаты для поля адрес в активном состоянии
var mapPinLocationActive = function (x, y, width, height) {
  inputAddress.placeholder = x + Math.floor(width / 2) + ', ' + (y + height);
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    getMapOpen();
    getFieldset(fieldsetForm);
    getFieldset(fieldsetFormMap);
    mapPinLocationActive(MAIN_PIN_LOCATION.left, MAIN_PIN_LOCATION.top, MAP_PIN_MAIN_WIDTH, MAP_PIN_MAIN_HEIGHT);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    getMapOpen();
    getFieldset(fieldsetForm);
    getFieldset(fieldsetFormMap);
    mapPinLocationActive(MAIN_PIN_LOCATION.left, MAIN_PIN_LOCATION.top, MAP_PIN_MAIN_WIDTH, MAP_PIN_MAIN_HEIGHT);
  }
});

var roomsNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var buttonSubmit = document.querySelector('.ad-form__submit');

var DISABLED_ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

roomsNumber.addEventListener('click', function () {
  for (var j = 0; j < capacity.options.length; j++) {
    capacity[j].disabled = !DISABLED_ROOMS[roomsNumber.value].includes(capacity.options[j].value);
  }
});

roomsNumber.addEventListener('keydown', function () {
  for (var j = 0; j < capacity.options.length; j++) {
    capacity[j].disabled = !DISABLED_ROOMS[roomsNumber.value].includes(capacity.options[j].value);
  }
});

var validateCapacity = function () {
  if (DISABLED_ROOMS[roomsNumber.value].includes(capacity.value)) {
    capacity.setCustomValidity('');
  } else {
    capacity.setCustomValidity('Выбрано некорректное количество комнат');
  }
};

buttonSubmit.addEventListener('click', function () {
  validateCapacity();
});
