## 동적인 언어, 자바스크립트

자바스크립트는 기본적으로 느슨한 타입 체크(loosly typed) 언어이자 동적 타입(dynamic typed) 언어이다. 그래서 자바스크립트에서 변수를 선언할 때 필요한 예약어는 var 단 하나이다.(사실 var 없이도 변수 선언이 가능하다.) 하나의 변수에 모든 타입의 데이터를 넣을 수 있다.

    var a = "a";  //a는 이제 string 타입
    a = 1;        //a는 이제 number 타입
    a = true;     //a는 이제 boolean 타입
    a = null      //a는 이제 null 타입
    a = undefined //a는 이제 undefined 타입

## 자바스크립트의 데이터 타입

자바스크립트의 데이터 타입은 기본 타입(Primitive Type)과 참조 타입(Reference Type) 이렇게 크게 2가지로 나눌 수 있다. 기본 타입에는 불린, null, undefined, 숫자, 문자열, 심볼(Boolean, Null, Undefined, Number, String, Symbol)이 있다. **Symbol은 ES6에서 새로 추가된 자료형이다.** 나머지 타입은 모두 참조 타입(객체)이라고 생각하면 된다. 참조 타입은 모두 객체의 일종이다. 참조 타입에는 배열, 함수, 정규 표현식, 객체가 있다.

## 자바스크립트의 기본 타입(Primitive value)

위에서 말했듯이 자바스크립트에는 6가지 기본 타입이 있다.

*   number(숫자)
*   string(문자열)
*   boolean(불린값)
*   undefined
*   null
*   symbol(ES6에서 추가)

이 6가지 기본 타입 값들은 **변경이 불가능한 값**(immutable value)들이다.

### number 타입

number 타입에는 숫자, Infinity(양의 무한대), -Infinity(음의 무한대), NaN(숫자가 아닌 값)이 포함된다. number 타입은 정수와 실수 구분없이 그 값을 바로 저장할 수 있다. number 타입에서 표현할 수 있는 가장 큰 값은 **Number.MAX_VALUE**로 가장 작은 값은 **Number.MIN_VALUE**로 확인할 수 있다. 그리고 number 타입에서는 0을 두가지 방식으로 표현할 수 있다. 0은 +0과 -0 두가지 방식으로 표현할 수 있다. 이 둘은 미세하게 차이가 있지만 둘은 같다고 말할 수 있다.

    -0 === 0 // true
    1 / 0    //Infinity
    1 / -0   //-Infinity

### string 타입

문자열은 작은 따옴표(')와 큰 따옴표(")를 사용해서 생성할 수 있다. 자바스크립트에는 C같은 언어의 char 타입같은 별도로 하나의 문자만 나타내는 자료형이 존재하지 않는다.

다른 기본 타입과 마찬가지로 **변경 불가능**하다는 게 문자열의 특징이다. 하지만 원래 문자열에서 일부가 수정된 **새로운 문자열**을 만드는 것은 가능하다.

*   원래 문자열에서 부분 문자열을 추출해서 만든 문자열
*   문자열들을 합쳐서 만든 문자열

    var a = "abc"; a[1] = "d"; console.log(a); // 출력: "abc" // 변경 불가!

### boolean 타입

불린 타입은 true와 false 이렇게 두가지 값을 가지는 자료형이다.

### undefined 타입

undefined 타입은 undefined 하나의 값만을 가진다. undefined는 해당 변수가 아직 **할당**되지 않았음을 의미한다. 자바스크립트에서 변수가 생성되고 할당되지 않았을 때의 기본 값이 undefined이다.

### null 타입

null 타입은 null값 하나의 값만을 가진다. null은 **비어있음**을 나타내는 값이다. 값이 할당되지 않았다는 의미의 undefined와는 다르게 아예 **값이 없음(아무것도 없음)** 을 의미한다.

### symbol 타입

ES6에서 추가된 타입인 symbol타입은 **객체 속성(Object property)의 식별자**로 사용하기 위해 만들어졌다. 즉, 다른 속성과 이름이 같더라도 **충돌되지 않는** 고유의(unique) 속성을 만들기 위함이라는 말이다. 다른 라이브러리를 사용할 때 발생하는 충돌이나 업데이트되는 js 버전과 충돌을 피하기 위해 사용된다.

심볼은 두가지 방식으로 생성할 수 있다.

1.  Symbol('Hi'), Symbol()// 파라미터에 문자열을 넣는 것은 선택이다.
2.  Symbol.for('Hi'), Symbol()// 마찬가지로 파라미터에 문자열을 넣는 것은 선택이다.

이렇게 생성된 서로 다른 두 심볼은 다른 특성을 가진다. Symbol()을 사용하는 문법은 전체 코드베이스(codebase)에서 사용할 수 있는 전역(global) 심볼을 생성하지는 않는다. 이와 반대로 Symbol.for()을 통해서 심볼을 생성하게 된다면 전역 레지스트리에 같은 키(key)의 심볼이 없다면 새로운 심볼을 생성하게 되고, 있다면 해당 심볼을 공유하게 된다.

    Symbol('a') == Symbol('a') //결과: false
    //각 심볼이 고유의 값을 가지고 있어 서로 다름

    Symbol('a') == Symbol.for('a') // 결과: false

    Symbol.for('a') == Symbol.for('a') //결과: true
    //전역 레지스트리에서 같은 키의 심볼은 공유하므로 서로 같다.

이렇게 Symbol.for()을 통해 공유된 심볼은 Symbol.keyFor('symbol') 메소드를 통해서 가져올 수 있다.