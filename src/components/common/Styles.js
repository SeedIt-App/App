import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from './colors';

export const { width, height } = Dimensions.get('window');

const margins = {
  m3: {
    margin: 3,
  },
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m15: {
    margin: 15,
  },
  mv5: {
    marginVertical: 5,
  },
  mv7: {
    marginVertical: 7,
  },
  mv10: {
    marginVertical: 10,
  },
  mv15: {
    marginVertical: 15,
  },
  mv25: {
    marginVertical: 30,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh15: {
    marginHorizontal: 15,
  },
  mh17: {
    marginHorizontal: 17,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh25: {
    marginHorizontal: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb25: {
    marginBottom: 25,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr20: {
    marginRight: 20,
  },
  mr25: {
    marginRight: 25,
  },
  mr30: {
    marginRight: 35,
  },
  ml10: {
    marginLeft: 10,
  },
  marginLeft20: {
    marginLeft: -20,
  },
  ml3: {
    marginLeft: 3,
  },
  ml5: {
    marginLeft: 5,
  },
  ml15: {
    marginLeft: 15,
  },
  mt5: {
    marginTop: 5,
  },
  mt7: {
    marginTop: 8,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt12: {
    marginTop: 12,
  },
  mt20: {
    marginTop: 20,
  },
  mt25: {
    marginTop: 25,
  },
  mt50: {
    marginTop: 50,
  },
  marginTop10: {
    marginTop: -10,
  },
  marginTop15: {
    marginTop: -15,
  },
  marginTop20: {
    marginTop: -25,
  },
};

const paddings = {
  p3: {
    padding: 3,
  },
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  p30: {
    padding: 30,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv15: {
    paddingVertical: 15,
  },
  ph5: {
    paddingHorizontal: 5,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
};

const absolutes = {
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  'pull-left': {
    position: 'absolute',
    left: 0,
  },
  'pull-right': {
    position: 'absolute',
    right: 0,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
};

const bgs = {
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgBlack: {
    backgroundColor: Colors.black,
  },
  bgLightGrey: {
    backgroundColor: Colors.lightGrey,
  },
  bgGrey: {
    backgroundColor: Colors.grey,
  },
  bgLgGrey: {
    backgroundColor: Colors.lgGrey,
  },
  'bg-primary': {
    backgroundColor: Colors.primary,
  },
  'bg-header': {
    backgroundColor: Colors.headerBg,
  },
  'bg-transparent': {
    backgroundColor: 'transparent',
  },
  'bg-blue': {
    backgroundColor: Colors.lightBlue,
  },
  'bg-lightBlue': {
    backgroundColor: Colors.lgBlue,
  },
  'bg-Field': {
    backgroundColor: Colors.lgBlue,
  },
};

const images = {
  dashboardIcon: {
    height: 150,
    width: 150,
  },
  drawerIcon: {
    height: 20,
    width: 20,
  },
  thumbImage: {
    height: 120,
    width: 150,
  },
  dashboardThumbImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 6,
  },
  badgeView: {
    height: 40,
    width: 40,
    borderRadius: 10,
    borderColor: Colors.darkgrey,
    borderWidth: 1,
    backgroundColor: Colors.darkgrey,
  },
  videoView: {
    height: 55,
    width: 55,
    borderRadius: 1,
    borderColor: Colors.darkgrey,
    borderWidth: 1,
  },
  Pro_Image: {
    height: 25,
    width: 50,
    borderRadius: 2,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  multiImage: {
    height: 80,
    width: 80,
    borderRadius: 65,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#5FB404',
  },
  notification: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'red',
  },
};

const flex = {
  flex: {
    flexGrow: 1,
  },
  flexWrap : {
    flexWrap: 'wrap',
  },
  'f-row': {
    flexDirection: 'row',
  },
  'f-column': {
    flexDirection: 'column',
  },
  'f-center': {
    alignItems: 'center',
  },
  'f-middle': {
    justifyContent: 'center',
  },
  'f-end': {
    alignItems: 'flex-end',
  },
  'f-both': {
    alignItems: 'center',
    justifyContent: 'center',
  },
  'f-stretch': {
    alignItems: 'stretch',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
  'space-around': {
    justifyContent: 'space-around',
  },
  'j-end': {
    justifyContent: 'flex-end',
  },
  'j-start': {
    justifyContent: 'flex-start',
  },
  expand: {
    alignSelf: 'stretch',
  },
  'self-end': {
    alignSelf: 'flex-end',
  },
};

export default StyleSheet.create({
  ...margins,
  ...paddings,
  ...absolutes,
  ...flex,
  ...bgs,
  ...images,
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screen_transparent: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  
  'wh-1-1': {
    height: '100%',
    width: '100%',
  },
  'w-1-1': {
    width: '100%',
  },
  'w-1-0': {
    width: '90%',
  },
  'w-1-2': {
    width: '50%',
  },
  'w-2-1': {
    width: '70%',
  },
  'w-1-3': {
    width: '33.33%',
  },
  'w-2-5': {
    width: '40%',
  },
  'h-1-1': {
    height: '100%',
  },
  'h-2-1': {
    height: '75%',
  },
  'h-2-3': {
    height: '80%',
  },
  'h-1-2': {
    height: '50%',
  },
  'h-2-5': {
    height: '40%',
  },
  'h-1-3': {
    height: '33.3%',
  },
  'h-1-5': {
    height: '20%',
  },
  h20 : {
    height: 20,
  },
  h38: {
    height: 36,
  },
  h50: {
    height: 50,
  },
  h65: {
    height: 65,
  },
  dev: {
    backgroundColor: Colors.error,
  },
  white: {
    color: Colors.white,
  },
  primary: {
    color: Colors.primary,
  },
  date: {
    fontSize: 13,
    color: 'black',
  },
  lightBorder: {
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
  },
  whiteBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignSelf: 'stretch',
  },
  sectionHeader: {
    ...paddings.ph10,
    ...paddings.pv15,
    ...bgs.bgLightGrey,
  },
  actionRow: {
    flexDirection: 'row',
    flex: 1,
    ...paddings.ph10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  divider: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: Colors.white,
    ...margins.mv5,
  },
  dividerHead: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: Colors.white,
  },
  dividerBlack: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: Colors.black,
  },
  dividerVertrical: {
    alignSelf: 'stretch',
    height: 25,
    width: 1,
    backgroundColor: Colors.white,
  },
  dividerGrey: {
    alignSelf: 'stretch',
    height: 0.6,
    backgroundColor: "#DCDCDC",
  },
  'abs-cover': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  'border-light': {
    borderColor: Colors.white,
  },
  'border-bottom': {
    borderBottomWidth: 0.5,
  },
  'drawer-avatar': {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  'flat-list': {
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  inputField: {
    height: 45,
    width: 280,
  },
  editField: {
    height: 40,
    borderColor: Colors.headerBg,
    borderWidth: 1,
  },

  changePwdEditField: {
    height: 40,
    borderColor: Colors.vlblue,
    borderWidth: 1,
  },
  formInputField: {
    height: 45,
    width: 280,
  },
  textArea: {
    borderColor: Colors.headerBg,
    borderWidth: 1,
    height: 60,
  },
  textField: {
    height: 60,
    width: 280,
    backgroundColor: Colors.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  showPassword: {
    height: 50,
    width: 70,
    marginTop : -5,
    backgroundColor: Colors.vlblue,
  },
  showPasswordAuth: {
    height: 50,
    width: 70,
    backgroundColor: '#D8F6F7',
  },
  submitField: {
    height: 40,
    width: 120,
    backgroundColor: Colors.headerBg,
  },
  submitFieldPwd: {
    height: 40,
    width: 150,
    backgroundColor: Colors.headerBg,
  },
  'hamburger-menu': {
    height: 40,
    marginLeft: -20,
    backgroundColor: Colors.transparent,
  },
  addIcon: {
    height: 25,
    width: 25,
  },
  statusChecker: {
    height: 15,
    width: 15,
  },
  textInput: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInputField: {
    color: 'grey',
    fontSize: 20,
  },
  'app-container': {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopColor: Colors.lgGrey,
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 68,
    alignItems: 'center',
  },
  overlay : {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 80,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
  },
  overlayCancel : {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  shadowBox : {
    paddingTop : 8,
    paddingLeft : 8,
    paddingRight : 8,
    paddingBottom : 8,
    borderColor : 'transparent',
    backgroundColor : Colors.lgGrey
  },
  search_input : {
    paddingTop : 5,
    paddingLeft : 5,
    paddingRight : 5,
    backgroundColor : Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white
  }
});
