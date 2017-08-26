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
  LayoutAnimation,
  View,
  Platform,
  UIManager
} from 'react-native';
import {dificulties} from './questions.js';
import TimerMixin from 'react-timer-mixin';
import Resul from './results.js';


export default class Home extends Component {
    
    constructor(props){
        super(props);
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
            questions : this.quest,
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
     function random() {
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * dificulties[0].length);
        difQuest_1.push(dificulties[0][num]);
        dificulties[0].splice(num, 1);
    }
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * dificulties[1].length);
        difQuest_2.push(dificulties[1][num]);
        dificulties[1].splice(num, 1);
    }
    for (let i = 0; i < 20; i++) {
        let num = Math.floor(Math.random() * dificulties[2].length);
        difQuest_3.push(dificulties[2][num]);
        dificulties[2].splice(num, 1);
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
              message:'Wrong answer',
          })
        if(i<19){
              this.nextquest();
          }else{
              this.gameover();
          }
      }

  }
  nextquest(){
            var i = this.state.i;
       this.setState({
              i: i+1,
          })
  }
  gameover(){
         clearInterval(this.interval);
        this.props.navigation.navigate('Results',{ score:this.state.score,time:this.state.time,dificult:this.state.dif,game:this.state.game});

      }

componentWillUnmount(){
    clearInterval(this.interval);
}
  render() {

      var i = this.state.i;
      var questions = this.state.questions;
   
    return (
      <View  style={styles.container}>
        <View style={styles.first}>
            <Image   style={styles.img} source={this.state.questions[i].img}></Image>
            <View style={styles.time}>
            <Text style={styles.quest}>time:
                {"\n"}
                {this.state.time}
            </Text>
            <Text  style={styles.quest}>Questions:
                {"\n"}
                {i+1}/{questions.length}
            </Text>
            </View>
        </View>
         <View style={styles.second}>
         <Text style={{color:this.state.mesColor}}>{this.state.message}</Text>
         <View style={styles.questions}><Text style={styles.qu}>{this.state.questions[i].question  || 'No Question'}</Text></View>
         <View style={styles.answers}>
              <TouchableOpacity><Text onPress={(event)=>{  this.checkAn(this.state.questions[i].ans[0])}} style={styles.an}>{this.state.questions[i].ans[0] || 'No Question'}</Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={(event)=>{ this.checkAn(this.state.questions[i].ans[1])}} style={styles.an}>{this.state.questions[i].ans[1] || 'No Question'}</Text></TouchableOpacity>
         </View>
          <View style={styles.answers}>
              <TouchableOpacity><Text onPress={(event)=>{ this.checkAn(this.state.questions[i].ans[2])}} style={styles.an}>{this.state.questions[i].ans[2] || 'No Question'}</Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={(event)=>{ this.checkAn(this.state.questions[i].ans[3])}} style={styles.an}>{this.state.questions[i].ans[3] || 'No Question'}</Text></TouchableOpacity>
           </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33afd4',

  },
  first:{
      flex:5,
  },
  second:{
      flex:5,
      alignItems:'center',
      justifyContent:'center',
  },
  img:{
      flex:2,
      width:310,
        resizeMode:'contain',      
  },
  time:{
      margin:5,
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',
  },
  quest:{
      backgroundColor:'white',
      padding:10,
      margin:4,
      height:60,
      width:120,
      textAlign:'center',
      fontSize:18,
      fontFamily: 'Slabo',
  },
  qu:{
      color:'white',
      textAlign:'center',
      fontSize:24,
     fontFamily: 'Slabo',
  },
  answers:{
        flexDirection:'row',
        flex:0,
        alignItems:'center',
        justifyContent: 'space-around',
  },
  an:{
      width:120,
      margin:15,
      textAlign:'center',
      fontSize:20,
      backgroundColor:'white',
      color:'#33afd4',
      padding:10,
      elevation:9,
      fontWeight:'200',
        fontFamily: 'Slabo',


  },
});
