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

async function initApplangaLocalisations(): Promise<void> {
  console.log('initLocalisations');
  try {
    console.log('localizeMapI18NextJsonV4');
    let m = {
      en: en,
      de: de,
    };
    console.log(m);
    var map = await Applanga.localizeMapI18NextJsonV4(m);
    console.log(map);

    await Applanga.update(['en', 'de']);

    resources = {
      en: {
        translation: map.en,
      },
      de: {
        translation: map.de,
      },
    };
    console.log('initLocalisations2');

    // console.log(resources.en);
    // console.log(resources.de);
    console.log(map.en);
    console.log(map.de);
    i18n.addResourceBundle('en', 'translation', resources.en.translation);
    i18n.addResourceBundle('de', 'translation', resources.de.translation);
    i18n.changeLanguage(i18n.language);
    console.log('initLocalisations3');
  } catch (e) {
    console.error(e);
  }
}

export {initLocalisations, initApplangaLocalisations, i18n};
