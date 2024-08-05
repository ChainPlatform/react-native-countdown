# React Native Count Down
react-native-count-down is a React Native library that provides a CountDown component that renders timer count down for react-native and react-native-web.

<a href="https://npmjs.com/package/react-native-count-down">
  <img src="https://img.shields.io/npm/v/react-native-count-down.svg"></img>
  <img src="https://img.shields.io/npm/dt/react-native-count-down.svg"></img>
</a>
<a href="https://twitter.com/intent/follow?screen_name=doansan"><img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan"></img></a>

### Install
```
npm install react-native-count-down --save
```
or
```
yarn add react-native-count-down
```


### Usage

```js
import React from 'react';
import {StyleSheet} from 'react-native';
import CountDown from 'react-native-count-down';

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