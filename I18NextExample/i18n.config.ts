import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './strings/en.json';
import de from './strings/de.json';
import 'intl-pluralrules';
import {Applanga} from 'applanga-react-native';

var resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

/**
 * Initialize i18n with the given languages and translations
 */
async function initLocalisations(): Promise<void> {
  await i18n.use(initReactI18next).init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
}

/**
 * Here we add we pass all our translations to Applanga and we get back our
 * over-the-air translated strings.
 * Now we feed i18n with those strings, so that we can use them in our app.
 */
async function initApplangaLocalisations(): Promise<void> {
  try {
    let m = {
      en: en,
      de: de,
    };

    await Applanga.update(['en', 'de']);
    var map = await Applanga.localizeMapI18NextJsonV4(m);

    resources = {
      en: {
        translation: map.en,
      },
      de: {
        translation: map.de,
      },
    };
    i18n.addResourceBundle('en', 'translation', resources.en.translation);
    i18n.addResourceBundle('de', 'translation', resources.de.translation);
    i18n.changeLanguage(i18n.language);
  } catch (e) {
    console.error(e);
  }
}

export {initLocalisations, initApplangaLocalisations, i18n};
