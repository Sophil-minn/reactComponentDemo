import React, { useState, memo, useEffect, useRef } from 'react';

function Child() {
  console.log('第一个子组件更新了');
  return (
      <div style={{margin: '20px'}}>第一个子组件</div>
  )
}
const  Child2 = memo(() => {
  /*
  发现不管点击多少次，只有第一次渲染的时候会打印，后面都不会再打印，因为memo里面没有接收任何props，所以会阻止他进行更新
  */
  console.log('子组件2更新了');
  return (
      <div style={{margin: '20px'}}>第child2 组件</div>
  )
});

const Child3 = memo((props) => {
  const date = new Date();
  console.log('i am 第3个 child', props);
  // 有props 但是没有接收，组件依然会渲染
  return (
    // <div>i am child</div>
    <div>当前时间: {date.getHours()}: {date.getMinutes()}: {date.getSeconds()}</div>
  )
});


const Index = () => {
  const [num, setNum] = useState(0);

  const [clickTimeCount, setIimeClickCount] = useState(0);
  return (
    <div style={{padding: '20px'}}>
      <div style={{margin: '20px'}}>{num}</div>
      <button onClick={() => setNum(num + 1)}>加 1</button>
      <Child />
      <Child2 />
      <button onClick={()=>{
        setIimeClickCount(clickTimeCount + 1)
      }}>get current time</button>
      <Child3 clickTimeCount={clickTimeCount} />
    </div>
  );
}

export default Index;
