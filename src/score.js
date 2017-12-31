import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ListItem,
    StyleSheet,
    List,
    Dimensions,
    AsyncStorage,
} from 'react-native';

import realm from './realm';
import Score_db from "./score_realm.js";

export default class Score extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:[
              
            ]
        }
    }
      static navigationOptions = {
    title: ' Scores',
    headerTintColor: 'white',
     headerStyle: {
       backgroundColor: '#33afd4', 
       elevation: null},
  };
//   getRes(){
//      var data = this.state.data;
//      var nwdata = Array.from(data);
//       var dbdata =  AsyncStorage.getItem('db_score').then((data)=>{
//           console.log('this data is not new'+data)
//       });
//      nwdata.push(dbdata);           
//      this.setState({
//          data:nwdata,
//      })
//   }
//   componentDidMount(){

//     //  this.getRes();
  
   
//     // console.log(nwdata);
//     // this.setState({
//     //    data:nwdata,
//     // })
//     // console.log(this.state.data)

//   }
  renderItem({ item, index }) {
         return <Text  style={styles.lines} ><Text style={styles.index}>{index+1}</Text> Name:{item.name}  Score:{item.score}  Date:{item.date} Dificult:{item.dificult}</Text>;
  }
    render(){

        let dbscore = Score_db.getScore();
        dbscore = dbscore.sorted('score', {ascending: false});
        //   var data = this.state.data;
        // var nwdata = Array.from(data);
        // nwdata.push(dbscore);
         
        return(
            <View>
                <FlatList
                    style = {styles.list}
                    data={dbscore}
                    renderItem={this.renderItem}
                    />     
           </View>             
        );
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    lines:{
        fontSize:18,
        padding:5,
        textAlign:'center',
        borderBottomColor:'black',
        borderBottomWidth:0.5,
    },
    list:{
        elevation:5,
    },
    index:{
      color:'#33afd4',  
    },
});