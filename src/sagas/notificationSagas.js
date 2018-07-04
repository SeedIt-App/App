import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import idx from 'idx';
import { NotificationActions } from '../actions';
import { GET, PUT, POST } from '../api';

function* getNotifications() {
  yield put(NotificationActions.getNotificationsRequest());
  try {
    const notificationsUrl = '/notifications?select=title,message';
    const { response } = yield call(GET, notificationsUrl);
    yield put(NotificationActions.getNotificationsSuccess({
      notifications : response.data
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(NotificationActions.getNotificationsFailure(msgError));
  }
}

//const getUser = state => state.auth.user;

//const getDeviceId = state => state.auth.deviceId;

/*function* registerDeviceForNotifications(action) {
  yield put(NotificationActions.registerDeviceForNotificationsRequest());
  try {
    //const { deviceId } = action.payload;
    const deviceId = yield select(getDeviceId);
    const user = yield select(getUser);
    // If we delete the token from either onesignal or database…this causes the issue. since its cached on phone
    // if (user.devices.indexOf(deviceId) >= 0) {
    //   return;
    // }
    const registerDeviceForNotificationsUrl = `/users/${user._id}/devices`;
    yield call(POST, registerDeviceForNotificationsUrl, {
      deviceId: action.payload.userId,
      deviceType: action.payload.deviceType,
    });
    yield put(NotificationActions.registerDeviceForNotificationsSuccess({
      deviceId: action.payload.userId,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(NotificationActions.registerDeviceForNotificationsFailure(msgError));
  }
}

function* deregisterDeviceForNotifications() {
  yield put(NotificationActions.deregisterDeviceForNotificationsRequest());
  try {
    const user = yield select(getUser);
    const deviceId = yield select(getDeviceId);
    const deregisterDeviceForNotificationsUrl = `/users/${user._id}/devices`;
    yield call(PUT, deregisterDeviceForNotificationsUrl, {
      deviceId,
    });
    yield put(NotificationActions.deregisterDeviceForNotificationsSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(NotificationActions.deregisterDeviceForNotificationsFailure(msgError));
  }
}
*/
export default function* authSagas() {
  yield all([
    fork(takeLatest, NotificationActions.GET_NOTIFICATIONS, getNotifications),
  ]);
 /* yield all([
    fork(
      takeLatest,
      NotificationActions.REGISTER_DEVICE_FOR_NOTIFICATIONS,
      registerDeviceForNotifications,
    ),
  ]);
  yield all([
    fork(
      takeLatest,
      NotificationActions.DEREGISTER_DEVICE_FOR_NOTIFICATIONS,
      deregisterDeviceForNotifications,
    ),
  ]);*/
}
