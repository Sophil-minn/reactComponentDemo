import React, { Component } from 'react'
import {Motion, spring, presets} from 'react-motion'
import './index.css';

// 相比较react-transition-group，用react-motion进行动画的编写显得要直观很多，写法类似这样

// <Motion defaultStyle={{left: 0}} style={{left: spring(10)}}>
//   {interpolatingStyle => <div style={interpolatingStyle} />}
// </Motion>
// 指定一个初始style(defaultStyle)，然后赋值一个目标style(style)，中间每帧都会由react-motion计算出对应的style，
// 用户只管使用生成的style(interpolatingStyle)，不用关心物理效果的实现，动画中断的处理，一切事情都交给react-motion




class Test1 extends Component {
  state = {
    left: 0
  }

  clickHandler() {
    let targetX = 0
    if(this.state.left === 0) {
      targetX = 200
    } else {
      targetX = 0
    }

    this.setState({
      left: targetX
    })
  }

  componentDidMount() {
    this.clickHandler()
  }

  render() {
  return (
    <div>
      <Motion style={{x: spring(this.state.left, presets.wobbly)}}>
          {interpolatingStyle => {
            // debugger
            return (
              <div style={{transform: `translateX(${interpolatingStyle.x}px)`}} className='box'></div>
            )
          }}
        </Motion>
        <button onClick={this.clickHandler.bind(this)}>run</button>
    </div>
  )
}
}

export default Test1;