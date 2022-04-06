import React, { useState, useEffect, useRef } from 'react';

function Form() {
  // 1. 使用变量名为 name 的 state
  const [name, setName] = useState('Mary');
 
  // 2. 使用 effect 以保存 form 操作
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });
 
 
  // 3. 使用变量名为 surname 的 state
  const [surname, setSurname] = useState('Poppins');
 
 
  // 4. 使用 effect 以更新标题
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });
 
 return (<div>{name} {surname}</div>)
  // ...
}
let tag = true;

function App() {
  const [num, setNum] = useState(0);

  // 只有初次渲染，才执行
  const [unusedNum] = useState(1);

  const [num2, setNum2] = useState(2);

  return (
    <div>
      <div>num: {num}</div>
      <div>
        <button onClick={() => setNum(num + 1)}>加 1</button>
        <button onClick={() => setNum(num - 1)}>减 1</button>
      </div>
      <hr />
      <div>num2: {num2}</div>
      <div>
        <button onClick={() => setNum2(num2 * 2)}>扩大一倍</button>
        <button onClick={() => setNum2(num2 / 2)}>缩小一倍</button>
      </div>
    </div>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}


// useState 的实现原理
/*
当调用 useState 的时候，会返回形如 (变量, 函数) 的一个元祖。并且 state 的初始值就是外部调用 useState 的时候，传入的参数。
理清楚了传参和返回值，再来看下 useState 还做了些什么。正如下面代码所示，当点击按钮的时候，执行setNum，状态 num 被更新，
并且 UI 视图更新。显然，useState 返回的用于更改状态的函数，自动调用了render方法来触发视图更新。 
*/
const Index = () => {
  const [num, setNum] = useState(0);
  const prevNum = usePrevious(num);
  return (
    <div>
      {/* <Form />
      <App />
      <div>num: {num}</div>
      <button onClick={() => setNum(num + 1)}>加 1</button> */}
      prevNum: {prevNum} current: {num} 
      <button onClick={() => setNum(num + 1)}>加 1</button>
      <Counter />
    </div>
  );
}

export default Index;
