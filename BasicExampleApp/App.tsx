/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Applanga} from 'applanga-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
} from 'react-native';
import {
  initLocalisations,
  setLanguage,
  getString,
  getStringWithArgumentsAsync,
} from './LocalisationManager.js';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

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
