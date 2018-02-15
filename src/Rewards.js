import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
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
            animate:true,
            zI:5,
            limit:3,
            level:this.props.navigation.state.params.level,
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
        if(this.state.level >= 5){
            this.setState({
                limit:4,
            })
        } else if (this.state.level >= 10) {
            this.setState({
                limit:5,
            })
        }
        setTimeout(() => {
            this.setState({
                animating: false,
                zI:0,
            })
        },2000)
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
            if (this.state.hints<this.state.limit){
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
        zIndex = this.state.zI;
        const animating = this.state.animating
        return(
            <View style={styles.rewCont}>
                <View style={[styles.container, styles.horizontal ,{zIndex:zIndex}]}>
                    <ActivityIndicator
                        animating = {animating}
                        size="large" 
                        color="#0000ff" />
                </View>
                <Text style={styles.rewText}>You Got { this.state.hints }/{this.state.limit} Hints</Text>
                <Text></Text>
                <Text style={styles.rewText}>If you want to collect more, watch rewarded videos</Text>
                <TouchableOpacity><Text style={styles.buttons} onPress={()=>{this.adVideo()}}>Watch Video</Text></TouchableOpacity>
                <Text style={styles.msg}>{this.state.msg}</Text>    
            </View>    
        )
    }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
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
      container: {
        position:'absolute',
        flex: 1,
        width:width,
        height:700,
        top:-150,
        backgroundColor:'#ffffff',
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
})