# 조건부 렌더링

리액트에서는 필요한 동작을 캡슐화하는 특정한 컴포넌트를 만들 수 있다. 그리고 나서, 리액트 앱의 State에 따라서 그중에서 일부를 렌더링할 수 있다.

리액트에서 조건부 렌더링은 JS에서의 작동 방식과 동일하다. if 나 조건 연산자같은 JS 연산자를 사용해서 현재 State를 나타내는 엘리먼트를 만들고 리액트가 UI를 업데이트해서 일치하게 만든다.

두 가지 컴포넌트를 생각해보자.

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

유저의 로그인 여부에 따라 둘 중 하나를 보여주는 Greeting 컴포넌트를 만들 것이다.

```js
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

위의 경우엔 Greeting 컴포넌트의 isLoggedIn prop이 false이기 때문에 GuestGreeting 컴포넌트가 렌더링된다.

## 엘리먼트 변수

엘리먼트를 저장하기 위해서 변수를 사용할 수 있다. 이렇게 하면 컴포넌트의 일부분을 조건부 렌더링하는데 도움을 주고, 나머지 출력은 변경되지 않는다.

로그인과 로그아웃을 나타내는 두 가지 버튼을 생각해보자.

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

아래 예제에서는 LoginControl 이라는 State 저장 컴포넌트를 만든다.

현재 State에 따라 <LoginButton /> 또는 <LogoutButton />을 렌더링한다. 이전 예제에서 <Greeting />을 렌더링한다.

```js
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

위에서 새로 나온 구문은 if문을 통한 조건부 렌더링 밖에 없다. 위의 코드 처럼 변수와 if문을 사용해서 조건부 렌더링을 할 수 있지만 더 간단한 구문이 있다. 바로 JSX에서 인라인 조건을 사용하는 것이다.

## && 논리 연산자를 사용한 인라인 조건(if)

이전에 JSX안에 중괄호({})로 감싸서 사용한 표현식을 본 적이 있을 것이다. 여기서는 JS의 논리 연산자 &&를 사용해서 조건부로 엘리먼트를 포함할 수 있다.

```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

위 코드는 React만의 문법이 아니라 JS의 동작 원리이다. **true && 표현식**은 표현식을 반환하고, **false && 표현식**은 false를 반환한다. 이 구문에 대해 더 자세히 알고 싶다면 이 [링크](https://github.com/khg0712/TIL/blob/master/ES6/%ED%91%9C%ED%98%84%EC%8B%9D%EA%B3%BC%20%EC%97%B0%EC%82%B0%EC%9E%90.md#%EB%85%BC%EB%A6%AC-%EC%97%B0%EC%82%B0%EC%9E%90%EC%9D%98-%EB%8B%A4%EB%A5%B8-%EB%8F%99%EC%9E%91)를 참조해라.

이어서 말하자면, 결국, 앞의 표현식이 true라면 뒤의 표현식이 반환될 것이다. 만약 false일 땐, React는 그 결과를 무시할 것이다.

## 인라인 If-Else 조건 연산자

엘리먼트를 인라인으로 조건부 렌더링하는 또 다른 방법은 3항 연산자( : ? )를 사용한 방법이다.

이 방식은 짧은 텍스트를 조건부로 렌더링할 때 쓸 수 있다.

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

아니면 조금 더 큰 표현식에 사용할 수도 있지만 가독성이 조금 떨어질 것이다.

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

JS에서 처럼, 적절한 스타일을 정하는 것은 우리에게 달려있다.(어떤 방식이 가독성이 더 뛰어난 방법인지 우리가 정하는 것이다.) 또한 조건이 복잡해질 때 마다 컴포넌트를 추출해주는 것이 좋다.

## 컴포넌트가 렌더링되지 않게 막기

아주 드문 경우이지만, 컴포넌트가 다른 컴포넌트에 의해 렌더링되었더라도 그 컴포넌트 자체를 숨길 수 있다. 이렇게 하려면 렌더링 출력 대신에 null을 반환해야 한다.

아래 예시에서 warn이라는 prop의 값에 따라서 <WarningBanner />의 렌더링 여부가 결정된다. warn의 값이 false일 땐, 렌더링되지 않는다.

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

컴포넌트의 렌더링 메서드에서 null을 반환해도 컴포넌트의 라이프사이클 메서드가 실행되는 데에는 영향을 주지 않는다.