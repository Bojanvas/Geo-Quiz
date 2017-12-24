/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  View,
  Picker,
  TouchableHighlight,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob';
import {countries} from './country.js';

import PushNotification from 'react-native-push-notification';
import Notification from './notification.js';

export default class Home extends Component {
       constructor(props){
         super(props);
         this.state ={
           dificult:1,
           game:false,
           count:countries,
           location:'none',
           //id:null,
           modalVisible : false,
           notif:'true',
         }
       }


      setModalVisible(visible) {
        if(this.state.location == 'none'){
          this.setState({modalVisible: true});
        }else{
          this.setState({modalVisible: false});
        }
      }
      
    static navigationOptions = {
    title: ' Geography Quiz || Test your knowledge',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},

      
  };
  
  componentDidMount(){
    // NOtifications
    AsyncStorage.getItem('notif').then((data)=>{
      if(data != null){
      this.setState({
        notif:data
      })
    }else{
       AsyncStorage.setItem('notif',"true");
    }
      this.checkNotif();
    })
    // ID
    // AsyncStorage.getItem('id').then((data)=>{
    //   if(data != null){
    //     this.setState({
    //       id:data
    //     })
    //   } else {
    //     id = this.generateId();
    //     console.log(id);
    //     AsyncStorage.setItem('id',id);
    //  }
    // })
   AsyncStorage.getItem('dificult').then((data)=>{
     if(data != null){
     this.setState({
       dificult:data
     })
   }else{
      AsyncStorage.setItem('dificult','1');
   }
   })
   AsyncStorage.getItem('location').then((data)=>{
    if(data != null){
    this.setState({
      location:data
    })
  }else{
     AsyncStorage.setItem('location','none');
  }
  this.setModalVisible(false);
  })
  }
  checkNotif() {
    //clear notfications first
    PushNotification.cancelAllLocalNotifications();
    if(this.state.notif == 'true'){
      //if notif is on show notification after one week
      PushNotification.localNotificationSchedule({
        title:"World geography",
        message: "How about one game? Test your knowledge", 
        date: new Date(Date.now() + (72 * 60 * 60 * 1000)), // in 3 days
        repeatType: 'week',
    });
    }
  }
  // generateId(){
  //   return Math.floor((Math.random() * 10) * 0x10000000)
  //   .toString(16)
  //   .substring(1);
  // }
  render(){
    var country = this.state.count;
    return (
      <View style={styles.container}>
        <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                <View style={{marginTop: 22,borderColor:'#000036',borderWidth:0.5,}}>
                    <View>
                      <Text style={styles.modal}>Choose your location:</Text>     
                    </View>
                </View>
                <View style={{flex:5,alignItems:'center',margin:50, }}>
                  <View style={{borderTopWidth:0.5,borderTopColor:'#33afd4',borderBottomWidth:0.5,borderBottomColor:'#33afd4',justifyContent: 'center'}}>
                  <Picker
                    style={{color:'#33afd4',width:200,marginTop:5,marginBottom:5,}}
                    selectedValue={this.state.location}
                    
                     onValueChange={(itemValue, itemIndex) =>{ console.log(itemValue), this.setState({location:itemValue}) }}>
                    {country.map(function(n,i){
                      return <Picker.Item  key={i} label={n.name} value={n.name} />
                    })}
                  </Picker>
                  </View>
                  <TouchableHighlight style={styles.butt} onPress={() => {
                    {/* this.addlocation(); */}
                    AsyncStorage.setItem('location',this.state.location)
                    this.setModalVisible(false)
                    }}>
                    <Text style ={{color:'white',textAlign:'center',fontSize:20}}>Save</Text>
                  </TouchableHighlight>
                </View>  
        </Modal>
        <Image source={require('../img/geo.png')} style={styles.backgroundImage}></Image>
        <View style={styles.image}>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('Game',{dificult:this.state.dificult});
          }} style={styles.buttons}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('Option',{location:this.state.location, notif:this.state.notif});
          }} style={styles.buttons}>Options</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('About');
          }} style={styles.buttons}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('Res');
          }} style={styles.buttons}>Results</Text>
          </TouchableOpacity>
          </View>
          <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-7664756446244941/5385120799"
                didFailToReceiveAdWithError={this.bannerError} />
      </View>
    );
  }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000036',
  },
  title: {
    fontSize: 20,
    color:'white',
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage:{
    flex:1,
    height: null,
    width:width*1.9,
    alignItems:'center',
    justifyContent:"center",
    resizeMode:'stretch',
  },
  modal:{
    fontSize:24,
    textAlign: 'center',
    margin: 20,
  },
  buttons:{
    margin:10,
    padding:10,
    fontSize:24,
    textAlign:'center',
    color:'white',
    elevation:9,
    width:200,
    backgroundColor:'#33afd4',
    fontFamily: 'Slabo',
  },
  butt:{
    backgroundColor:'#33afd4',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:30,
    paddingRight:30,
    borderRadius:4,
    width:140,
    shadowOffset:{width: 22, height:22},
    shadowColor:'#f6f6f6',
    marginTop:80,
  },
  image:{
    position:'absolute'
  }
});
