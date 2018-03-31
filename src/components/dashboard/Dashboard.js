import React from 'react';
import { Text, View, Touchable } from '../common';

class Dashboard extends React.PureComponent {
    return (
      <View className="screen f-center f-middle">
        <Text className="heading">Dashboard</Text>
        <Touchable className="mv15" onPress={() => {}}>
          <Text>Dashboard</Text>
        </Touchable>
      </View>
    );
  }
}

export default Dashboard;
