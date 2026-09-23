/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Applanga} from 'applanga-react-native';
import {StyleSheet, Text, Button, View} from 'react-native';
import {
  initLocalisations,
  setLanguage,
  getString,
  getStringWithArgumentsAsync,
} from './LocalisationManager.js';

function App(): React.JSX.Element {
  const [applangaInitialized, setApplangaInitialized] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [showDraftModeText, setShowDraftModeText] = useState('');
  const [showScreenshotText, setShowScreenshotText] = useState('');
  const [hideScreenshotText, setHideScreenshotText] = useState('');
  const [changeLangToEn, setChangeLangToEn] = useState('');
  const [changeLangToDe, setChangeLangToDe] = useState('');
  const [stringWithArgsText, setStringWithArgsText] = useState('');

  async function updateStrings() {
    setTitleText(getString('test-1'));
    setShowDraftModeText(getString('test-2-draft-mode-show'));
    setShowScreenshotText(getString('test-3-show-screenshot-menu'));
    setHideScreenshotText(getString('test-4-hide-screenshot-menu'));
    // setStringWithArgsText(
    //   await getStringWithArgumentsAsync('test-5-string-with-args', 'empty', {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //   }),
    // );
    setChangeLangToEn(getString('test-6-set-language-and-update'));
    setChangeLangToDe(getString('test-7-set-language-and-update'));
    setApplangaInitialized(true);
  }

  useEffect(() => {
    const _updateStrings = updateStrings;
    const _init = async () => {
      console.log("_init");
      try {
        await initLocalisations();
        _updateStrings();
      } catch (e) {
        console.log("Couldn't init localisations");
      }
    };
    _init();
  }, []);

  if (applangaInitialized) {
    return (
      <View style={styles.buttonHolder}>
        <Text style={styles.titleText}>{titleText}</Text>
        <Button
          title={showDraftModeText}
          onPress={() => Applanga.showDraftModeDialog()}
        />
        <Button
          title={showScreenshotText}
          onPress={() => Applanga.showScreenShotMenu()}
        />
        <Button
          title={hideScreenshotText}
          onPress={() => Applanga.hideScreenShotMenu()}
        />
        <Button
          title={changeLangToEn}
          onPress={async () => {
            await setLanguage('en');
            updateStrings();
          }}
        />
        <Button
          title={changeLangToDe}
          onPress={async () => {
            await setLanguage('de');
            updateStrings();
          }}
        />
        <Text style={styles.titleText}>{stringWithArgsText}</Text>
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
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
