import {NativeModules,Platform} from 'react-native';
import I18n from 'react-native-i18n';
import Applanga from 'applanga-react-native';

import en from './en.json';
import de from './de.json';


// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
NativeModules.I18nManager.allowRTL(isRTL);

export async function applangaInit(callback){
  var result;
  try{
    await Applanga.update()
    result = await Applanga.localizeMap({"en" : en, "de" : de});
  } catch (e) {
    console.error("Applanga error: Please check if your map has the correct format.");
    console.error(e);
  }
  I18n.translations = {
    en: result.en,
    de: result.de
  };
  callback();
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;