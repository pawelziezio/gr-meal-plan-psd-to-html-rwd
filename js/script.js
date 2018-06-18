const updateProgressBar = (activeWeek) =>{

    const weeks = document.getElementsByClassName('plan__progress--week');
    const weeksArray = [...weeks];

    if(activeWeek === 1){
        weeksArray[0].style.backgroundImage = "url(img/circleActive.png)";
        for(let i = 1 ; i < weeks.length ; i++ ){
            weeksArray[i].style.backgroundImage = "url(img/circle+line.png)";
        }
    };

    if(activeWeek === 2){
        weeksArray[0].style.backgroundImage = "url(img/circleG.png)";
        weeksArray[1].style.backgroundImage = "url(img/circleActive+line.png)";
        for(let i = 2 ; i < weeks.length ; i++ ){
            weeksArray[i].style.backgroundImage = "url(img/circle+line.png)";
        }
    };

    if(activeWeek > 2){
        weeksArray[0].style.backgroundImage = "url(img/circleG.png)";
        for(let i = 1 ; i < weeksArray.length ; i++  ){
            if( i < (activeWeek-1)){
                weeksArray[i].style.backgroundImage = "url(img/circle+lineG.png)";
            }
            weeksArray[activeWeek-1].style.backgroundImage = "url(img/circleActive+line.png)";
        for(let i = activeWeek ; i < weeks.length ; i++ ){
            weeksArray[i].style.backgroundImage = "url(img/circle+line.png)";
        }
        };
    };

}

const showDayNumber = (weekNr) => {
    const dayNrCells = document.querySelectorAll('.plan__table--day-nr');
    const dayNrCellsArray = [...dayNrCells];

    dayNrCellsArray.forEach((day, index)=>{
        let dayNumber = (index+1) + (weekNr-1)*7;
        day.innerText = dayNumber;
    })
}

const backgroundPresentDay = (dayNumber) => {

    const cellsWithDayNr = document.querySelectorAll('.plan__table--day-nr');
    const cellsWithDayNrArray = [...cellsWithDayNr];

    cellsWithDayNrArray.forEach((cell)=>{
        if(parseInt(cell.innerText) === parseInt(dayNumber)){

            let dayBox = cell.parentElement
            let presentDayName = dayBox.className.split(' ')[1].split('-').pop();

            let selector = `[class*=${presentDayName}]`
            let cellsWithDayNameInClass = document.querySelectorAll(selector);
            let cellsWithDayNameInClassArray = [...cellsWithDayNameInClass];

            let cellsLength = cellsWithDayNameInClassArray.length;
            for(let i = 0; i < cellsLength; i++){
                if(i === 0){
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderTop');
                }else if(i > 0 && i < (cellsLength-2)){
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderMid');
                    cellsWithDayNameInClassArray[i].firstElementChild.classList.toggle('colorBlack');

                    if(cellsWithDayNameInClassArray[i].firstElementChild.innerText === 'Bod•ē Shake'.trim()){

                        cellsWithDayNameInClassArray[i].classList.toggle('shakeColor');;
                    }



                }else if(i === cellsLength-2){
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderMid');
                }else{
                    cellsWithDayNameInClassArray[i].classList.toggle('presentWeekBorderBottom');
                }
            }
        }
    })
}

const startDate = {
    year: 2018,
    month: 3,
    day: 23
};

const weekInMSec = 7 * 24 * 60 * 60 * 1000;
const dayInMSec = 24 * 60 * 60 * 1000;


document.addEventListener("DOMContentLoaded", function() {


    let timeDifference = new Date().getTime() - new Date(startDate.year,startDate.month,startDate.day).getTime();

    let presenWeek = Math.ceil(timeDifference / weekInMSec);

    let presentDay = Math.ceil(timeDifference / dayInMSec);

    const prevWeek = document.querySelector('.plan__button--prev');
    const nextWeek = document.querySelector('.plan__button--next');
    const week = document.querySelector('.plan__week-nr--active');

    week.innerText = presenWeek;

    showDayNumber(presenWeek);
    updateProgressBar(presenWeek);
    backgroundPresentDay(presentDay);

    let temp = 0;

    const prevWeekFuncion = (temp) => {
        let activeWeek = parseInt(week.innerText);

        if(activeWeek > 1){
            activeWeek--;
        };

        week.innerText = activeWeek;

        if(!temp){
            backgroundPresentDay(presentDay);
            temp = 1
        }
        updateProgressBar(activeWeek);
        showDayNumber(activeWeek);
        if(temp){
            backgroundPresentDay(presentDay);
            temp = 0;
        }
    }

    const nextWeekFunction = (temp) => {
        let activeWeek = parseInt(week.innerText);

        if(activeWeek < 12){
            activeWeek++;
        };

        week.innerText = activeWeek;

        if(!temp){
            backgroundPresentDay(presentDay);
            temp = 1;
        }
        updateProgressBar(activeWeek);
        showDayNumber(activeWeek);
        if(temp){
            backgroundPresentDay(presentDay);
            temp = 0;
        }
    }

    prevWeek.addEventListener('click',function(e){
        prevWeekFuncion(temp);
    })

    nextWeek.addEventListener('click',function(e){
        nextWeekFunction(temp);
    })


    window.addEventListener('keydown', function(e) {
        let key = e.keyCode;
        if(key === 37){
            prevWeekFuncion(temp);
        }
        if(key === 39){
            nextWeekFunction(temp);
        }

    });


    const mealCells = document.querySelectorAll('.plan__table--meal')
    const mealCellsArray = [...mealCells];

    mealCellsArray.forEach((mealCell, i)=>{
        mealCell.addEventListener('click',function(e){
            let imgEatenMark = this.firstElementChild.nextElementSibling;

            if(imgEatenMark.style.display === "block"){
                imgEatenMark.style.display = "none";
            }else{
                imgEatenMark.style.display = "block";
            }
        })
    });

    const workoutCells = document.querySelectorAll('.plan__table--workout');
    const workoutCellsArray = [...workoutCells];

    workoutCellsArray.forEach((workoutCell, i)=>{
        if( i > 0 ){
            workoutCell.addEventListener('click',function(e){
                if(thisrt(String.fromCharCode(key)).style.backgroundImage === 'url("img/workout-active.png")'){
                    this.style.backgroundImage = 'url("img/workout.png")';
                }else{
                    this.style.backgroundImage = 'url("img/workout-active.png")';
                }
            })
        }
    })
});

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
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
  }());
}
