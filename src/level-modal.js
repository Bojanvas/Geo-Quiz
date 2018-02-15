import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
import {levelsJson} from './Levels.js'
export default class LevelModal extends Component {
    constructor(props){
        super(props);
        this.state= {
            modalVisible : this.props.subModalVisible,
        }
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible : visible,
        })
      }

    render(){
        var numb = 0;
        var lvl = this.props.level;
        if(lvl != 0){
            levelsJson.forEach(function(element,index) {
                if(element.level == lvl){
                    numb = index
                }
            });
        }
        return(
            <View style = {styles.lvlModal}>
                    <Modal
                        animationType={"fade"}
                        style= {styles.contModal}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                        <View style={styles.cont}>
                            <View style={styles.modalHolder}>
                                <Text style={styles.modalTxt}>Your level is :</Text>
                                <Image source={require('../img/level.png')} style={styles.backgroundImage}></Image>
                                <Text allowFontScaling={false} style={styles.level}>{this.props.level}</Text>
                            </View>
                            <View style={styles.secondCont}>
                                <Text style = {styles.modalQue}>In this level, new questions :</Text>
                                <Text style = {styles.addons}>{ levelsJson[numb].question }</Text>
                                <Text style = {styles.modalQue}>Addons on this level:</Text>
                                <Text style = {styles.addons}>{ levelsJson[numb].addons }</Text>
                            </View>   
                            <TouchableHighlight style={styles.butt} onPress={() => {
                                {/* this.addlocation(); */}
                                this.setModalVisible(false)
                                }}>
                                <Text style ={{color:'#33afd4',textAlign:'center',fontSize:20}}>OK</Text>
                            </TouchableHighlight>
                        </View> 
                </Modal>
            </View>    
        )
    }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    lvlModal:{
        flex:1,
    },
    cont: {
        marginTop:height/4,
        padding:10,
        position:"absolute",
        height:height/2,
        width:width,
        backgroundColor:'#33afd4',
    },
    butt:{
        position:"absolute",
        bottom:5,
        left:width/2-60,
        padding:10,
        width:120,
        backgroundColor:'#ffffff',
    },
    modalTxt:{
        marginTop:30,
        paddingLeft:20,
        fontSize:29,
        color:'#ffffff',
        fontFamily: 'Slabo',
    },
    modalHolder:{
        flex:1,
        padding:20,
        flexDirection: 'row',
    },
    backgroundImage:{
        position:"absolute",
        top:-10,
        right:20,
        width:140,
        height:140,
        resizeMode:'stretch',
    },
    level:{
        position:'absolute',
        top:35,
        right:80,
        fontSize:40,
        color:'#ffffff',
        fontFamily: 'Slabo',
    },
    secondCont:{
        position:"absolute",
        top:90,
        left:0,
        padding:20,
    },
    modalQue:{
        fontSize:26,
        color:'#ffffff',
        fontFamily: 'Slabo',
    },
    addons:{
        fontSize:26,
        fontStyle:'italic',
        color:'#ead538',
        fontFamily: 'Slabo',
    }
})
