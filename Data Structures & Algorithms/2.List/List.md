# 리스트

리스트는 일상생활에서 많이 사용되는 자료 구조들중 하나다. 간단한 리스트 클래스를 만들어볼 것이다. 먼저, 리스트 ADT(Abstract Data Type)의 정의를 살펴보고, 리시트 ADT를 직접 구현해보자.

## 리스트 ADT

리스트 ADT를 설계하려면 리스트의 정의, 프로퍼티, 리스트가 수행하는 동작, 리스트에 의해 수행되는 동작 등을 알아야 한다.

**리스트**는 **순서가 있는 일련의 데이터 집합**이다. 리스트에 저장된 각각의 데이터를 요소(element)라고 부른다. 자바스크립트에서는 리스트의 요소가 될 수 있는 타입에 제한이 없고, 저장할 수 있는 리스트의 개수에 제한이 없다. 하지만 리스트를 사용하는 프로그램의 가용 메모리 범위 내에서 최대 크기가 지정된다.

요소가 없는 리스트를 빈 리스트라고 한다. 리스트에 **저장된 요소의 개수**를 **리스트의 길이**라고 한다. 내부적으로 리스트는 **요소의 개수**를 **listSize 변수**에 저장한다. 리스트에서는 요소를 **리스트의 끝에 추가(append)**하거나, 기존의 요소의 **앞이나 뒷 부분에 삽입(insert)**할 수 있고, **전체 삭제(clear)**를 통해서 리스트의 모든 요소를 삭제할 수 있다.

**toString()** 메서드를 이용해서 리스트의 **모든 요소**를 출력하거나 **getElement()** 메서드를 이용해서 **현재 요소의 값**만을 출력할 수 있다.

리스트는 위치를 가리키는 프로퍼티를 포함한다. 리스트에는 **front, end 프로퍼티**가 있다. **next()** 메서드로 리스트의 현재 요소에서 **다음 요소로 이동**할 수 있으며 **prev()** 메서드로 현재 요소에서 **이전 요소로 이동**할 수 있다. **moveTo(n)** 메서드를 이용하면 **n번째 위치로** 한 번에 **이동**할 수 있다. **currPos()** 메서드는 리스트의 **현재 위치**를 가리킨다.

함수리스트 ADT는 리스트를 어떻게 저장할지는 정의하지 않는다. 우리는 dataStore이라는 배열을 이용해서 리스트의 요소를 저장할 것이다.

프로퍼티|내용
:-----:|:---:
listSize (프로퍼티)| 리스트의 요소 수
length (프로퍼티) | 리스트의 요소 수
clear (메서드) | 리스트의 모든 요소 삭제
toString (메서드) | 리스트를 문자열로 표현해서 반환
insert (메서드) | 기존 요소의 앞이나 뒤에 요소 추가
append (메서드) | 새 요소를 리스트에 추가
remove (메서드) | 리스트의 요소 삭제

## List 클래스 구현

앞에서 정의한 리스트 ADT를 이용해서 List 클래스를 구현할 수 있다. ADT에는 없었지만 우선 생성자 함수부터 정의한다.

```js
function List() {
    this.listSize = 0;
    this.dataStore = [];
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.length = length;
    this.contains = contains;
}
```

### Append 메서드

먼저 append() 메서드를 구현한다. append() 메서드는 리스트의 다음 가용 위치(listSize 변수의 값)에 새 요소를 추가하는 함수다.

```js
function append(element) {
    this.dataStore[this.listSize++] = element;
}
```

append() 메서드를 실행하고 나서는 listSize를 1만큼 증가시켜야 한다.

### Remove 메서드

이번에는 리스트의 요소를 삭제하는 방법을 살펴볼 것이다. remove() 함수는 리스트에서 삭제하려는 요소를 찾은 다음, 요소를 삭제하고, 요소가 삭제된 자리를 메워야 한다. 이 작업은 splice() 메서드를 통해서 할 수 있다. 우선, find 함수를 먼저 구현해보자.

### Find 메서드

find() 메서드는 indexOf() 메서드로 쉽게 구현할 수 있다. 만약 찾는 값이 dataStore에 없다면 -1을 반환한다.

```js
function find(element) {
    return this.dataStore.indexOf(element);
}
```

### Re: Remove 메서드

이제 find() 메서드를 구현했으니 remove() 메서드를 구현해보자. remove 함수는 요소를 삭제하면 true를 반환하고 삭제하지 못했을 때에는 false를 반환한다. 또한 listSize의 크기도 1 줄여야 한다.

```js
function remove(element) {
    const index = this.find(element);
    if(index == -1)
        return false;
    this.dataStore.splice(index, 1);
    --this.listSize;
    return true;
}
```

### Length 메서드

length() 메서드는 리스트의 요소의 개수를 반환한다.

```js
function length() {
    return this.listSize;
}
```

### toString 메서드

toString 메서드는 리스트의 요소를 확인하는 함수다.

```js
function toString() {
    return this.dataStore.join();
}
```

### Insert 메서드

insert() 메서드는 기존 요소 뒤에 요소를 삽입하는 함수다. insert 메서드도 remove 메서드처럼 splice 메서드를 통해서 구현할 수 있다.

```js
function insert(element, afterEle) {
    const index = this.find(afterEle);
    if(index > -1) {
        this.dataStore.splice(index+1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}
```

insert() 메서드는 헬퍼 함수 find() 메서드를 이용해서 새 요소의 삽입 위치를 찾는다. 요소가 dataStore 안에 존재한다면, 해당 인덱스에 새로운 요소를 추가하고 listSize를 1만큼 증가시키고 true를 반환한다. 그렇지 않다면 false를 반환한다.

### Clear 메서드

리스트 내의 모든 요소를 삭제하는 메서드인 clear() 메서드를 구현해보자.

```js
function clear() {
    this.dataStore.length = 0;
    this.listSize = 0;
}
```

배열의 length 프로퍼티에 0을 할당하면 배열의 요소들은 모두 지워진다. 이는 원 배열에 대한 레퍼런스를 유지하면서 배열을 초기화하는 방식이다.

### Contains 메서드

contains() 메서드는 어떤 값이 리스트 안에 포함되어 있는지 확인할 때 사용하는 함수다.

```js
function contains(element) {
    const isContain = this.find(element) > -1 ? true : false;
    return isContain;
}
```

### 결과

```js
const myList = new List();

myList.append(1);
myList.append(2);
myList.append(5);
myList.append(6);
console.log(myList.length());//4
console.log(myList.insert("myEle", 1));//true
console.log(myList.toString());//1,myEle,2,5,6
console.log(myList.remove("myEle"));//true
console.log(myList.contains(6));//true
console.log(myList.length())//4
console.log(myList.contains("myEle"));//false
```

리스트가 잘 작동하는 것을 확인할 수 있다.

## 연습문제

1. 현재 리스트의 모든 요소보다 클 때만 요소를 삽입하는 함수를 구현하시오. 여기서 크다는 의미는 숫자일 때는 크기를 비교하고, 텍스트일 때는 알파벳순으로 나중을 의미한다.

```js
function append(element) {
    if(this.length() === 0) {
        this.dataStore[this.listSize++] = element;
        return;
    }
    if(element > this.dataStore[this.length() - 1]) {
        this.dataStore[this.listSize++] = element;
        return;
    }
    console.log("can't insert");
}
```

2. 현재 리스트의 모든 요소보다 작을 때만 요소를 삽입하는 함수를 구현하시오.

```js
function append(element) {
    if(this.length() === 0) {
        this.dataStore[this.listSize++] = element;
        return;
    }
    if(element < this.dataStore[this.length() - 1]) {
        this.dataStore[this.listSize++] = element;
        return;
    }
    console.log("can't insert");
}
```

3. 사람의 이름과 성별을 저장하는 Person 클래스를 구현하시오. 최소한 10개의 Person 객체를 포함하는 리스트를 만드시오. 리스트에서 같은 성별을 가진 사람을 모두 출력하는 함수를 구현하시오.

```js
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}

function showSameGenders(gender) {
    for(let people of this.dataStore) {
        if(people.gender === gender) {
            console.log(people);
        }
    }
}
```