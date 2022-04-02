import React, { PureComponent } from 'react';

class A extends PureComponent {
  render() {
    return (
      <div>
        <div className='header'>我是A组件的标题部分</div>
        <div className='content'>
          内容区域
        </div>
      </div>
    )
  }
}

export default A;