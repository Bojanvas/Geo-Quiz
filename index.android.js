/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';
import App from './src/Home.js';
import gameApp from './src/Game.js';
import options from './src/Options.js';
import about from './src/About.js';
import results from './src/results.js';
import score from './src/score.js';
import res from './src/res.js';

export default class Geo extends Component {
    render() {
        return ( <
            Nav / >
        );
    }
}
const Nav = StackNavigator({
    Home: { screen: App },
    Game: { screen: gameApp },
    Option: { screen: options },
    About: { screen: about },
    Res:{
        screen: res
    },
    Results: {
        screen: results,
        overrideBackPress: true,
    },
    Score: {
        screen: score,
    }
});


AppRegistry.registerComponent('Geo', () => Geo);