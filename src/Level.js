import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Levels extends Component{
    constructor(props){
        super(props);
    }

    widthExp(){
        let lvl = this.props.level;
        let exp = this.props.exp;
        let limit = lvl * 10000;
        let parent = width/4;
        let lastW = exp/limit * parent;
        console.log(exp); 
        return lastW;
    }
    render(){
        var newWidth = this.widthExp();
        return(
            <View style={styles.lvlCont}>
                <View style={styles.lvlView}>
                    <Text style={styles.lvlText}>Level</Text>
                    <Text style={styles.lvlNum}>{ this.props.level}</Text>
                    <View style={{height:10,position:"absolute",left:5,bottom:5,backgroundColor:"gold",width:newWidth}}></View>
                </View>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    lvlCont:{
        height:height/6,
        width:width/4,
        position:"absolute",
        right:0,
        top:0,
        backgroundColor:'black',
        borderRadius:8,
    },
    lvlView:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lvlText:{
        color:'#f4e542',
        textAlign:'center',
        fontSize:28,
        fontFamily: 'Slabo',
    },
    lvlNum:{
        fontSize:34,
        fontFamily: 'Slabo',
        color:'#f4e542',
        textAlign:'center',
    },
})