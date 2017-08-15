import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Alert,
    TextInput,
    Modal,
    TouchableHighlight,
} from 'react-native';
import Realm from 'realm';



export default class Results extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'no Name',
            modalVisible : true,
        }
       
    }
     setModalVisible(visible) {
             this.setState({modalVisible: visible});
             }
 static navigationOptions = {
    title: ' Results',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},
         headerLeft: null,
  };
  componentDidMount(){
     
  }
  addscore(){
              var difi =this.checkDif();
    var res = this.checkScore();
        let realm = new Realm({
            // schema for db
            schema: [{name: 'Score',
            properties: {
                name:'string',
                score: 'int',
                date:'string',
                dificult:'string',
                }}]
        });
        var today = new Date(); // current date
        var td = today.toDateString(); // format date
           realm.write( ()=>{
               // write to db res
        let myRes = realm.create('Score',{
            name:this.state.name,
            score: res,
            date:td,
            dificult:difi,
        })
    });
    var person ={};
    person.name =this.state.name;
    person.score = res;
    person.date = td,
    person.dificult=difi;
    
    fetch('http://www.bojanvasilevski.com/results',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            name:this.state.name,
             score: res,
            date:td,
            dificult:difi
        })
    }).then(function(response) {
        console.log(response)
        }).catch(function(err) {
            console.log(err)
        })
  }
  checkDif(){
      let dif = this.props.navigation.state.params.dificult;
      console.log(dif);
      if(dif==0){
          difi ="Easy";
          return difi;
      }else if(dif==1){
            difi ="Normal";
          return difi;
      }else if(dif==2){
            difi ="Hard";
          return difi;
      }
  }
checkScore(){
    // calculate score
    let score = this.props.navigation.state.params.score;
    let time = this.props.navigation.state.params.time;
    var res = score *100 / time;
    return res;
}
    render(){

        return(
            <View style={styles.res}>
                <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text style={styles.modal}>Enter Your Name</Text>
                            <TextInput
                                style={{height: 60, fontSize:30,borderColor: '#33afd4',color:'#33afd4', borderWidth: 1}}
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                            />
                            <TouchableHighlight style={styles.butt} onPress={() => {
                                this.addscore();
                            this.setModalVisible(false)
                            }}>
                            <Text style ={{color:'white',textAlign:'center'}}>OK</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>
                <Text style={styles.resTitle}> Congrats You have Finish the quizz your score is:</Text>
                <Text style={styles.resNumber}>{this.props.navigation.state.params.score}</Text>
                <Text style={styles.resNumber}>{this.props.navigation.state.params.time}</Text>
                <Text style={styles.back} onPress = {()=>{this.props.navigation.navigate('Home')}}>Retrun back</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    res:{
        backgroundColor:'#33afd4',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    resTitle:{
        color:'white',
        textAlign:'center',
        fontSize:30,
    },
    resNumber:{
        fontSize:50,
        margin:20,
        color:'#34363a',
    },
    back:{
        fontSize:30,
        color:'white',
        borderWidth:0.5,
        borderColor:'white',
        textAlign:'center',
        width:200,
        margin:20,
        padding:10,
    },
    modal:{
        fontSize:30,
        margin:10,
    },
    butt:{
        backgroundColor:'#33afd4',
        padding:10,
        width:80,
        margin:10,
    }
})