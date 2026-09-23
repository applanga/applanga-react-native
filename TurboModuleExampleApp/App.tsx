/**
 * TurboModuleExampleApp
 * Demonstrates applanga-react-native's synchronous TurboModule API
 *
 * @format
 */

import {useEffect, useState} from 'react';
import {Applanga} from 'applanga-react-native';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Platform,
} from 'react-native';

function AppButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
      android_ripple={{color: 'rgba(255, 255, 255, 0.2)'}}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function App(): React.JSX.Element {
  const [applangaInitialized, setApplangaInitialized] = useState(false);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        await Applanga.update();
        setApplangaInitialized(true);
      } catch (e) {
        console.error("Couldn't init localizations", e);
      }
    };
    init();
  }, []);

  if (!applangaInitialized) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.titleText}>Waiting for applanga to init</Text>
      </SafeAreaView>
    );
  }

  const translate = (key: string, defaultValue: string) =>
    Applanga.getLocalizedValue(key, defaultValue);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.titleText}>{translate('test-1', 'Hello Example')}</Text>

      <View style={styles.bottomStack}>
        <View style={styles.group}>
          <AppButton
            title={translate('test-2-draft-mode-show', 'Show Draft Mode')}
            onPress={() => Applanga.showDraftModeDialog()}
          />
          <AppButton
            title={translate('test-3-show-screenshot-menu', 'Show Screenshot Menu')}
            onPress={() => Applanga.showScreenShotMenu()}
          />
          <AppButton
            title={translate('test-4-hide-screenshot-menu', 'Hide Screenshot Menu')}
            onPress={() => Applanga.hideScreenShotMenu()}
          />
        </View>

        <View style={styles.group}>
          <AppButton
            title={translate(
              'test-6-set-language-and-update',
              'Change language to EN',
            )}
            onPress={async () => {
              await Applanga.setLanguageAndUpdate('en');
              forceRerender(tick => tick + 1);
            }}
          />
          <AppButton
            title={translate(
              'test-7-set-language-and-update',
              'Change language to DE',
            )}
            onPress={async () => {
              await Applanga.setLanguageAndUpdate('de');
              forceRerender(tick => tick + 1);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3199D5',
    paddingVertical: 24,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomStack: {
    width: '85%',
    gap: 16,
  },
  group: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 12,
    padding: 10,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
