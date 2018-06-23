import React from 'react';
import Switch from './Switch';

class SwitchInput extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <Switch value={!!props.input.value} onChange={props.input.onChange} />
    );
  }
}

export default SwitchInputR;
