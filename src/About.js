import React, {Component} from 'react';

import { 
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    WebView,
    Dimensions,
    } from 'react-native';

    export default class About extends Component{
         static navigationOptions = {
    title: 'About',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},
  }; 

    render(){
        return(
            <View style={styles.about}>
              <Text style={styles.abTitle}>About this great Quizz</Text>
             <Image source={require('../img/earth3.png')} style={styles.backgroundImage}></Image>
             <View style={styles.about}>   
                <View style={styles.abBox}>
                        <Text style={styles.abText}>Thanks for downlaoding my app, this app is for testing your Geographic knowledge it is great for killing time i hope you will enjoyed </Text>
                        <Text  style={styles.abLink} onPress={()=>Linking.openURL("https://play.google.com/store/apps/details?id=com.bojanvasilevski.geo&hl=en")}>Rate It!!</Text>
                        <Text  style={styles.abText}>I am Bojan Vasilevski, Web Developer/Mobile Developer this is my </Text>
                        <Text style={styles.abLink}  onPress={()=>Linking.openURL("http://www.bojanvasilevski.com")}> Website!!</Text>
                        <Text  style={styles.abText}>Version 1.1.8</Text>
                </View>
             </View>
            </View>
        )
    }
    }
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
        about:{
            flex:1,
            backgroundColor:'#33afd4',
            justifyContent:'center',
            alignItems:'center',
        },
        about:{
            position:'absolute',
        },
         abText:{
            justifyContent:'center',
            color:'white',
            alignItems:'center',
            fontSize:16,
            textAlign:'center',
            fontFamily: 'Slabo',
        },
         abLink:{
            justifyContent:'center',
            color:'red',
            alignItems:'center',
            fontSize:20,
        },
        abTitle:{
            color:'white',
            textAlign:'center',
            fontSize:30,
            padding:8,
        },
        abBox:{
             backgroundColor:'#33afd4',
             borderColor:'white',
             borderWidth:0.8,
             justifyContent:'center',
             alignItems:'center',
             padding:20,
             width: width / 1.3,
             marginTop:height / 5,
             marginLeft:40,
        },
        backgroundImage:{
            flex:1,
            height:height/1.5,
            width: width,
            alignItems:'center',
            resizeMode:'stretch',
  },
});