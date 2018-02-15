import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Picker,
  Linking,
  Switch,
} from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "react-native-admob";
import { newQuest, nQuest, hQuest } from "./questions.js";
import {countries} from './country.js';

import realm from './realm';
import Score from "./score_realm.js";

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: ["easy", "normal", "hard"],
      count:countries,
      location:this.props.navigation.state.params.location,
      notif:this.props.navigation.state.params.notif,
    };
  }

  static navigationOptions = {
    title: " Option",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#33afd4",
      elevation: null
    }
  };

  componentDidMount() {
    AsyncStorage.getItem("dificult").then(data => {
      this.setState({
        optionSelected: data
      });
    });
    AsyncStorage.getItem("location").then(data => {
        this.setState({
        location: data
        });
    });
    AsyncStorage.getItem("notif").then(data => {
      console.log('data si' + data)
      this.setState({
      notif: data
      });
  });
  }
  checkdb(lastdb) {
    // console.log('this is '+typeof(lastdb));
    if (typeof lastdb == "object") {
      return (
        <Text style={styles.opButtons}>
          Last Score : {lastdb.score} Date:{lastdb.date.slice(3, 11)}{" "}
        </Text>
      );
    } else {
      return <Text style={styles.opButtons}>Last Score : 0 </Text>;
    }
  }
  render() {
    let dbscore = Score.getScore();
    let num = dbscore.length;
    var lastdb = dbscore[num - 1];
    var country = this.state.count;
    return (
      <View style={styles.option}>
        <Text style={styles.opTitle}>Fun Quizzes</Text>
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-7664756446244941/5385120799"
          didFailToReceiveAdWithError={this.bannerError}
        /> */}
        <View style={styles.opDiv}>{this.checkdb(lastdb)}</View>
        <View style={styles.opDiv}>
          <View style={{ flex: 5 }}>
            <Text allowFontScaling={false} style={styles.opButtons}>Difficulty </Text>
          </View>
          <View style={{ flex: 5 }}>
            <Picker
              style={{ color: "#33afd4" }}
              selectedValue={this.state.optionSelected}
              onValueChange={(itemValue, itemIndex) => {
                  AsyncStorage.setItem("dificult", itemValue),
                  this.setState({ optionSelected: itemValue });
              }}
            >
              <Picker.Item label="Easy" value="0" />
              <Picker.Item label="Normal" value="1" />
              <Picker.Item label="Hard" value="2" />
            </Picker>
          </View>
        </View>
        <View style={styles.opDiv}>
          <TouchableOpacity>
            <Text
              allowFontScaling={false}
              onPress={() => {
                alert("Coming Soon...");
              }}
              style={styles.opButtons}
            >
              Mode
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.opDiv}>
          <TouchableOpacity>
            <Text
              allowFontScaling={false}
              onPress={() => {
                this.props.navigation.navigate("Score");
              }}
              style={styles.opButtons}
            >
              My Scores
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.opDiv}>
            <Text
              allowFontScaling={false}
              onPress={() => {
                alert("Coming Soon...");
              }}
              style={styles.opButtons}
            >
              Notifications:
            </Text>
            <Switch 
              style={styles.switch}
              onValueChange={ (value) => {
                AsyncStorage.setItem("notif", value.toString()),
                this.setState({ notif: value.toString() });
            }} 
              value={ this.state.notif === "true" } 
            /> 
        </View>
        <View style={styles.opDiv}>
          <View style={{ flex: 5 }}>
            <Text allowFontScaling={false} style={styles.opButtons}>Location </Text>
          </View>
          <View style={{ flex: 5 }}>
            <Picker
              style={{ color: "#33afd4" }}
              selectedValue={this.state.location}
              onValueChange={(itemValue, itemIndex) => {
                  AsyncStorage.setItem("location", itemValue),
                  this.setState({ location: itemValue });
              }}
            >
            {country.map(function(n,i){
                      return <Picker.Item key={i} label={n.name} value={n.name} />
            })}
            </Picker>
          </View>
        </View>
        <Text 
          allowFontScaling={false}
          style={styles.abLink}
          onPress={() =>
            Linking.openURL("https://bojanv4.herokuapp.com/results")}
        >
          {" "}
          Check All-Time Results!!
        </Text>
      </View>
    );
  }
}
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const styles = StyleSheet.create({
  option: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#33afd4",
    height:height,
    width:width,
  },
  opButtons: {
    backgroundColor: "white",
    color: "#33afd4",
    fontWeight: "300",
    fontSize: 19,
    padding: 16
  },
  opButtonsText: {
    backgroundColor: "white",
    color: "#33afd4",
    fontWeight: "300",
    fontSize: 14,
    justifyContent: "center"
  },
  opTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "300"
  },
  opDiv: {
    backgroundColor: "white",
    flexDirection: "row",
    width: width,
    borderWidth: 0.8,
    borderColor: "#33afd4",
    alignItems: "center"
  },
  abLink: {
    marginTop: 10,
    color: "white",
    fontSize: 20
  },
  switch:{
    flex:1,
    justifyContent: 'flex-end',
    marginRight:10
  }
});
