import React, { Component } from 'react'
import {Motion, spring, presets, StaggeredMotion, TransitionMotion } from 'react-motion'
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
class Test2 extends Component {
  state = {
    length: 10
  }

  addLength() {
    let newLength
    if (this.state.length) {
      newLength = 0
    } else {
      newLength = 10
    }

    this.setState({
      length: newLength
    })
  }

  render() {
    let boxes = []
    for (let i = 0, len = this.state.length; i < len; i++) {
      boxes.push({
        scale: 0
      })
    }

    return (
      <div>
        <div>
          {this.state.length > 0 ? (
            <StaggeredMotion defaultStyles={boxes}
              styles={prevStyles => prevStyles.map((item, i) => {
                return i === 0
                  ? { scale: spring(1, { ...presets.noWobble }) }
                  : prevStyles[i - 1]
              })}>
              {interpolatingStyles =>
                <div>
                  {interpolatingStyles.map((item, i) => {
                    return (
                      <div className="box box2"
                        key={i}
                        style={{
                          transform: `scale(${item.scale}, ${item.scale})`
                        }}></div>
                    )
                  })}
                </div>
              }
            </StaggeredMotion>
          ) : null}
        </div>
        <button onClick={this.addLength.bind(this)}>run</button>
      </div>
    )
  }
}

class Test3 extends Component {
  state = {
    show: true
  }

  componentDidMount() {
    this.setState({
      show: false
    })
  }

  clickHandler() {
    this.setState({
      show: !this.state.show
    })
  }

  willEnter(styleThatEnter) {
    return { scale: 0 }
  }

  willLeave(styleThatLeft) {
    return { scale: spring(0) }
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler.bind(this)}>run</button>
        <TransitionMotion styles={this.state.show ? [{
          key: 'test',
          style: { scale: spring(1) }
        }] : []}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {inStyles => (
              inStyles[0] ? (
                <div className="box box2 box3"
                  key={inStyles[0].key}
                  style={{
                    transform: `scale(${inStyles[0].style.scale},${inStyles[0].style.scale})`
                  }}></div>
              ) : null
          )}
        </TransitionMotion>

      </div>
    )
  }

}

const Index = () => {
  return (
    <div>
      <Test1 />
      <Test2 />
      <Test3 />
      
    </div>
  );
}

export default Index;
