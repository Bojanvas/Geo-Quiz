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
    FlatList,
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

  export default class Res extends Component{
    constructor(props){
        super(props);
            this.state={
                results:[],
                dif:'Normal',
            }
    }
    static navigationOptions = {
        title: ' Results',
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: '#33afd4', 
        elevation: null},
        
    };
    componentWillMount(){
        this.checkrank();
    }
    easy(){
        var self = this;
        var difi =this.state.dif;
     fetch('https://bojanv4.herokuapp.com/results/'+difi).then(function(response){
            return response.json();
        }).then(function(json){
            json.sort(function(a,b){
                return b.score - a.score;
            })
            self.setState({
                results:json,
            })
        }).then(function(){
            console.log('work')
        });
    }
    hard(){
        var self = this;
        var difi =this.state.dif;
     fetch('https://bojanv4.herokuapp.com/results/'+difi).then(function(response){
            return response.json();
        }).then(function(json){
            json.sort(function(a,b){
                return b.score - a.score;
            })
            self.setState({
                results:json,
            })
        }).then(function(){
            console.log('work')
        });
    }
    level(){
        var self = this;
        fetch('https://bojanv4.herokuapp.com/results/Levels').then(function(response){
            return response.json();
        }).then(function(json){
            json.sort(function(a,b){
                return b.level - a.level;
            })
            self.setState({
                results:json,
            })
        }).then(function(){
            console.log('work')
        });

    }
    checkrank(){
        var self = this;
        var difi =this.state.dif;
     fetch('https://bojanv4.herokuapp.com/results/'+difi).then(function(response){
            return response.json();
        }).then(function(json){
            json.sort(function(a,b){
                return b.score - a.score;
            })
            self.setState({
                results:json,
            })
        }).then(function(){
            console.log('work')
        });
    }
    list({ item, index }){
        if(item.level !== undefined ) {
            return <View  style ={styles.row} key={index}><Text>  Pos:<Text style={styles.rows}>{index+1}</Text>   Name:<Text style={styles.rows}>{item.name}</Text>  Level:<Text style={styles.rows}>{item.level}</Text>  Location:<Text style={styles.rows}>{item.location}</Text></Text></View>
        } else {
            return <View  style ={styles.row} key={index}><Text>  Pos:<Text style={styles.rows}>{index+1}</Text>   Name:<Text style={styles.rows}>{item.name}</Text>  Score:<Text style={styles.rows}>{item.score}</Text>  </Text><Text >  Location:<Text style={styles.rows}>{item.location}</Text></Text></View>
        }       
    }
    render(){
        return(
            <View style ={styles.whole}>
                <View style ={styles.buttons}>
                <TouchableOpacity>
                        <Text onPress = {()=>{
                    this.state.dif = 'Easy';     
                    this.easy();
                    }} style={styles.butto}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                        <Text onPress = {()=>{
                    this.state.dif = 'Normal';
                    this.checkrank();
                    }} style={styles.butto}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                        <Text onPress = {()=>{
                    this.state.dif = 'Hard';           
                    this.hard();
                    }} style={styles.butto}>Hard</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                        <Text onPress = {()=>{
                    this.state.dif = 'Levels';           
                    this.level();
                    }} style={styles.level}>Levels</Text>
                </TouchableOpacity>
                </View>
            <View style ={styles.content}>
                <Text>Results for:  <Text style={styles.rows}>{this.state.dif}</Text></Text> 
                <FlatList 
                data={this.state.results}
                renderItem={this.list}
                />
            </View>
            <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-7664756446244941/5385120799"
                    didFailToReceiveAdWithError={this.bannerError}
                />     
            </View>    
        )
    }            
  }
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height
  const styles = StyleSheet.create({
    whole:{
        flex: 1,
    },
    content: {     
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    buttons:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33afd4',
        flexDirection:"row",
    },
    butto:{
        width:width/4,
        fontSize:20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#32add2',
        color:"white",
        padding:10,

    },
    level:{
        width:width/4,
        fontSize:20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#32add2',
        color:"gold",
        padding:10,
    },
    row:{
        backgroundColor:'#f6f6f6f6',
        borderWidth: 0.5,
        borderColor: 'white',
        padding:12,
    },
    rows:{
        width:width,
        fontSize:16,
        color:"#4286f4",
        fontFamily: 'Slabo',
    },
  });