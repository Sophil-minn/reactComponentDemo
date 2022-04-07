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
// 为什么不是界面上like的实时状态？
// 当我们更改状态的时候，React会重新渲染组件，每次的渲染都会拿到独立的like值，并重新定义个handleAlertClick函数，
// 每个handleAlertClick函数体里的like值也是它自己的，所以当like为6时，点击alert，触发了handleAlertClick，
// 此时的like是6，哪怕后面继续更改like到10，但alert时的like已经定下来了。
const LikeButton = () => {
  const [like, setLike] = useState(0)
  function handleAlertClick() {
      setTimeout(() => {
          alert(`you clicked on ${like}`) 
          //形成闭包，所以弹出来的是当时触发函数时的like值
      }, 3000)
  }
  return (
      <>
          <button onClick={() => setLike(like + 1)}>{like}赞</button>
          <button onClick={handleAlertClick}>Alert</button>
      </>
  )
}
// 采用全局变量
// 由于like变量是定义在组件外，所以不同渲染间是可以共用该变量,所以3秒后获取的like值就是最新的like值
// 该示例同时也说明，非state变量不会引起重新render
let like = 0;
const LikeButton2 = () => {
  function handleAlertClick() {
    setTimeout(() => {
      alert(`you clicked on ${like}`);
    }, 3000);
  }
  return (
    <>
      LikeButton2 采用全局变量
      <button
        onClick={() => {
          like = ++like;
        }}
      >
        {like}赞
      </button>
      <button onClick={handleAlertClick}>Alert</button>
    </>
  );
};

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
      <LikeButton />
      <LikeButton2 />
    </div>
  );
}

export default Index;
