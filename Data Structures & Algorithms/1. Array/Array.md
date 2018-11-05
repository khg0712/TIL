# 배열

## 자바스크립트에서의 배열

배열은 정수 인덱스를 사용해서 각각의 요소에 접근할 수 있게 순차적으로 요소를 저장한 집합체이다. 자바스크립트에서 배열은 객체의 일종이다. 정수를 인덱스로 사용하면 자바스크립트 객체 요구사항에 따라서 내부적으로 정수를 문자열로 변환한다.

배열은 자바스크립트에서 공식적으로 제공하는 객체이기 때문에 미리 정의된 프로퍼티와 함수를 사용할 수 있다.

## 배열 사용하기

자바스크립트의 배열은 정말 유연하다. 배열을 만들고, 요소에 접근하는 등 다양한 방식으로 배열을 다룰 수 있다.

### 배열 만들기

배열을 만드는 가장 간단한 방법은 배열 리터럴([])을 사용해서 만드는 방법이다.

```js
let numbers = [];
```

배열 리터럴을 통해서 배열을 만들면 길이가 0인 배열이 만들어진다. 배열의 length 프로퍼티를 통해서 길이를 확인할 수 있다.

또 다른 언어들과 다르게 배열의 요소들은 각각 다른 타입이어도 된다.

```js
let array = [1,2,"A",undefined, null,true];
```

또 Array.isArray() 함수를 이용해서 특정 객체가 배열인지 여부를 확인할 수 있다.

### 배열 요소 접근하고 값 고치기

할당 문에 []를 사용해서 배열요소에 값을 할당할 수 있다. 

```js
let numbers = [1,2,3,4];
console.log(numbers[1]);//2 출력
```

### 문자열로 배열 만들기

문자열에 split() 함수를 호출하면 배열이 생성된다. split() 함수는 문자열을 특정 구분자로 분리한 다음 분리된 문자열을 포함하는 배열을 만든다.

```js
let string = "A B C D E F G";
let alphabets = string.split(" ");
for(let i=0; i<alphabets.length; i++) {
    console.log(alphabets[i]);
}
```

### 얕은 복사와 깊은 복사

배열을 다른 배열에 할당할 수도 있다.

```js
let array = [12,34,5,6];
let newArr = array;
```

배열을 다른 배열에 할당하는 행위는 다른 배열에 배열의 레퍼런스를 할당하는 것이다. 따라서 할당된 배열에서 배열을 조작하면 원래 배열의 내용도 변하게 된다. 이런 동작을 **얕은 복사**라고 말한다. 반대로 단순히 원래 배열의 값을 복사한 완전히 새로운 배열을 반환하는 동작인 **깊은 복사**도 있다.

고전적으로 깊은 복사를 하는 방식은 for문으로 배열의 요소 하나 하나를 순회하여 복사하는 것이다.

```js
let arr = [2,5,6,7,3,2];
let newArr=[];
for(let i=0; i<arr.length; i++) {
    newArr[i]=arr[i];
}
```

es6의 확산 연산자 ( `...` )를 사용하면 더 쉽게 깊은 복사를 할 수 있다.

```js
let arr = [2,5,6,7,3,2];
let newArr = [...arr];
```

복사를 했을 때 깊은 복사인지 얕은 복사인지 여부를 확인할 때에는 ===연산자를 통해서 레퍼런스를 비교하면 된다. 위 상황에서는 다음과 같은 결과가 나온다.

```js
let arr = [2,5,6,7,3,2];
let newArr = [...arr];
console.log(arr===newArr);//false 출력
```

## 접근자 함수

자바스크립트에서는 배열 요소에 접근할 수 있는 다양한 함수를 제공한다. 이들을 접근자 함수(accessor function)이라고 부르며 특정값을 포함하는 결과를 반환한다.

### 특정 요소 검색하기

indexOf() 메서드는 인자로 제공된 값이 배열 어디에 존재하는지 알려준다. 만약 배열 내에 존재한다면 인덱스를 제공하고 그렇지 않다면 -1을 반환한다. indexOf() 메서드는 배열의 앞에서부터 첫번째로 발견된 인자의 인덱스를 반환한다. lastIndexOf() 메서드는 그 반대로 동작한다.

```js
let alphabets = ['a','b','c','d','e','f','g'];
let aIndex = alphabets.indexOf('a');//0
let zIndex = alphabets.indexOf('z');//-1
```

### 배열을 문자열로 표현하기

배열을 문자열로 변환할 때에는 join() 메서드와 toString() 메서드를 사용할 수 있다. join() 메서드는 인자로 넣은 값들을 요소의 사이 사이에 넣은 문자열을 반환하고 인자가 없을 때에는 쉼표(,)가 인자의 사이에 들어간다. toString() 메서드는 인자를 필요로하지 않고, 요소의 사이 사이에 쉽표를 넣은 문자열을 반환한다.

```js
let alphabets = ['a','b','c','d','e','f','g'];
let myAlphas = alphabets.join(' # ');
let myABC = alphabets.toString();
```

### 기존의 배열을 이용해서 새 배열 만들기

concat() 메서드와 splice() 메서드는 기존 배열을 이용해서 새 배열을 만드는 함수다. **concat() 함수**는 두 개 이상의 **배열을 합쳐서** 새 배열을 만들고, **splice() 함수**는 **기존 배열의 서브셋**으로 새 배열을 만든다.

concat() 메서드는 기존의 배열에서 호출하고, 인자로는 기존의 배열 끝에 새로 추가할 요소들을 받는다. 추가할 수 있는 자료형은 무엇이든 가능하다. 만약 배열을 인자로 제공한다면 배열은 분해되어 개별 요소로서 들어간다. 사용법은 아래와 같다.

```js
let arr = [1,2,3,4], additionalArr = [5,6,7,8];
let newArr1 = arr.concat(additionalArr);//[1,2,3,4,5,6,7,8]
let newArr2 = arr.concat(5, 'a',true, undefined, null, {});//[1, 2, 3, 4, 5, "a", true, undefined, null, {}]
let newArr3 = arr.concat([[5,6],[7,8],[9,10]]);//[1, 2, 3, 4, [5,6],[7,8],[9,10]]
```

단, 배열이 1차원이 아닐 경우에는 요소가 1차원보다 더 분해되지 않는다.

splice() 메서드는 기존 배열 요소의 일부분을 가지고 새로운 배열을 만든다. splice() 메서드는 사용할 첫 요소의 인덱스, 기존 배열에서 사용할 요소의 개수를 인자로 받는다. 사용법은 아래와 같다.

```js
let nameList = ["Kim","Jane","Junho"];
let selectedList = nameList.splice(1,1);//["Jane"]
console.log(nameList);//["Kim", "Junho"] 출력
```

새로운 배열을 반환하는 용도로 splice() 메서드를 사용할 수 있지만, 기존 배열을 수정하기 위해서도 사용할 수 있다.

## 변형자 함수

자바스크립트는 개별적으로 배열의 내용을 변경할 수 있는 변형자 함수를 제공한다.

### 배열에 요소 추가하기

배열에 요소를 추가할 때에는 push() 메서드와 unshift() 메서드를 사용한다. push() 메서드는 배열의 뒤에 새로운 요소를 추가하고, unshift() 메서드는 배열의 앞에 새로운 요소를 추가한다.

```js
let arr = [2,3,4];
arr.push(5,6);
arr.unshift(0,1);
console.log(arr);//[0,1,2,3,4,5,6] 출력
```

### 배열의 요소 삭제하기

pop() 메서드를 사용하면 마지막 요소를 제거할 수 있다. 그리고 shift() 메서드를 사용하면 맨 앞 요소를 제거할 수 있다. pop() 메서드와 shift() 메서드는 반환한 요소를 반환하기 때문에 변수에 삭제된 요소의 값을 할당할 수 있다.

```js
let arr = [1,2,3];
console.log(arr.pop());//3 출력
console.log(arr.shift());//1 출력
console.log(arr)//[2] 출력
```

### 배열의 중간에 있는 요소 변경하기

splice() 메서드는 배열 중간에 있는 요소를 추가하거나 삭제할 때 사용한다. splice() 메서드를 사용할 때에는 3가지 파라미터를 받는다. 

1. 변경을 시작할 인덱스
2. 삭제할 요소의 개수(추가일 땐 0)
3. 배열에 추가할 요소들(삭제만 할 땐 필요 x)

```js
let arr = [1,2,3,4,5];
arr.splice(1,3);
console.log(arr);//[1,5]출력
```

### 배열 요소 정렬하기

자바스크립트에는 배열의 요소를 정렬하는 변형자 함수가 존재한다. 바로 reverse() 메서드와 sort() 메서드다.

reverse() 메서드는 해당 배열의 현재 순서를 역순으로 바꿔준다.

sort() 메서드는 배열 요소를 순서대로 정렬한다. 특히, **문자열**을 **정렬**하는 데에 특화되어 있다.

```js
let names = ['Kim','Amy', 'Ryu', 'James','Gorge'];
names.sort();
console.log(names);//["Amy", "Gorge", "James", "Kim", "Ryu"] 출력
```

하지만 숫자는 예상대로 정렬되지 않는다.

```js
let grades = [45,65,4,2,100];
grades.sort();
console.log(grades);//[100, 2, 4, 45, 65] 출력
```

sort() 메서드는 배열 요소를 모두 문자열로 간주하고 알파벳순으로 요소를 정렬한다. 하지만 sort() 메서드에 인자로 순서를 결정해줄 콜백함수를 넣어주면 해당 콜백함수로 배열 요소를 정렬한다. 콜백함수는 요소의 순서를 결정해줘야 하는데 두 가지 인자를 받아야 한다. 첫 번째 인자의 우선순위가 높으면 양수, 두 번째 인자의 우선순위가 높으면 음수, 우선순위가 같으면 0을 반환하면 된다. 그렇다면 숫자의 크기를 비교하는 간단한 콜백함수를 작성해서 sort() 메서드에서 사용해보자.

```js
function numCompare(num1, num2) {
    return num1-num2;
}
function numReverseCompare(num1, num2) {
    return num2-num1;
}

let arr = [111,43,65,88,44,23,67,43];
arr.sort(numCompare);
console.log(arr);//[23, 43, 43, 44, 65, 67, 88, 111] 출력
arr.sort(numReverseCompare);
console.log(arr);//[111, 88, 67, 65, 44, 43, 43, 23] 출력
```

## 반복자 함수

반복자 함수는 배열의 각 요소에 함수를 적용한 다음 그 결과 값 혹은 값의 집합을 반환한다.

### 배열을 만들지 않는 반복자 함수

배열의 각 요소에 어떤 작업을 수행하거나 배열에 작업을 수행하고 하나의 값을 반환하는 함수를 살펴보자.

배열을 만들지 않는 반복자 함수에는 forEach() 메서드가 있다. forEach() 메서드는 배열의 모든 요소에 인자로 받은 콜백함수를 호출한다.

```js
function square(num) {
    console.log(num**2);
}

let arr = [1,2,3,4,5,6];
arr.forEach(square);
```

출력한 결과는 다음과 같다

```
1
4
9
16
25
36
```

또, every() 메서드도 존재한다. every() 메서드는 불린 값을 반환하는 콜백함수를 배열에 적용해 배열의 모든 요소에서 콜백함수가 true을 반환하면 true를 반환한다.

```js
function isOdd(num) {
    return num%2==1;
}

let arr = [1, 3, 5, 7, 9];
console.log(arr.every(isOdd));//true 출력
```

반대의 기능을 하는 some() 메서드도 있다. some() 메서드는 불린 값을 반환하는 콜백함수 배열에 적용해 배열 요소들 중에 한 요소라도 true를 반환하면 true를 반환한다.

```js
function isOdd(num) {
    return num%2==1;
}

let arr = [0, 2, 4, 8, 10];
console.log(arr.some(isOdd));//false 출력
```

reduce() 메서드는 누적자 콜백함수를 인자로 받고, 다음 배열의 모든 요소를 누적자 콜백함수에 적용한다.

```js
function add(prevTotal, curVal) {
    return prevTotal + curVal;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.reduce(add));//55 출력
```

위 예시는 배열의 모든 요소의 합을 더하는 예제이다.

reduce() 메서드는 왼쪽에서 오른쪽 즉, 작은 인덱스에서 큰 인덱스의 요소의 방향으로 배열을 순회한다. 반대로 reduceRight() 메서드는 큰 인덱스에서 작은 인덱스의 방향으로 배열을 순회한다.

```js
function stringCombine(prevVal, curVal) {
    return prevVal + curVal;
}
let words = ['A','b','c','D','E'];
console.log(words.reduceRight(stringCombine));//EDcbA 출력
```

### 새 배열을 반환하는 반복자 함수

map() 메서드, filter() 메서드는 모두 새 배열을 반환하는 반복자 함수다. map() 메서드는 forEach() 메서드처럼 배열의 모든 요소에 콜백함수를 적용하는 함수이다. 하지만 요소에 콜백함수를 적용한 결과 값을 저장한 배열을 반환한다.

```js
function curve(num) {
    return num += '월';
}
let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let curvedMonths = months.map(curve);//["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
```

filter() 메서드는 every() 메서드와 비슷하지만 콜백함수가 참을 반환하는 요소들을 모은 **새로운 배열을 반환**한다. 즉, 배열에서 조건에 맞는 요소들을 **filter**하는 것이다.

```js
function isOdd(num) {
    return num%2!=0;
}

function isEven(num) {
    return num%2==0;
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let odds = nums.filter(isOdd);//[ 1, 3, 5, 7, 9 ]
let evens = nums.filter(isEven);//[ 2, 4, 6, 8, 10 ]
```

filter() 메서드는 숫자뿐만 아니라 문자열도 다룰 수 있다.

```js
function havea(word) {
    if(word.indexOf('a') > -1 || word.indexOf('A') > -1)
        return true;
    return false;
}

let words = ["apple",'Ant','cake','lost','bike','base'];
let a_words = words.filter(havea);//[ 'apple', 'Ant', 'cake', 'base' ]
```

## 이차원 배열과 다차원 배열

### 이차원 배열 만들기

이차원 배열은 행렬구조를 띈다. 따라서 행과 열을 필요로 한다. 반복문을 통해서 2차원 배열을 만들어보자.

```js
let twod = [];
let rowNum = 10;
for(let i = 0; i < rowNum; i++) {
    twod[i] = [];
}
```

위 방식으로 이차원 배열을 만들면 모든 요소가 초기화되지 않은 상태이기 때문에 undefined로 설정된다. `더글라스 크락포드의 자바스크립트 핵심 가이드`에서 제공하는 예제를 이용하면 더 실용적인 이차원 배열을 만들 수 있다. 배열의 행과 열, 그리고 초기화할 값을 입력받는다.

```js
Array.matrix = function(numrows, numcols, initial) {
  let arr = [];
  for(let i = 0; i < numrows; ++i) {
    let colums = [];
    for(let j = 0; j < numcols; ++j) {
      colums[j] = initial;
    }
    arr[i] = colums;
  }
  return arr;
}

let num = Array.matrix(5, 5, 0);
console.log(num);

// result

// [ [ 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0 ],
//   [ 0, 0, 0, 0, 0 ] ]
```

물론 대괄호 표기법으로도 이차원 배열을 정의할 수 있다.

```js
let matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
console.log(matrix[0][2]);//3 출력
```

### 이차원 배열 요소 처리하기

기본적으로 이차원 배열 요소는 두 가지 방법으로 처리할 수 있다. **행**을 기준으로 처리하는 것과 **열**을 기준으로 처리하는 것이다. **행 중심**으로 배열을 처리할 때에는 **외부 루프**가 **열**을 처리하고, **내부 루프**가 **행**을 처리하게 만들면 된다. 반대로 **열 중심**으로 배열을 처리할 때에는 **외부 루프**가 **행**을 처리하고, **내부 루프**가 **열**을 처리하게 만들면 된다.

### 들쭉날쭉한 배열

들쭉날쭉한 배열이란 배열의 행이 포함하는 요소의 개수가 서로 다른 배열이다. 한 행에는 3개의 요소가 있고, 다른 행에는 5개의 요소가 있다. 이렇게 행마다 요소의 개수가 다른 이차원 배열의 요소를 처리해보자.

예를 들어 grades 배열에서 학생 점수의 개수가 서로 다르다고 생각해보자. 각 학생의 점수 평균을 쉽게 구할 수 있다.

```js
let grades = [[10,20,30,40],[50,20,100,20,30,35],[100,70,90,40]];

for(let i = 0; i < grades.length; i++) {
    let sum = 0, avg = 0;
    for(let j = 0; j < grades[i].length; j++) {
        sum += grades[i][j];
    }
    avg = sum/grades[i].length;
    console.log(avg);
}
```

자바스크립트는 배열의 행의 요소의 개수를 정확히 파악할 수 있기 때문에 이런 프로그래밍이 가능하다.

## 객체를 요소로 포함하는 배열

지금까지는 숫자, 문자열 등 기본 데이터형을 요소로 포함하는 배열만 살펴봤다. 배열을 객체를 요소로 포함할 수 있다.

```js
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function displayPts(arr) {
    for(let i = 0; i < arr.length; i++) {
        console.log(`${arr[i].x}, ${arr[i].y}`);
    }
}

let points = [];
for(let i = 0; i < 5; i++) {
    points[i] = new Point(i, i+5);
}

displayPts(points);
console.log('before pushing');
points.push(new Point(10,100));
displayPts(points);
console.log('before shift');
points.shift();
displayPts(points);
```

push() 메서드로 객체를 추가하고 shift() 메서드로 객체를 삭제하는 것도 잘 작동한다.

## 객체에 포함된 배열

객체에 복잡한 데이터를 저장할 때 배열을 활용할 수 있다. 

예제에서는 한 주동안 관찰된 가장 높은 온도를 저장하는 객체를 만든다. 이 객체에는 새 온도를 추가하는 기능, 객체에 저장된 온도의 평균을 계산하는 기능이 있다.

```js
function weekTemp() {
    this.dataStore = [];
    this.add = add;
    this.avg = avg;
}

function add(temp) {
    this.dataStore.push(temp);
}

function avg() {
    let sum = 0;
    for(let i = 0; i < this.dataStore.length; i++) {
        sum += this.dataStore[i];
    }
    return sum / this.dataStore.length;
}

let thisWeek = new weekTemp();

thisWeek.add(52);
thisWeek.add(12);
thisWeek.add(42);
thisWeek.add(54);
thisWeek.add(19);
thisWeek.add(30);
console.log(thisWeek.avg());
```

add() 메서드는 Array의 push() 메서드를 사용해서 배열에 데이터를 추가한다.

## 연습문제

1. 객체에 학생들의 점수 집합을 저장하는 grades 객체를 만드시오 점수를 추가하는 함수, 학생의 평균 점수를 출력하는 기능을 객체에 추가하시오.

```js
function grades() {
    this.gradeStore = [];
    this.add = add;
    this.avg = avg;
}

function add(grade) {
    this.gradeStore.push(grade);
}

function avg() {
    let sum = 0;
    for(let i = 0; i < this.gradeStore.length; i++) {
        sum += this.gradeStore[i];
    }
    return sum / this.gradeStore.length;
}

let myGrades = new grades();
myGrades.add(13);
myGrades.add(54);
myGrades.add(100);

console.log(myGrades.avg());
```

2. 배열의 단어 집합을 저장한 다음 배열의 내용을 정방향 또는 역방향으로 출력하는 기능을 구현하시오.
3. 이차원 배열을 이용해 월간 온도 자료를 저장하도록 weeklyTemp 객체를 수정하시오. 월간 평균, 지정한 주의 평균, 모든 주의 평균을 출력하는 함수를 만드시오.