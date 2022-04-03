import React, { Component } from 'react';

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.1.0.1239.1239.180%2F6e9256ddly8fldcoe869lj20yi0yfmzg.jpg&refer=http%3A%2F%2Ftvax1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651562984&t=431f86f5f765a6d277cae401e9e3772f" style={{ position: 'fixed', left: mouse.x, top: mouse.y }} alt="img" />
    );
  }
}

// class MouseWithCat extends React.Component {
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

//         {/*
//           我们可以在这里换掉 <p> 的 <Cat>   ......
//           但是接着我们需要创建一个单独的 <MouseWithSomethingElse>
//           每次我们需要使用它时，<MouseWithCat> 是不是真的可以重复使用.
//         */}
//         <Cat mouse={this.state} />
//       </div>
//     );
//   }
// }

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

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseWithCat extends Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={
          mouse => ( <Cat mouse={mouse} />)
          // mouse => {
          //   console.log(mouse, 'mouse');
          //   return ( <Cat mouse={mouse} />);
          // }
        }/>
      </div>
    );
  }
}

export default MouseWithCat;