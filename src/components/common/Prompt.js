import React from 'react';
import NativePrompt from 'rn-prompt';

class Prompt extends React.PureComponent {
  render() {
    return <NativePrompt {...this.props} />;
  }
}

export default Prompt;
