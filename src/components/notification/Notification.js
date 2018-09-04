import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Header,
  ScrollView,
  Image,
  BackgroundImage,
  Colors,
  Icon,
  Touchable,
  Spinner,
} from '../common';
import { NotificationActions, UserActions } from '../../actions';

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFlagBorderColor: '#00DC07',
    };
  }

  componentWillMount() {
    this.props.getNotifications();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { allNotification, notificationStatus} = this.props;
    return (
      <View className="screen">
        <Header title="Notifications" back navigation={this.props.navigation} />
        <ScrollView>
          <View className="f-column">
            <View className="bg-transparent mt10 space-between">
              {notificationStatus === 'REQUESTING' &&
                <Spinner />}
              {notificationStatus === 'SUCCESS' &&
                allNotification.length === 0 && (
                <View className="flex f-both p10">
                  <Text className="darkGrey bold">There are no notifications for you.</Text>
                </View>
              )}
              {notificationStatus === 'SUCCESS' &&
                allNotification.length > 0 && 
                allNotification.map(value => (
                  <View className="f-column h50 f-both  w-1-1">   
                    <View className="f-both p5">
                      <Touchable >
                        <Text className="darkGrey bold">
                          {value.message}
                        </Text>
                      </Touchable>
                    </View>
                    <View className="dividerGrey" />
                  </View>
                ))  
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { notifications, notificationStatus } = state.notifications;
  const allNotification = notifications && notifications.notifications;
  return {
    user,
    allNotification,
    notificationStatus,
  };
}
export default connect(mapStateToProps, {
  ...UserActions, ...NotificationActions,
})(Notifications);
