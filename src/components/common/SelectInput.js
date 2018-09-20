import React from 'react';
import ModalSelector from 'react-native-modal-selector';
import Colors from './colors';
import View from './View';

const Styles = {
  rootStyle: {
    flex: 1,
  },
  selectStyles: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop : 10,
  },
  textStyle: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  light: {
    height : 50,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#6dd0f4',
    borderBottomColor: '#6dd0f4',
    borderBottomWidth: 2,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    backgroundColor: '#fff',
  },
  lightTextStyle: {
    color: Colors.black,
    padding: 5
  },
};

class SelectInput extends React.PureComponent {
  handleChange = selection => {
    if (this.props.input) {
      this.props.input.onChange(selection.key);
    }
    if (this.props.onChangeCb) {
      this.props.onChangeCb(selection.value);
    }
  };

  render() {
    const { props } = this;
    let { selectStyles, textStyle } = Styles;
    if (props.light) {
      selectStyles = { ...selectStyles, ...Styles.light };
      textStyle = { ...textStyle, ...Styles.lightTextStyle };
    }
    if (props.selectStyles) {
      selectStyles = { ...selectStyles, ...props.selectStyles };
    }
    if (props.textStyle) {
      textStyle = { ...textStyle, ...props.textStyle };
    }
    let initValue;
    if (props.initValue) {
      initValue = props.initValue;
    } else if (props.input) {
      initValue = props.input.value || props.placeholder;
    } else {
      initValue = props.placeholder;
    }
    return (
      <View className="flex">
        <ModalSelector
          style={Styles.rootStyle}
          selectTextStyle={textStyle}
          selectStyle={selectStyles}
          data={options}
          initValue={initValue}
          onChange={this.handleChange}
          disabled={props.readOnly}
        />
      </View>
    );
  }
}

export default SelectInput;
