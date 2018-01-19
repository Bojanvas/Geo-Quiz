import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class Hints extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.containerHints}>
                <TouchableOpacity><Text onPress={(event)=>{ console.log('pressed'); }} style={styles.hintButt}>Hints</Text></TouchableOpacity>
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
    }
})