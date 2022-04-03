import React from 'react';
import { Button } from '@alifd/next';

function MyDialog() {
  return (
    <div>MyDialog</div>
  )
}

// 参考例子 fusion Dialog
export default class DialogDemo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      visible: false
    };
    this.onOpen = () => {
      this.setState({
        visible: true
      });
    };
    this.onClose = e => {
      console.log(e.triggerType);
      this.setState({
        visible: false
      });
    };
  }
  render() {
    return (
    <div>
      <Button onClick={this.onOpen} type="primary">
        Open dialog
      </Button>
      {/* <Dialog
        v2
        title="Welcome to Alibaba.com"
        visible={this.state.visible}
        onOk={this.onClose}
        onClose={this.onClose}
      >
        <p>Start your business here by searching a popular product</p>
      </Dialog> */}
      <MyDialog
      
      />
    </div>)
  }
}