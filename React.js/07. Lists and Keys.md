# 리스트와 키

먼저, JS에서 리스트를 변환하는 방법을 알아보자.

아래 코드를 사용하면, map 함수를 통해서 배열의 요소를 모두 두 배로 늘릴 수 있다. map 함수에 의해서 반환된 새로운 배열을 doubled 변수에 할당한다.

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

위 코드는 콘솔에 [2, 4, 6, 8, 10]을 출력한다.

리액트에서 배열을 엘리먼트 리스트로 변환하는 것은 거의 비슷하다.

## 여러가지 컴포넌트 렌더링

엘리먼트 컬렉션을 빌드해서 중괄호안에 넣어 JSX에 사용할 수 있다.

아래에서 JS의 map 함수를 사용해서 number 배열을 순회한다. 각 항목에 대해서 \<li> 엘리먼트를 반환한다. 그리고, 결과로 나오는 배열을 listItem에 할당한다.

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

## 기본 리스트 컴포넌트

일반적으로 리스트를 컴포넌트 내부에서 렌더링해서 사용할 것이다.

이전 예제를 리팩토링해보자.

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

위 코드를 실행하면 리스트 아이템에 키가 제공되어야 한다는 에러 메시지가 발생할 것이다. 키는 엘리먼트 리스트를 만들 때 포함해야하는 문자열이다. 

이제 numbers.map 함수 내부에 리스트 아이템이 누락된 키 문자열을 넣어보자.

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## 키

키는 리액트가 어떤 아이템이 추가되고, 삭제되고, 수정되었는지 알게 해준다. 엘리먼트에게 안정적인 키를 주기 위해서는 키를 엘리먼트 내부에 줘야 한다.

키 값으로 선택할 만한 데이터는 형제 엘리먼트들을 고유하게 식별하는 데이터다. 보통은 데이터의 ID값을 키로 사용한다.

```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

엘리먼트에 제공할 안정적인 ID(키)가 없다면 인덱스 번호를 마지막 수단으로 사용할 수 있다.

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

하지만 아이템 순서가 변경될 우려가 있을 경우, 가급적 아이템 인덱스를 키로 사용하지 않는 것이 낫다. 이로 인해서 성능 저하가 발생할 수 있고, 컴포넌트 State에 문제가 발생할 수 있다. 만약 리스트에 키를 지정하지 않는다면 리액트는 기본적으로 인덱스를 키로 지정한다.

## 키로 컴포넌트 추출하기

만약 ListItem의 컴포넌트를 추출하는 경우에 ListItem의 \<li> 엘리먼트가 아니라 배열의 <ListItem /> 엘리먼트에서 키를 참조해야 한다.

**잘못된 사용법 예시**

```js
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**옳은 예시**

```js
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## 키는 유일한 값이어야 한다.

배열 내에서 사용되는 키는 형제들간에 유일한 값이어야 한다. 전역적으로 유일할 필요는 없다. 즉, 다른 배열에서는 같은 키를 사용할 수 있다.

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

키는 리액트에 전달되지만 컴포넌트에 전달되지는 않는다. 컴포넌트에 키와 동일한 값을 사용하고 싶다면 다른 이름의 prop으로 전달해야 한다.

```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

위 예시에서 Post 컴포넌트는 key를 읽을 순 없지만 id는 사용할 수 있다.

## JSX내부에 map 함수 사용하기

위 예제에서는 별도의 listItems 변수를 생성하고 이 변수를 JSX에 포함했다.

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX는 중괄호안에 어떤 표현식도 포함할 수 있다.

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

