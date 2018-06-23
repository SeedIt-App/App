import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Image,
  Footer,
  ScrollView,
  Switch,
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import idx from 'idx';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import ImagePicker from 'react-native-image-picker';

class CreatePost extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      userNameFlag : false,
      message:''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createPostErrorStatus) {
      Toast.show(nextProps.createPostErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  }

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
  }

  createNewPost = ()=>{
    if(this.state.message !== ''){
      const body ={
        text : this.state.message,
        image : []
      }
      this.props.createPost(body)
    }else { 
      Toast.show('Please write the text for post', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

  }

   selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.uploadImages(response.uri)
      }
    });
  }

  uploadImages =(imgPath)=> {
    let body = new FormData();
    const ip_addr= URL.IMAGE_URL
      body.append('file', {uri: imgPath, name: 'photo.png',type: 'image/png'});
      body.append('Content-Type', 'image/png');
      fetch('https://seedit-api.herokuapp.com/' + 'file/upload', {
        method : 'POST',
        body: body
      }).then((response) => { 
        return response.json() 
        }).then((responseJson) => {
        if(responseJson.status ===  'success'){
          console.log(responseJson, 'responseJson')
          let responseData = responseJson.upload.path
          let post_id = responseJson.upload.id
          this.setState({
            image: ip_addr+responseData.split("/var/www/html/")[1],
            img_Id : post_id
          });
          //console.log(this.state.img_Id, 'this.state.image')
        }
      })
    .catch((error) => {
      console.log(error, 'error')
    })
  }

  render() {
    const { user ,createPostRequestStatus , createPostErrorStatus} = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header title="Create a Post" back navigation={this.props.navigation} />
        <ScrollView>
          <View>
            <View className="f-column bg-transparent  space-between">
              <View className="mt10">
                <View className="f-row p5 mr20">
                  <View className="f-row f-both m20">
                    <Image
                      className="med_thumb m10"
                      source={require('../images/avatars/Abbott.png')}
                      resizeMode="cover"
                    />
                  </View>
                  <View className="f-column j-start mt10 ">
                    <View className="f-row">
                      {this.state.userNameFlag ?
                        <Text className="black bold large t-center">
                          {this.props.user ? idx(this.props.user, _ => _.userName): 'User name'}
                        </Text>
                        : null
                      }
                    </View>
                    <Text className="black medium t-center">
                        {this.props.user ? idx(this.props.user.address, _ => _.city) : 'Location'}
                    </Text>
                  </View>
                  <View className="f-column pull-right mt10 f-both m20">
                    <Text className="black medium t-center">
                      Show Username
                    </Text>
                    <Switch
                      value={this.state.userNameFlag}
                      onChange={this.ShowUserName}
                    />
                  </View>
                </View>
                <View className="dividerGrey"/>
                <View className="dividerGrey"/>
              </View>
              <View className="m10 ">
                <View className="f-center f-row">
                  <View>
                    <TextInput
                      style={{ color: 'black', fontSize: 16, width : 250}}
                      value={this.state.message}
                      placeholder="Type your idea here"
                      placeholderTextColor='black'
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      multiline
                      onChangeText={message => this.setState({ message })}
                    />
                  </View>
                </View>  
              </View>
            </View>
          </View>
        </ScrollView>
          <View className="dividerGrey"/>
          <View className="dividerGrey"/>
          <View className="dividerGrey"/>
        <View className="m10 ">
          <View className="f-row f-both   w-1-0  space-between">
            <View className="p5">
              <Touchable onPress={this.goToLogin}>
                <View className="f-row f-both m20">
                  <Touchable className="p5" onPress={this.selectPhotoTapped.bind(this)}>
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/camera.png')}
                      resizeMode="cover"
                    />
                  </Touchable>
                </View>
              </Touchable>
            </View>
            <Touchable className="p5" onPress={this.createNewPost}>
              <Text className="text blue bold">Post</Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const {user} = state.auth;
  console.log(user,'*******************')
  const { createPostRequestStatus, createPostErrorStatus } = state.post;
  return {
    token,
    user,
  };
}
export default connect(mapStateToProps, { ...AuthActions, ...PostActions })(CreatePost);
