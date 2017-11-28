import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Alert,
    TextInput,
    Modal,
    Linking,
    BackHandler,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import Realm from 'realm';
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob';



export default class Results extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'No Name',
            modalVisible : true,
            poition:0,
            location:'none',
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
    AsyncStorage.getItem("location").then(data => {
        this.setState({
        location: data
        });
    });
  }
  componentWillMount() {
      console.log('this is true or false '+this.props.navigation.state.params.game);
    // this.props.game(true);
    BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.props.navigation.state.params.game) {
            this.props.navigation.navigate('Home');
            return true; // This will prevent the regular handling of the back button
        }

        return false;
    });
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
            location:this.state.location,
        })
    });
    var person ={};
    person.name =this.state.name;
    person.score = res;
    person.date = td,
    person.dificult=difi;
    person.location =this.state.location;
    
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
            dificult:difi,
            location:this.state.location
        })
    }).then(function(response) {
        console.log(response)
        }).catch(function(err) {
            console.log(err)
        })
  }
  checkDif(){
      let dif = this.props.navigation.state.params.dificult;
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
    var res = score *20000 / (time+100);
    var res = Number(res.toFixed(2));
    this.checkrank(res);
    return res;
}
calc(json,result){
    var pos=1;
    for(var i=0;i<json.length;i++){
        if(result<json[i].score){
            pos++;
        }
    }
    return pos;
}
checkrank(result){
    var self = this;
    var difi =this.checkDif();
    var resul = result;
 fetch('http://www.bojanvasilevski.com/results/'+difi).then(function(response){
        return response.json();
    }).then(function(json){
        var pos= self.calc(json,resul);
        self.setState({
            position:pos,
        })
    }).catch((e)=>{
        console.log(e);
        return e;
    });
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
                <Text style={styles.resTitle}> Congrats You have Finish the quizz:</Text>
                <Text style={styles.resNumber}>Corect Questions:{this.props.navigation.state.params.score}</Text>
                <Text style={styles.resNumber}>Online Rank:{this.state.position}</Text>
                <Text style={styles.foosnote}>*Online ranking available only if you have internet access</Text>
                <Text style={styles.resNumber}>Score:{this.checkScore()}</Text>
                 <TouchableOpacity><Text style={styles.back} onPress = {()=>{this.props.navigation.navigate('Home')}}>Retrun back</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{fontSize:20}} onPress={()=>{ this.props.navigation.navigate('Score')}}>Check Score</Text></TouchableOpacity>
                 <Text style={styles.abLink}  onPress={()=>Linking.openURL("http://www.bojanvasilevski.com/results")}> Check All-Time Results!!</Text>
                    <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-7664756446244941/5385120799"
                didFailToReceiveAdWithError={this.bannerError} />
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
        fontSize:30,
        margin:10,
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
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        borderRadius:4,
        width:140,
        shadowOffset:{width: 22, height:22},
        shadowColor:'#f6f6f6',
        marginTop:50,
        marginLeft:20,
    },
    abLink:{
        fontSize:20,
         margin:10,
    },
    foosnote:{
        fontSize:12,
        color:'#ad0834',
    }
})