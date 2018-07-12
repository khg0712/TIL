## typeof 연산자

JS의 데이터는 **typeof** 연산자를 통해서 해당 데이터의 타입을 확인할 수 있다. 하지만 typeof 연산자를 통해서 모든 데이터를 해당 타입을 알아낼 수 는 없다.

    typeof undefined === "undefined"; //true
    typeof true === "boolean"; //true
    typeof 42 === "number"; //true
    typeof "s" === "string"; //true
    typeof {a:1} === "object"; //true
    typeof Symbol() === "symbol"; //true
    typeof null === "null"; //false
    typeof null === "object" //true

다른 타입들은 모두 자기 자신의 타입이 반환되지만 null 타입의 typeof 연산 결과는 "null"이 아닌 **"object"**\이다. 사실 이 결과는 **버그**이다. ("null"을 반환해야 정상이다.) 이 버그는 오랫동안 고쳐지지 않았고 이 버그를 고치려고 하니 이전에 작성된 코드들에서 문제가 발생하게 되었다. 그래서 데이터의 null 타입을 체크하는 것은 typeof 연산자만으로는 불가능하다.

    var a = null;
    !a && (typeof a === "object"); //true

코드 설명을 하자면 null은 falsy한(false 값으로 변환되는) 값이기 때문에 !null을 하면 true가 된다.(객체는 truthy한 값이다.) 그리고 null의 typeof 연산의 결과가 "object"였다는 것을 앞에서 알아봤다. 이 두 조건을 모두 만족하는 데이터 타입은 null 타입 밖에 없기 때문에 위 코드를 null 타입 체크 용도로 사용할 수 있다.

typeof 연산자가 체크할 수 있는 데이터 타입은 이게 전부가 아니다. typeof 연산자는 함수 타입도 체크할 수 있다.

    function a() {
      console.log('a func');
    }
    typeof a === "function"; //true

분명히 **함수**는 **객체의 하위 타입**이기 때문에 함수의 typeof 반환 값을 "object"라고 생각할 수 있지만 **"function"** 을 **반환**한다.

**배열**의 typeof 연산 결과는 아쉽게도 **"object"**이다.

## 정리

*   typeof 연산자가 반환할 수 있는 문자열의 개수는 7개(number, string, boolean, undefined, symbol, object, function)이다.
*   null 타입은 typeof 연산의 결과가 "object"이다.