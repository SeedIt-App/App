import React from 'react';
import { Switch as NativeSwitch } from 'react-native';
import Colors from './colors';

class Switch extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <NativeSwitch
        value={props.value}
        onValueChange={props.onChange}
        onTintColor={Colors.darkBlue}
        tintColor={Colors.lightBlue}
        thumbTintColor={Colors.lgGrey}
      />
    );
  }
}

export default Switch;
