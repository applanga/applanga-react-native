/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {initLocalisations, initApplangaLocalisations} from './i18n.config';
import LanguagePicker from './LanguagePicker';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

initLocalisations();

function Section({children, title}: SectionProps): React.JSX.Element {
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

function App(): React.JSX.Element {
  const {t} = useTranslation();
  const [applangaInitialized, setApplangaInitialized] = useState(false);
  const [rerenderKey, setRerenderKey] = useState('x');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const _init = async () => {
    console.log('_init');
    var success = false;
    try {
      await initApplangaLocalisations();
      // _updateStrings();
      success = true;
    } catch (e) {
      console.log("Couldn't init localisations");
      console.log(e);
    }
    console.log('Setting applangaInitialized to ' + success);
    //() => setApplangaInitialized(success);
    if (success) {
      setApplangaInitialized(success);
    }
  };

  useEffect(() => {
    _init();
  }, []);

  if (!applangaInitialized) {
    return (
      <View>
        <Text style={styles.sectionTitle}>"Waiting for applanga to init"</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <LanguagePicker />
            <Section title={t('test-1')} />
            <Section title={t('buying-apples', {count: 0})} />
            <Section title={t('buying-apples', {count: 1})} />
            <Section title={t('buying-apples', {count: 2})} />
            <Section
              title={t('some_array-here', {returnObjects: true}).toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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
});

export default App;
