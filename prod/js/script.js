"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var updateProgressBar = function updateProgressBar(activeWeek) {

    var weeks = document.getElementsByClassName('plan__progress--week');
    var weeksArray = [].concat(_toConsumableArray(weeks));

    if (activeWeek === 1) {
        weeksArray[0].style.backgroundImage = "url(img/circleActive.png)";
        for (var i = 1; i < weeks.length; i++) {
            weeksArray[i].style.backgroundImage = "url(img/circle+line.png)";
        }
    };

    if (activeWeek === 2) {
        weeksArray[0].style.backgroundImage = "url(img/circleG.png)";
        weeksArray[1].style.backgroundImage = "url(img/circleActive+line.png)";
        for (var _i = 2; _i < weeks.length; _i++) {
            weeksArray[_i].style.backgroundImage = "url(img/circle+line.png)";
        }
    };

    if (activeWeek > 2) {
        weeksArray[0].style.backgroundImage = "url(img/circleG.png)";
        for (var _i2 = 1; _i2 < weeksArray.length; _i2++) {
            if (_i2 < activeWeek - 1) {
                weeksArray[_i2].style.backgroundImage = "url(img/circle+lineG.png)";
            }
            weeksArray[activeWeek - 1].style.backgroundImage = "url(img/circleActive+line.png)";
            for (var _i3 = activeWeek; _i3 < weeks.length; _i3++) {
                weeksArray[_i3].style.backgroundImage = "url(img/circle+line.png)";
            }
        };
    };
};

var showDayNumber = function showDayNumber(weekNr) {
    var dayNrCells = document.querySelectorAll('.plan__table--day-nr');
    var dayNrCellsArray = [].concat(_toConsumableArray(dayNrCells));

    dayNrCellsArray.forEach(function (day, index) {
        var dayNumber = index + 1 + (weekNr - 1) * 7;
        day.innerText = dayNumber;
    });
};

var backgroundPresentDay = function backgroundPresentDay(dayNumber) {

    var cellsWithDayNr = document.querySelectorAll('.plan__table--day-nr');
    var cellsWithDayNrArray = [].concat(_toConsumableArray(cellsWithDayNr));

    cellsWithDayNrArray.forEach(function (cell) {
        if (parseInt(cell.innerText) === parseInt(dayNumber)) {

            var dayBox = cell.parentElement;
            var presentDayName = dayBox.className.split(' ')[1].split('-').pop();

            var selector = "[class*=" + presentDayName + "]";
            var cellsWithDayNameInClass = document.querySelectorAll(selector);
            var cellsWithDayNameInClassArray = [].concat(_toConsumableArray(cellsWithDayNameInClass));

            var cellsLength = cellsWithDayNameInClassArray.length;
            for (var i = 0; i < cellsLength; i++) {
                if (i === 0) {
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderTop');
                } else if (i > 0 && i < cellsLength - 2) {
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderMid');
                    cellsWithDayNameInClassArray[i].firstElementChild.classList.toggle('colorBlack');

                    if (cellsWithDayNameInClassArray[i].firstElementChild.innerText === 'Bod•ē Shake'.trim()) {

                        cellsWithDayNameInClassArray[i].classList.toggle('shakeColor');;
                    }
                } else if (i === cellsLength - 2) {
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderMid');
                } else {
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderBottom');
                }
            }
        }
    });
};

var startDate = {
    year: 2018,
    month: 3,
    day: 23
};

var weekInMSec = 7 * 24 * 60 * 60 * 1000;
var dayInMSec = 24 * 60 * 60 * 1000;

document.addEventListener("DOMContentLoaded", function () {

    var timeDifference = new Date().getTime() - new Date(startDate.year, startDate.month, startDate.day).getTime();

    var presenWeek = Math.ceil(timeDifference / weekInMSec);

    var presentDay = Math.ceil(timeDifference / dayInMSec);

    var prevWeek = document.querySelector('.plan__button--prev');
    var nextWeek = document.querySelector('.plan__button--next');
    var week = document.querySelector('.plan__week-nr--active');

    week.innerText = presenWeek;

    showDayNumber(presenWeek);
    updateProgressBar(presenWeek);
    backgroundPresentDay(presentDay);

    var temp = 0;

    var prevWeekFuncion = function prevWeekFuncion(temp) {
        var activeWeek = parseInt(week.innerText);

        if (activeWeek > 1) {
            activeWeek--;
        };

        week.innerText = activeWeek;

        if (!temp) {
            backgroundPresentDay(presentDay);
            temp = 1;
        }
        updateProgressBar(activeWeek);
        showDayNumber(activeWeek);
        if (temp) {
            backgroundPresentDay(presentDay);
            temp = 0;
        }
    };

    var nextWeekFunction = function nextWeekFunction(temp) {
        var activeWeek = parseInt(week.innerText);

        if (activeWeek < 12) {
            activeWeek++;
        };

        week.innerText = activeWeek;

        if (!temp) {
            backgroundPresentDay(presentDay);
            temp = 1;
        }
        updateProgressBar(activeWeek);
        showDayNumber(activeWeek);
        if (temp) {
            backgroundPresentDay(presentDay);
            temp = 0;
        }
    };

    prevWeek.addEventListener('click', function (e) {
        prevWeekFuncion(temp);
    });

    nextWeek.addEventListener('click', function (e) {
        nextWeekFunction(temp);
    });

    window.addEventListener('keydown', function (e) {
        var key = e.keyCode;
        if (key === 37) {
            prevWeekFuncion(temp);
        }
        if (key === 39) {
            nextWeekFunction(temp);
        }
    });

    var mealCells = document.querySelectorAll('.plan__table--meal');
    var mealCellsArray = [].concat(_toConsumableArray(mealCells));

    mealCellsArray.forEach(function (mealCell, i) {
        mealCell.addEventListener('click', function (e) {
            var imgEatenMark = this.firstElementChild.nextElementSibling;

            if (imgEatenMark.style.display === "block") {
                imgEatenMark.style.display = "none";
            } else {
                imgEatenMark.style.display = "block";
            }
        });
    });

    var workoutCells = document.querySelectorAll('.plan__table--workout');
    var workoutCellsArray = [].concat(_toConsumableArray(workoutCells));

    workoutCellsArray.forEach(function (workoutCell, i) {
        if (i > 0) {
            workoutCell.addEventListener('click', function (e) {
                if (thisrt(String.fromCharCode(key)).style.backgroundImage === 'url("img/workout-active.png")') {
                    this.style.backgroundImage = 'url("img/workout.png")';
                } else {
                    this.style.backgroundImage = 'url("img/workout-active.png")';
                }
            });
        }
    });
});

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
    Array.from = function () {
        var toStr = Object.prototype.toString;
        var isCallable = function isCallable(fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function toInteger(value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function toLength(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }();
}