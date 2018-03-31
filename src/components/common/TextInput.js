import React from 'react';
import { FormInput } from 'react-native-elements';
import Colors from './colors';
import View from './View';

const Styles = {
  textInputStyle: {
    borderWidth: 1,
    borderBottomColor: Colors.black,
  },
  inputStyle: {
    alignSelf: 'stretch',
    width: '100%',
    color: Colors.black,
  },
  textInputLightStyle: {
    borderWidth: 1,
    borderBottomColor: Colors.white,
  },
  inputLightStyle: {
    alignSelf: 'stretch',
    width: '100%',
    color: Colors.white,
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
};

const TextInput = props => {
  const onChangeText = text => {
    if (!props.readOnly) {
      props.onChange(text);
    }
  };
  const keyboardType =
    !props.type || props.type === 'password' ? 'default' : props.type;
  let inputProps = {
    inputStyle: Styles.inputStyle,
    textInputStyle: Styles.textInputStyle,
    underlineColorAndroid: Colors.black,
    selectionColor: Colors.black,
  };
  if (props.light) {
    inputProps = {
      inputStyle: Styles.inputLightStyle,
      textInputStyle: Styles.textInputLightStyle,
      underlineColorAndroid: Colors.white,
      selectionColor: Colors.white,
      placeholderTextColor: Colors.white,
    };
  }
  return (
    <View className="flex">
      <FormInput
        containerStyle={Styles.containerStyle}
        inputStyle={inputProps.inputStyle}
        style={inputProps.textInputStyle}
        underlineColorAndroid={inputProps.underlineColorAndroid}
        selectionColor={inputProps.underlineColorAndroid}
        placeholderTextColor={inputProps.placeholderTextColor}
        keyboardType={keyboardType}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        editable={props.editable}
        autoCapitalize={props.autoCapitalize || 'none'}
        autoCorrect={false}
        secureTextEntry={props.type === 'password'}
        onChangeText={onChangeText}
        value={props.value}
      />
    </View>
  );
};

export default TextInput;
