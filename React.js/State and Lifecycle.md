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

## 클래스에 라이프 사이클 메서드 추가하기

컴포넌트가 DOM에 처음으로 렌더링 되는 것을 리액트에서 "마운트"라고 한다.

또한 컴포넌트로 생성된 DOM이 제거되는 것을 "마운트 해제"라고 한다.

리액트에서는 클래스 컴포넌트에서 컴포넌트가 마운트되거나 마운트 해제될 때 특정한 코드를 사용하기 위헤 해당 컴포넌트에 특수 메서드를 선언할 수 있다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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

이런 메서드들을 **라이프 사이클 훅**이라고 한다.

componentDidMount() 훅은 컴포넌트 출력이 DOM에 렌더링 된 이후에 실행된다. 즉, 마운트된 이후에 실행된다. 타이머를 세팅하기 좋은 곳이다.

```js
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

위에서 timerID를 지정해주는 이유는 이후에 Clock이 마운트 해제될 때, clearInterval 함수를 사용하기 위함이다. setInterval 함수를 실행하면 프로세스 ID가 반환되는데 이 ID를 clearInterval 함수에 넘기면 반복이 종료된다.

그리고 timerID를 this에 저장한 것을 주의해야 한다.

this.props는 React에 의해 설정되고 this.state는 특별한 의미를 가진다. 반면에 데이터 흐름에 참여하지 않은 데이터(timerID같은)는 클래스에 직접적으로 필드를 추가할 수 있다.

```js
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

이제 마운트해제 될 때 clearInterval 함수까지 정의했으니 tick 메서드만 정의하면 끝이다.

tick 메서드로는 컴포넌트 자체의 데이터를 바꾸므로 State를 통해서 데이터를 조작해야 한다. State를 설정할 때에는 this.setState 메서드를 사용해서 컴포넌트의 State를 업데이트하면 된다.

```js
tick() {
  this.setState({
    date: new Date()
  });
}
```

## State 올바르게 사용하기

setState에 대해서 알아둬야 할 세 가지가 있다.

### State를 직접적으로 변경하지 않기

아래 예시처럼 State의 프로퍼티를 직접적으로 변경하면 컴포넌트는 다시 렌더링되지 않는다.

```js
this.state.user = "James";
```

대신에 **setState** 메서드를 **사용**하면 된다.

```js
this.setState({user: "James"});
```

this.state에 직접 할당할 수 있는 곳은 **생성자**밖에 없다.

### State는 비동기적으로 업데이트 될지도 모른다.

리액트는 다수의 setState 메서드 호출을 성능 향상을 위해서 단일 업데이트로 처리할 수도 있다.

따라서 this.prop과 this.state가 비동기적으로 업데이트될 수 있으므로 다음 상태를 예측해서 사용할 때 해당 값을 신뢰해서는 안된다.

```js
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

위 코드는 카운터를 제대로 업데이트하지 못할 수 있다.

이 문제를 해결하려면 setState 메서드의 인자로 객체가 아니라 함수를 전달하는 형식을 사용해야 한다. 함수는 첫 번째 인자로 이전 State를 전달받고 두 번째 인자로 업데이트가 적용된 Prop을 전달받는다.

```js
this.setState((previousState, props) => ({
  counter: previousState.counter + props.increment
}));
```

화살표 함수가 아니라 일반 함수를 사용해도 작동한다.

### State 업데이트가 병합될 때

setState 함수를 호출할 때, 리액트는 전달받은 객체를 현재 State로 병합한다.

예를 들어 State에 몇가지 독립적인 변수가 있을 때,

```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

이럴 때 각각의 변수들을 개별적으로 setState함수로 업데이트할 수 있다.

```js
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```


this.setState에 comment에 대한 값을 적으면 post의 값은 바뀌지 않고 comment의 값만 업데이트 된다.

### 데이터의 흐름은 아래로

부모 컴포넌트나 자식 컴포넌트 둘 다 특정한 컴포넌트가 State를 가지고 있는지 없는지 알 수 없고, 클래스나 함수로 정의되었는지 신경쓰지 말아야 한다.

이것이 State가 local적 혹은 캡슐화되었다고 불리는 이유다. 소유하고 설정하는 컴포넌트 이외에는 접근할 수 없다.

컴포넌트는 자식 컴포넌트로 자신의 State를 전달할 수 있다.

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

사용자 정의 컴포넌트에서도 작동한다.

```js
<FormattedDate date={this.state.date} />
```

FormattedDate 컴포넌트는 props에서 date를 전달받는다. 그리고 이 컴포넌트는 Clock의 State에서 왔다는 것을 모른다.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

이런 데이터 흐름을 일반적으로 "하향식" 혹은 "단방향" 데이터 흐름이라고 부른다. 모든 State는 특정한 컴포넌트에 의해 소유된다. 그리고 해당 State로 부터 나타난 데이터나 UI는 컴포넌트의 하위 요소에만 영향을 끼칠 수 있다.