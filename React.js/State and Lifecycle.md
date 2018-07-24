# State와 라이프 사이클

엘리먼트 렌더링에서, UI를 업데이트를 하는 유일한 방법은 ReactDOM.render() 함수를 사용하는 것이다.

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

이제 위 함수를 실제로 재사용 가능하고 캡슐화 할 수 있게 만들 것이다.

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

위 코드의 문제는 1초마다 Clock의 정보를 업데이트하는 것을 Clock의 내부 구현 사항이 아니라는 것이다.

Clock이 밑의 코드처럼 자기 스스로 동작(업데이트)하길 원한다면,

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Clock 컴포넌트에 "State"를 추가해야 한다.

State는 Prop과 비슷하다. 하지만 State는 컴포넌트의 내부에서만 사용할 수 있고(private), 컴포넌트에 의해 변경된다. 반면에 Prop은 변경되지 않을 데이터를 다룰 때 사용한다.

클래스로 정의된 컴포넌트에는 몇가지 추가 기능들이 있다. 로컬 State는 클래스에서만 사용할 수 있는 기능이다.

## 함수를 클래스로 변환하기

Clock 같은 함수형 컴포넌트를 클래스 컴포넌트로 변환할 때, 5 단계로 변환할 수 있다.

1. React.Component를 상속하는 같의 이름의 ES6 클래스를 만든다.
2. 클래스 내부에 render 메서드를 만든다.
3. 함수형 컴포넌트 내부의 코드를 render 메서드 내에 넣는다.
4. render 메서드 내에 있는 Prop를 this.props로 바꾼다.
5. 남아있는 함수형 컴포넌트 코드를 지운다.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

이제 Clock은 클래스 컴포넌트가 됐다.

render 메서드는 매 초마다 호출되어 컴포넌트를 업데이트할 것이다. 하지만 <Clock />을 같은 DOM 노드에 렌더링한다면, 오직 하나의 인스턴스만 사용될 것이다.

## 클래스에 지역 State 추가하기

이제 date를 3단계에 걸쳐 Prop에서 State로 옮길 것이다.

1. render 메서드 내의 this.props.date를 this.state.date로 바꾼다.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. 클래스 생성자로 this.state의 초기 값을 할당한다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

기본 생성자에는 Prop을 전달한다.

클래스 컴포넌트들은 기본 생성자를 호출할 때, Prop를 함께 호출해야 한다.

3. <Clock /> 컴포넌트에서 date Prop를 지워라.

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

위 과정을 거치면 아래와 같은 결과가 나오게 된다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

하지만 이 단계에서는 UI를 업데이트할 수 없다.