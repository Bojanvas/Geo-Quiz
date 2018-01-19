import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

export default class Hints extends Component {
    constructor(props){
        super(props);
        this.state = {
            hints:0,
        }
    }
    componentDidMount(){
        AsyncStorage.getItem("hint").then(data => {
            this.setState({
                hints: data,
            });
        });
    }
    hints(){
        let hints = Number(this.state.hints);
        if(this.props.total > 2 && hints > 0) {
            correct = this.props.correct;
            questions = this.props.questions;
            message = this.props.message;
            console.log(message);
            var newquest = this.removeQue(correct, questions);
            this.setState({
                hints:hints-1,
            })
            let strHint = String(hints-1);
            AsyncStorage.setItem('hint',strHint);
        } else {
            if(hints == 0){
                 message ='You need to match videos in options for more hints';
                 this.props.onUpdate(message);
            } else {
                 message= 'You can use hint only once per-questions';
                 this.props.onUpdate(message);
            }
        }
    }
    removeQue(c,q){
        for(let i =0; i<q.length; i++){
            let counter = 0;
            if(q[i] != c && counter<2) {
                q.splice( i, 1 );
                counter++;
            }
        }
        return q;
    }
    render(){
        const {onUpdate} = this.props;
        var hint = this.state.hints;
        return(
            <View style={styles.containerHints}>
                <TouchableOpacity><Text onPress={(event)=>{ this.hints(); }} style={styles.hintButt}>Hint  {hint}/3</Text></TouchableOpacity>
            </View>    
        )
    }
} 

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    containerHints:{

    },
    hintButt:{
        width:width/4,
        margin:10,
        textAlign:'center',
        fontSize:22,
        backgroundColor:'#1dad35',
        color:'#ffffff',
        padding:5,
        elevation:6,
        fontWeight:'500',
        fontFamily: 'Slabo',
    },
})