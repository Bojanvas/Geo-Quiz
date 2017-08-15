import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    Picker,
} from 'react-native';
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
         let lastdb = dbscore[0];
        return(
            <View style={styles.option}>
                <Text style={styles.opTitle}>Fun Quizzes</Text>
            <View style={styles.opDiv}>
                <Text style={styles.opButtons}>Last Score : {lastdb.score} </Text>
                <Text style={styles.opButtonsText}>Dificult:{lastdb.dificult  } Date:{lastdb.date} </Text>
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
                    <Text onPress={()=>{this.props.navigation.navigate('Score')}} style={styles.opButtons}>Check all Scores</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.opDiv}>
                 <TouchableOpacity>
                    <Text onPress={()=>{alert('Coming Soon...')}} style={styles.opButtons}>Languages</Text>
                </TouchableOpacity>
                </View>
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
    }
});
