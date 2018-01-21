import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

import { 
    AdMobBanner, 
    AdMobInterstitial, 
    PublisherBanner,
    AdMobRewarded
} from 'react-native-admob';

export default class Rewards extends Component {
    constructor(props){
        super(props);
        this.state = {
            hints:'',
            msg:"",
        }
    }

    static navigationOptions = {
        title: 'Rewards',
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: '#33afd4', 
        elevation: null},
    };

    componentDidMount(){
        AsyncStorage.getItem("hint").then(data => {
            this.setState({
                hints: data,
            });
        });
        AdMobRewarded.setAdUnitID("ca-app-pub-7664756446244941/3539652355");
        
        AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);

        AdMobRewarded.addEventListener('rewarded',
            (reward) => {
            console.log('AdMobRewarded => rewarded', reward)
            if (this.state.hints<3){
                let hints = Number(this.state.hints) +1;
                let hintStr = String(hints);
                this.setState({
                    hints:hintStr,
                })
                AsyncStorage.setItem('hint',hintStr);
            }    
            }
        );
        AdMobRewarded.addEventListener('adLoaded',
            () => console.log('AdMobRewarded => adLoaded')
        );
        AdMobRewarded.addEventListener('adFailedToLoad',
            (error) =>{ 
                console.warn(error);
            }
        );
        AdMobRewarded.addEventListener('adOpened',
            () => console.log('AdMobRewarded => adOpened')
        );
        AdMobRewarded.addEventListener('videoStarted',
            () => console.log('AdMobRewarded => videoStarted')
        );
        AdMobRewarded.addEventListener('adClosed',
            () => {
            console.log('AdMobRewarded => adClosed');
            AdMobRewarded.requestAd().catch(error => console.warn(error));
            }
        );
        AdMobRewarded.addEventListener('adLeftApplication',
            () => console.log('AdMobRewarded => adLeftApplication')
        );
    
        AdMobRewarded.requestAd().catch(error => console.warn(error));
    }

    adVideo() {
        // Display a rewarded ad
        ad='ca-app-pub-7664756446244941/3539652355';
        AdMobRewarded.showAd().catch(error => {
            console.warn(error);
            this.setState({
                msg:String(error) + "Try again later",
            })
        });
    }

    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
    }
  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }
    render(){
        return(
            <View style={styles.rewCont}>
                <Text style={styles.rewText}>You Got { this.state.hints }/3 Hints</Text>
                <Text></Text>
                <Text style={styles.rewText}>If you want to collect more, watch rewarded videos</Text>
                <TouchableOpacity><Text style={styles.buttons} onPress={()=>{this.adVideo()}}>Watch Video</Text></TouchableOpacity>
                <Text style={styles.msg}>{this.state.msg}</Text>    
            </View>    
        )
    }
}
const styles = StyleSheet.create({
    rewCont:{
        marginTop:50,
        padding:50,
    },
    rewText:{
        fontSize:28,
        fontFamily: 'Slabo',
    },
    buttons:{
        justifyContent : 'center',
        marginTop:50,
        padding:10,
        fontSize:24,
        textAlign:'center',
        color:'white',
        elevation:9,
        width:200,
        backgroundColor:'#33afd4',
        fontFamily: 'Slabo',
      },
      msg:{
        fontSize:24,  
        marginTop:20,
        marginLeft:30,
        color:'#8c1c41'
      },
})