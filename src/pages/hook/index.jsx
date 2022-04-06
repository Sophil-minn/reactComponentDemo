import React, { useState, memo, useMemo, useCallback, useEffect, useRef } from 'react';

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
    <div style={{marginBottom: '20px'}}>当前时间: {date.getHours()}: {date.getMinutes()}: {date.getSeconds()}</div>
  )
});
const Child4 = memo((props) => {
  const date = new Date();
  console.log('i am 第4个 child', props);
  // 有props 但是没有接收，组件依然会渲染
  return (
    // <div>i am child</div>
    <div style={{marginBottom: '20px'}}>当前时间: {date.getHours()}: {date.getMinutes()}: {date.getSeconds()}</div>
  )
});
const Child5 = memo(() => {
  const date = new Date();
  // console.log('i am 第5个 child', props);
  // 有props 但是没有接收，组件依然会渲染 useMemo后不会渲染
  return (
    // <div>i am child</div>
    <div style={{marginBottom: '20px'}}>当前时间: {date.getHours()}: {date.getMinutes()}: {date.getSeconds()}</div>
  )
});
const Child6 = memo(() => {
  const date = new Date();
  // console.log('i am 第5个 child', props);
  // 有props 但是没有接收，组件依然会渲染 useMemo后不会渲染
  return (
    <>
      <div>i am第6个 child</div>
      <div style={{marginBottom: '20px'}}>当前时间: {date.getHours()}: {date.getMinutes()}: {date.getSeconds()}</div>
    </>
    )
});

// <Child clickTimeCount={timeOption}/> 重点修改这里
const Child7 = memo((props) => {
  console.log('i am 第7个  child');
  return (
    <>
    <input type="text" onChange={props.onChange} />
    </>
  )
});
const Child8 = memo((props) => {
  console.log('i am 第8个  child');
  return (
    <>
    <input type="text" onChange={props.onChange} />
    </>
  )
});


const Index = () => {
  const [num, setNum] = useState(0);
  const [clickTimeCount, setIimeClickCount] = useState(0);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
 
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleChange2 = useCallback((e) => {
    setText2(e.target.value);
  }, []);
  const timeOption = {
    clickTimeCount
  }

  const timeOption2 = useMemo( 
    () => {
      return {
        clickTimeCount
      }
    },
    [clickTimeCount]
  )
  const timeOption3 = useMemo( 
    () => {
      return clickTimeCount;
    },
    [clickTimeCount]
  )

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
      child4 副本
      <Child4 clickTimeCount={timeOption} />
      child5 副本 2 useMemo的作用，可以正确看出值的更新。缓存一些变量。在不需要变化的时候，去读取缓存。
      <Child5 clickTimeCount={timeOption2} />
      <Child6 clickTimeCount={timeOption3} />

      <div>text: {text}</div>
      <Child7  onChange={handleChange}/>
      <div style={{padding: '10px'}}>
      每次输入内容，setText就会执行，这样就会导致父组件进行更新，handleChange也被认为是一个新的，所以导致子组件进行了刷新，但是想想，子组件并不需要这种更新。这个时候需要用useCallback 
      </div>
      <div>text2: {text2}</div>
      <Child8 onChange={handleChange2}/>
    </div>
  );
}

export default Index;
