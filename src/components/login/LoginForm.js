import React from "react";
import { Field, reduxForm } from "redux-form";
import { View, Touchable, Text, FormInput, Spinner } from "../common";

class LoginForm extends React.PureComponent {
  render() {
    return (
      <View className="mh15">
        <Field
          name="emailOrPhone"
          placeholder="Email"
          component={FormInput}
          type="email-address"
          light
        />
        <Field
          name="password"
          placeholder="Password"
          component={FormInput}
          type="password"
          light
        />
        <Touchable
          onPress={() => {}}
          className="btn-complementary rounded m15 expand"
        >
          <Text className="primary large bold">Sign In</Text>
        </Touchable>
      </View>
    );
  }
}

export default reduxForm({
  form: "LoginForm"
})(LoginForm);
