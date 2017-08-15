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
  View,
  AsyncStorage,
} from 'react-native';

export default class Home extends Component {
       constructor(props){
         super(props);
         this.state ={
           dificult:1
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
   AsyncStorage.getItem('dificult').then((data)=>{
     if(data != null){
     this.setState({
       dificult:data
     })
   }else{
      AsyncStorage.setItem('dificult','1');
   }
   })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/geo.png')} style={styles.backgroundImage}>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('Game',{dificult:this.state.dificult});
          }} style={styles.buttons}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('Option');
          }} style={styles.buttons}>Options</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress = {()=>{
          this.props.navigation.navigate('About');
          }} style={styles.buttons}>About</Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}

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
    width:700,
     alignItems:'center',
     justifyContent:"center",
     resizeMode:'stretch',
  },
  buttons:{
    margin:10,
    padding:10,
    fontSize:24,
    textAlign:'center',
    color:'white',
    width:200,
    backgroundColor:'#33afd4',
    borderWidth: 0.5,
    borderColor: 'white',
    fontFamily: 'Slabo',
  },
});
