/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, NativeModules, ActivityIndicator} from 'react-native';
import {Applanga} from 'applanga-react-native';
import { strings, applangaInit} from './locales/i18n';


type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      applangaInitialized: false,
      recreateViews:true,
    }
    applangaInit( () => {
      this.setState({applangaInitialized: true});
    })

    this.updateApplanga = this.updateApplanga.bind(this)

  }

  async helloApplanga(){
    var text;
    try{ 
      text = await Applanga.getString("helloApplanga", "hello default");
    } catch (e){
    }
    Alert.alert(text);
  }

  async updateApplanga(){
    applangaInit( () => {
      this.setState({applangaInitialized: true});
    });
  }

  async showDraftModeDialog(){
    Applanga.showDraftModeDialog();
  }

  render() {
    if( ! this.state.applangaInitialized){
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

    return (
      <View style={styles.container}>
        <Button
          onPress={this.updateApplanga}
          title={strings("update_applanga")}
        />
        <View style={styles.button}>
          <Button
            onPress={this.helloApplanga}
            title={strings("hello_world")}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.showDraftModeDialog}
            title={strings("show_draft_mode_dialog")}
          />
        </View>
        <Text style={styles.welcome}>{strings("welcome")}</Text>
        <Text style={styles.instructions}>{strings("instructions")}</Text>
        <Text style={styles.instructions}>
          {Platform.select({
            ios: strings("instructions_ios"),
            android: strings("instructions_android"),
          })}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});
