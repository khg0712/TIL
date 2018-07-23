## JSX란?

JSX는 JavaScript XML의 줄임말로 자바스크립트의 확장 문법이다. JSX를 사용하면 React 요소를 만들 수 있다. React는 마크업과 로직을 분리하는 대신에, 두 가지를 포함하는 컴포넌트를 통해 관심사를 분리([Soc](https://en.wikipedia.org/wiki/Separation_of_concerns))했다. 

React에서 JSX를 써야만 하는 것은 아니지만, JSX를 사용하면 React를 더 생산적으로 활용할 수 있다.

## JSX에서 표현식 포함하기

아래 예시를 보면 변수를 선언했을 때, 변수를 JSX안에 중괄호로 감싸서 사용할 수 있다.

```
const name = "James";
let element = <h1> Hello? {name}! </h1>;

React.DOM.render(
    element,
    document.getElementById('root')
);
```

JSX안에 있는 중괄호에는 모든 자바스크립트 표현식이 올 수 있다. 예를 들어 a++, 2 + 4, getId(userA) 같은 표현식들 말이죠.

중괄호안에 함수를 사용해봅시다.

```
function getId(user) {
  return user.id;
}

const user = {
  id: 'abcdefg123',
  name: 'Jordon',
  address: 'Paris'
};

const element = (
  <h1>
    Hello, {getId(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

위 코드에서 JSX를 여러 줄로 나눴다. 이 작업은 가독성을 위한 작업이다.(필수 사항이 아니라는 뜻임.) 이 때, JSX를 괄호로 묶어주지 않게 된다면 자동 세미콜론이 삽입될 수 있기 때문에 괄호를 사용해야 한다.

## JSX === 표현식

컴파일된 이후에 JSX는 자바스크립트 객체로 판별된다. 이 말은, if문이나 for문 같은 **제어문에서 JSX를 사용할 수 있다**는 말이다.

```
function getId(user) {
  if (user) {
    return <h1>Your id is {user.id}</h1>;
  }
  return <h1>You are not logged in</h1>;
}
```

## JSX로 속성 지정하기

JSX로 속성을 지정할 때, 문자열로 지정해줄 수 있다.

```
const element = <div tabIndex="0"></div>
```

혹은 중괄호로 자바스크립트 표현식을 포함해서 지정해줄 수 도 있다.

```
const element = <img src={images.background}></img>;
```

이 두 가지 방법은 각각 다른 상황에서 쓰인다.

## JSX로 자식 지정하기

JSX에 태그가 비어있을 때, XML처럼 태그를 />를 통해 바로 닫을 수 있다.

```
const element = <img src = {images.background}/>;
```

반면에 자식요소가 있을 때도 있다. 

```
const element = (
    <div>
      <h1>Hello? {user.name}.</h1>
      <p>I'm clickim</p>
    </div>
);
```

## JSX는 객체를 대표한다

Babel은 JSX를 React.createElement() 함수를 호출해서 컴파일한다.

밑의 두 예제의 결과는 같다.

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

첫번째 코드(JSX)를 Babel로 트랜스컴파일하면 두번째 결과가 나온다.

React.createElement() 함수는 버그없는 코드를 만들기 위해 몇가지 검사를 진행한다. 하지만 필수적으로 아래와 같은 객체를 만들어낸다.

```
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

위 객체는 React 요소라고 한다. 이 객체에는 네가 화면에 그려낼 요소에 대한 설명이 담겨있다. React는 이 객체들을 읽고 이것들을 사용해 DOM을 구성하고, 항상 최신 상태를 유지한다.