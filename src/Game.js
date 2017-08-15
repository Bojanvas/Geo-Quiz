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
        }
    }


 componentDidMount() {
      AsyncStorage.getItem('dificult').then((data)=>{
          // here iam chaning difficuly fonr games
        this.quest = dificulties[data];
          this.setState({
            questions:this.quest,
            dif:data,
    })
   }) 

    setInterval(
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
              i: i+1,
              score: score,
          })
             this.checkGame();
      }else{
          //wrong one
           this.setState({
              i: i+1,
              score: score,
          })
                this.checkGame();
      }

  }
  checkGame(){
      // check the game is it finished
      if(this.state.i<3){
      }else{
          this.setState({
              game:false,
          })
        //   alert('game has ended' + this.state.score)
        this.props.navigation.navigate('Results',{ score:this.state.score,time:this.state.time,dificult:this.state.dif});

      }
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
         <View style={styles.questions}><Text style={styles.qu}>{this.state.questions[i].question}</Text></View>
         <View style={styles.answers}>
              <TouchableOpacity><Text onPress={(event)=>{ this.checkAn(this.state.questions[i].ans[0])}} style={styles.an}>{this.state.questions[i].ans[0]}</Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={(event)=>{this.checkAn(this.state.questions[i].ans[1])}} style={styles.an}>{this.state.questions[i].ans[1]}</Text></TouchableOpacity>
         </View>
          <View style={styles.answers}>
              <TouchableOpacity><Text onPress={(event)=>{this.checkAn(this.state.questions[i].ans[2])}} style={styles.an}>{this.state.questions[i].ans[2]}</Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={(event)=>{this.checkAn(this.state.questions[i].ans[3])}} style={styles.an}>{this.state.questions[i].ans[3]}</Text></TouchableOpacity>
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
      fontWeight:'200',
            fontFamily: 'Slabo',

  },
});
