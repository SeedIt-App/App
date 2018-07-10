import { StackNavigator } from 'react-navigation';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import PublicProfile from './PublicProfile';

const ProfileNavigator = StackNavigator(
  {
    'Profile': {
      screen: Profile,
    },
    'PublicProfile': {
      screen: PublicProfile,
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
