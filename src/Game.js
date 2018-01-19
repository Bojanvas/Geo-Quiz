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
  AsyncStorage,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  LayoutAnimation,
  View,
  Platform,
  UIManager
} from 'react-native';

import { 
    AdMobBanner, 
    AdMobInterstitial, 
    PublisherBanner,
    AdMobRewarded
  } from 'react-native-admob';

import {dificulties} from './questions.js';
import TimerMixin from 'react-timer-mixin';
import Resul from './results.js';
import Hints from './Hints.js';


export default class Home extends Component {
    
    constructor(props){
        super(props);
        this.checkAn = this.checkAn.bind(this);
        if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.dif = this.props.navigation.state.params.dificult; 
        this.quest = dificulties[this.dif];
        mixins: [TimerMixin],
        this.state = {
            i:0,
            score:0,
            game:true,
            time:0,
            dif:'',
            location:'None',
            questions : this.quest,
            newArr : [],
            opacity:0,
            mesColor:'#8c1c41',
            message:'',
        }
    }


 componentDidMount() {
    var difQuest_1 = [];
    var difQuest_2 = [];
    var difQuest_3 = [];
    var newdificulties = [];
    var newQuestion = [];
    for(let i=0;i<dificulties.length;i++){
        newQuestion[i] = dificulties[i].slice();
    }
     function random() {
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * newQuestion[0].length);
        difQuest_1.push(newQuestion[0][num]);
        newQuestion[0].splice(num, 1);
    }
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * newQuestion[1].length);
        difQuest_2.push(newQuestion[1][num]);
        newQuestion[1].splice(num, 1);
    }
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * newQuestion[2].length);
        difQuest_3.push(newQuestion[2][num]);
        newQuestion[2].splice(num, 1);
    }
    return newdificulties = [difQuest_1, difQuest_2, difQuest_3];
}
random()
      AsyncStorage.getItem('dificult').then((data)=>{
          // here iam chaning difficuly fonr games
        this.quest = newdificulties[data];
        this.setState({
            questions:this.quest,
            dif:data,
        })
        this.setState({
            newArr:Array.from(this.state.questions[this.state.i].ans)
        })
   }) 

   this.interval = setInterval(
        // time is thicking 1s
      () => {   this.setState({
          time: this.state.time +1,
      }) },
      1000
    );
  }
    static navigationOptions = {
        // mavigation header
    title: ' Geography Quiz',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},
  };

  checkAn(answer){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      //cheking thae answer if is correct or not
      var i = this.state.i;
      var corect = this.state.questions[i].corectAn;
      var score = this.state.score;
      if(corect == answer){
          // right one
          score++;
          this.setState({
              score: score,
              mesColor:'#3bf955',
              message:'Correct answer',
          })
          if(i<19){
           this.nextquest();
          }else{
            this.gameover();
          }

      }else{
          
          //wrong one
           this.setState({
              score: score,
              mesColor:'#8c1c41',
              message:'Wrong answer, Correct answer was: '+corect,
          })
        if(i<19){
              this.nextquest();
          }else{
              this.gameover();
          }
      }

  }

  onUpdate = (val) => {
    this.setState({
      message: val,
    })
  };

  nextquest(){
    var i = this.state.i;
    this.setState({
        i: i+1,
        newArr:Array.from(this.state.questions[i+1].ans)
    })
  }

  gameover(){
        clearInterval(this.interval);
        this.props.navigation.navigate('Results',{ score:this.state.score,time:this.state.time,dificult:this.state.dif,game:this.state.game,name:this.props.navigation.state.params.name});
      }

componentWillUnmount(){
    clearInterval(this.interval);
}
  render() {

      var i = this.state.i;
      var questions = this.state.questions;
      var questArr = this.state.newArr;
      var msg = this.state.message;
    return (
      <View  style={styles.container}>
        <View style={styles.ad}>
            <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-7664756446244941/5385120799"
            didFailToReceiveAdWithError={this.bannerError}
            />
        </View>    
        <View style={styles.first}>
            <Image style={styles.img} source={this.state.questions[i].img}></Image>
            <View style={styles.time}>
            <Text style={styles.quest}>time:
                {"\n"}
                {this.state.time}
            </Text>
            <Hints questions={questArr} total={questArr.length} correct={this.state.questions[i].corectAn } message={msg} onUpdate={this.onUpdate} />
            <Text  style={styles.quest}>Questions:
                {"\n"}
                {i+1}/{questions.length}
            </Text>
            </View>
        </View>
         <View style={styles.second}>
         <Text style={{color:this.state.mesColor}}>{msg}</Text>
         <View style={styles.questions}><Text style={styles.qu}>{this.state.questions[i].question  || 'No Question'}</Text></View>
         <View style={styles.contAnswers}>
            <View style={styles.answers}>
            {
             questArr.map((questions,i)=>{
                return <TouchableOpacity key={i} ><Text onPress={(event)=>{ this.checkAn(questions) }} style={styles.an}>{questions || 'No Question'}</Text></TouchableOpacity>
             })
            }
            </View>
        </View>    
        </View>
      </View>
    );
  }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  container: {
    height:height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33afd4',

  },
  first:{
      flex:6,
  },
  second:{
      flex:5,
      alignItems:'center',
      justifyContent:'center',
  },
  img:{
      marginTop:0,
      flex:3,
      width:width/1.1,
      resizeMode:'contain',      
      backgroundColor:'#33afd4',
  },
  time:{
      margin:2,
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',
  },
  quest:{
      backgroundColor:'white',
      fontWeight:'bold',
      padding:1,
      margin:2,
      height:height/13,
      width:120,
      textAlign:'center',
      fontSize:19,
      fontFamily: 'Slabo',
  },
  qu:{
      color:'white',
      textAlign:'center',
      fontSize:24,
     fontFamily: 'Slabo',
  },
  answers:{
        flex:0,
        marginBottom:10,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent: 'space-around',
  },
  an:{
      width:width/2.5,
      margin:10,
      textAlign:'center',
      fontSize:22,
      backgroundColor:'white',
      color:'#33afd4',
      padding:5,
      elevation:6,
      fontWeight:'200',
      fontFamily: 'Slabo',
  },
  contAnswers:{
      flex:9,
  }
});
