import React from "react";
import { Touchable, Icon } from "./";

export default props => (
  <Touchable onPress={props.onChange}>
    <Icon name={props.value ? "checkbox-marked" : "checkbox-blank-outline"} />
  </Touchable>
);
