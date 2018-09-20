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
import moment from 'moment';

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

  componentWillReceiveProps(nextProps) {
    if(nextProps.notificationError){
      Toast.show(nextProps.notificationError , {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor : '#585858',
      });
    } 
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { allNotification, notificationStatus ,notificationError} = this.props;
    return (
      <View className="screen">
        <Header title="Notifications" back navigation={this.props.navigation} />
        <ScrollView>
          <View className="f-column">
            {notificationStatus === 'SUCCESS' &&
            allNotification.length > 0 && 
              allNotification.map(value => (
                <View className="f-row p5 mr10 j-start">
                  <View>
                    {value.fromUser.picture ? 
                      (<Image
                        className="med_thumb m10"
                        source={{uri : value.fromUser.picture}}
                        resizeMode="cover"
                      />)
                      : (<Image
                        className="med_thumb m10"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="cover"
                      />)
                    }
                  </View>
                  <View className="f-column  w-2-1 ">
                    <View className="f-column">
                      <Text className="lightGrey medium bold t-left">
                        {value.title}
                      </Text>
                      <Text className="lightGrey medium t-left">
                        {value.message}
                      </Text>
                    </View>
                  </View>
                  <View className="f-row pull-right f-both ">
                    <Text className=" mt20 marginLeft20 darkgrey  small t-center">
                      {moment(value.createdAt)
                      .format('MM/DD/YY')
                      .toString()}
                    </Text>  
                  </View>
                </View>
              )
            )}     
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { notifications, notificationStatus,notificationError } = state.notifications;
  const allNotification = notifications && notifications.notifications;
  return {
    user,
    allNotification,
    notificationStatus,
    notificationError,
  };
}
export default connect(mapStateToProps, {
  ...UserActions, ...NotificationActions,
})(Notifications);
