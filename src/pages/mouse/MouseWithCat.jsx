import React, { Component } from 'react';

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.1.0.1239.1239.180%2F6e9256ddly8fldcoe869lj20yi0yfmzg.jpg&refer=http%3A%2F%2Ftvax1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651562984&t=431f86f5f765a6d277cae401e9e3772f" style={{ position: 'fixed', left: mouse.x, top: mouse.y }} alt="img" />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 如果你出于某种原因真的想要 HOC，那么你可以轻松实现
// 使用具有 render prop 的普通组件创建一个！
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}

class MouseWithCat extends Component {
  render() {
    const WithMouse = withMouse(Cat);
    return (
      <div>
        <h1>移动鼠标!</h1>
        <WithMouse />
        
        {/* <Mouse render={
          // mouse => ( <Cat mouse={mouse} />)
          mouse => {
            console.log(mouse, 'mouse');
            return ( <Cat mouse={mouse} />);
          }
        }/> */}
      </div>
    );
  }
}

export default MouseWithCat;