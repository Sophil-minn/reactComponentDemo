import React from 'react';
// import MouseWithCat from './MouseWithCat';
import MouseWithCat2 from './MouseWithCat2';

// <Mouse> 组件封装了我们需要的行为...
// class Mouse extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.state = { x: 0, y: 0 };
//   }

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

//         {/* ...但我们如何渲染 <p> 以外的东西? */}
//         <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
//       </div>
//     );
//   }
// }

class MouseTracker extends React.Component {
  render() {
    return (
      <>
        {/* <h1>移动鼠标!</h1> */}
        {/* <Mouse /> */}
        {/* <MouseWithCat /> */}
        <MouseWithCat2 />
      </>
    );
  }
}

export default MouseTracker;