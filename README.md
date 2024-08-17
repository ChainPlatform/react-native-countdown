# React Native Count Down
@chainplatform/countdown is a React Native library that provides a CountDown component that renders timer count down for react-native and react-native-web.


<p align="center">
  <a href="https://github.com/ChainPlatform/react-native-countdown/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/countdown">
    <img src="https://img.shields.io/npm/v/@chainplatform/countdown?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/countdown">
    <img src="https://img.shields.io/npm/dt/@chainplatform/countdown.svg"></img>
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/countdown">
    <img src="https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue"></img>
  </a>
  <a href="https://github.com/ChainPlatform/react-native-countdown/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=doansan">
    <img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan" />
  </a>
</p>

### Install
```
npm install @chainplatform/countdown --save
```
or
```
yarn add @chainplatform/countdown
```


### Usage

```js
import React from 'react';
import {StyleSheet} from 'react-native';
import CountDown from '@chainplatform/countdown';

class App extends React.Component {

  render() {
    return (
      <View style={{flex:1}}>
            <CountDown
                until={this.countTime}
                running={true}
                onFinish={() => {
                    this.setState({
                        count_finish: true
                    })
                }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: '', s: '' }}
                showSeparator
            />
      </View>
    );
  }
}
```