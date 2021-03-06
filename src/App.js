import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyled } from './style';
import { GlobalIconFont } from './statics/iconfont/iconfont';
import { Provider } from 'react-redux';
import Routers from './router';
import store from './store'
import '@alifd/next/dist/next.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <GlobalStyled />
          <GlobalIconFont />
          <BrowserRouter>
            <Routers />
            
          </BrowserRouter>
        </div >
      </Provider >
    )
  }
}
export default App;