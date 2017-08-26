import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    Picker,Linking,
} from 'react-native';
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob';
import {newQuest ,nQuest, hQuest} from './questions.js';
export default class Option extends Component{
    constructor(props){
        super(props);
        this.state={
            optionSelected:['easy','normal','hard'],
        }
    }

    static navigationOptions = {
    title: ' Option',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},
  };
//   async getResults(){
//       try {
//         await AsyncStorage.multiGet(['score','date','dificult'],(error,results)=>{
//             results.map((result, i,res)=>{
//                 var score= res[0][1];
//                 var datedb= res[1][1];
//                 var difdb= res[2][1];
//                 // console.log('score is this'+score,datedb,difdb)
//                 this.setState({
//                     hScore:score,
//                     date:datedb,
//                     dif:difdb,
//                 })
//             });
//         });
//         } catch (error) {
//         // Error retrieving data
//         console.log(error);
//         }
//   }
componentDidMount(){
     AsyncStorage.getItem('dificult').then((data)=>{
          this.setState({
            optionSelected:data,
    })
   })
   
}
checkdb(lastdb){
    // console.log('this is '+typeof(lastdb));
    if(typeof(lastdb) =='object'){
       
              return  <Text style={styles.opButtons}>Last Score : {lastdb.score}  Date:{lastdb.date.slice(3,11)} </Text>
    }else{ return <Text style={styles.opButtons}>Last Score : 0 </Text> }
}
    render(){
         let realm = new Realm({
            schema: [{name: 'Score',
            properties: {
                name:"string",
                score: 'int',
                date:'string',
                dificult:'string',
                }}]
        });
         let dbscore = realm.objects('Score');
         let num = dbscore.length;
         var lastdb = dbscore[num-1];
        return(
            <View style={styles.option}>
                <Text style={styles.opTitle}>Fun Quizzes</Text>
                 <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-7664756446244941/5385120799"
                didFailToReceiveAdWithError={this.bannerError} />
            <View style={styles.opDiv}>
               {this.checkdb(lastdb)}
            </View>    
            <View style={styles.opDiv}>
                 <View style={{flex:5}}>
                    <Text style={styles.opButtons}>Difficulty </Text>
                    </View>
                    <View style={{flex:5}}>
                        <Picker
                            style={{color:'#33afd4'}}
                            selectedValue={this.state.optionSelected}
                            onValueChange={(itemValue, itemIndex) =>{ console.log(itemValue),AsyncStorage.setItem('dificult',itemValue), this.setState({optionSelected:itemValue}) }}>
                            <Picker.Item label="Easy" value="0" />
                            <Picker.Item label="Normal" value="1" />
                            <Picker.Item label="Hard" value="2" />
                        </Picker>
                        </View>
             </View>
              <View style={styles.opDiv}>
                <TouchableOpacity>
                    <Text onPress={()=>{alert('Coming Soon...')}} style={styles.opButtons}>Mode</Text>
                </TouchableOpacity>
              </View>  
               <View style={styles.opDiv}>
                 <TouchableOpacity>
                    <Text onPress={()=>{this.props.navigation.navigate('Score')}} style={styles.opButtons}>My Scores</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.opDiv}>
                 <TouchableOpacity>
                    <Text onPress={()=>{alert('Coming Soon...')}} style={styles.opButtons}>Languages</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.abLink}  onPress={()=>Linking.openURL("http://www.bojanvasilevski.com/results")}> Check All-Time Results!!</Text>
            </View>
        )
    }
  
}
 var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    option:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#33afd4',
    },
    opButtons:{
        backgroundColor:'white',
        color:'#33afd4',
                fontWeight: '300',
        fontSize:19,
        padding:16,

    },
     opButtonsText:{
        backgroundColor:'white',
        color:'#33afd4',
                fontWeight: '300',
        fontSize:14,
        justifyContent:'center',
    },
    opTitle:{
        color:'white',
        textAlign:'center',
        fontSize:30,
         marginBottom:40,
          fontWeight: '300',
    },
    opDiv:{
        backgroundColor:'white',
        flexDirection: 'row',
     width:width,
      borderWidth:0.8,
        borderColor:'#33afd4',
                alignItems:'center',
    },
      abLink:{
          marginTop:10,
          color:'white',
        fontSize:20,
    }
});
