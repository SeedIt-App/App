import { StackNavigator } from 'react-navigation';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const ProfileNavigator = StackNavigator(
  {
    'Profile': {
      screen: Profile,
    },
    'EditProfile': {
      screen: EditProfile,
    },
    'ChangePassword': {
      screen: ChangePassword,
    },
  },
  {
    headerMode: 'none',
  },
);

export default ProfileNavigator;
