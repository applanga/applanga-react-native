import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {Applanga} from 'applanga-react-native';
import {
  initLocalisations,
  setLanguage,
  getString,
  getStringWithArgumentsAsync,
} from './LocalisationManager.js';

const styles = StyleSheet.create({
  buttonHolder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3199D5',
    height: 400,
  },
  baseText: {
    fontFamily: 'Cochin',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default class App extends Component {
  async updateStrings() {
    this.titleText = getString('test-1');
    this.showDraftModeText = getString('test-2-draft-mode-show');
    this.showScreenshotText = getString('test-3-show-screenshot-menu');
    this.hideScreenshotText = getString('test-4-hide-screenshot-menu');
    this.stringWithArgsText = await getStringWithArgumentsAsync(
      'test-5-string-with-args',
      'empty',
      {firstName: 'John', lastName: 'Doe'},
    );
    this.changeLangToEn = getString('test-6-set-language-and-update');
    this.changeLangToDe = getString('test-7-set-language-and-update');
    this.setState({applangaInitialized: true});
  }

  constructor() {
    super();
    this.state = {
      applangaInitialized: false,
      recreateViews: true,
    };
    initLocalisations(() => {
      this.updateStrings();
    });
  }

  render() {
    if (this.state.applangaInitialized) {
      return (
        <View style={styles.buttonHolder}>
          <Text style={styles.titleText}>{this.titleText}</Text>
          <Button
            title={this.showDraftModeText}
            onPress={() => Applanga.showDraftModeDialog()}
          />
          <Button
            title={this.showScreenshotText}
            onPress={() => Applanga.showScreenShotMenu()}
          />
          <Button
            title={this.hideScreenshotText}
            onPress={() => Applanga.hideScreenShotMenu()}
          />
          <Button
            title={this.changeLangToEn}
            onPress={async () => {
              await setLanguage('en');
              this.updateStrings();
            }}
          />
          <Button
            title={this.changeLangToDe}
            onPress={async () => {
              await setLanguage('de');
              this.updateStrings();
            }}
          />
          <Text style={styles.titleText}>{this.stringWithArgsText}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonHolder}>
          <Text style={styles.titleText}>"Waiting for applanga to init"</Text>
        </View>
      );
    }
  }
}
