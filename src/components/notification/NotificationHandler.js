import React from 'react';
import { Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import { NotificationActions } from '../../actions';

class NotificationHandler extends React.PureComponent {

  /*componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }*/

  componentWillMount() {
    console.log('Setting up Notification Handlers');
    this.props.getNotifications();
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', this.onNotificationReceived.bind(this));
    OneSignal.addEventListener('opened', this.onNotificationOpened.bind(this));
   // OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds.bind(this));
    OneSignal.configure();  // add this to trigger `ids` event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onNotificationReceived);
    OneSignal.removeEventListener('opened', this.onNotificationOpened);
   // OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onNotificationReceived = notification => {
    console.log('on Notification received', { notification });
    this.props.getNotifications();
  };

  onNotificationOpened = openResult => {
    console.log('on Notification Opened', { openResult });
  };

  /*onRegistered = notifData => {
    console.log('On registered', notifData);
  };*/

  onIds = ({ pushToken, userId }) => {
    console.log('On Ids', { pushToken, userId });
    this.props.registerDeviceForNotifications({
      pushToken,
      userId,
      deviceType: Platform.OS,
    });
  };

  render() {
    return null;
  }
}

export default connect(null, { ...NotificationActions })(NotificationHandler);
