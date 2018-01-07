import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class Levels extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.lvlCont}>
                <View style={styles.lvlView}>
                    <Text style={styles.lvlText}>Level</Text>
                    <Text style={styles.lvlNum}>{ this.props.level} </Text>
                </View>
            </View>        
        )
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
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
    }
})