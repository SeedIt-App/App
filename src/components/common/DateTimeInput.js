import React from 'react';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Touchable, Text, View } from './';

class DateTimeInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pickerVisible: false,
    };
  }

  togglePicker = () => {
    if (!this.props.readOnly) {
      this.setState({ pickerVisible: !this.state.pickerVisible });
    }
  };

  confirm = value => {
    if (this.props.onChangeCallback) {
      this.props.onChangeCallback(value);
    }
    this.props.input.onChange(value);
    this.togglePicker();
  };

  render() {
    const { props } = this;
    const format = props.mode === 'date' ? 'MM/DD/YYYY' : 'hh:mm a';
    let { value } = props.input;
    if (!value) {
      value = new Date();
    } else if (typeof props.input.value === 'string') {
      value = new Date(props.input.value);
    }

    return (
      <Touchable className="flex1 j-end mr10 ml10" onPress={this.togglePicker}>
        <View className="w-1-1 border-bot">
          <Text className="darkGrey t-left">
            {moment(value).format(format)}
          </Text>
          <DateTimePicker
            isVisible={this.state.pickerVisible}
            onConfirm={this.confirm}
            onCancel={this.togglePicker}
            mode={props.mode}
            date={value}
          />
        </View>
      </Touchable>
    );
  }
}

export default DateTimeInput;
