var en = require('./strings/en.json');
var de = require('./strings/de.json');

import {Applanga} from 'applanga-react-native';

// our default language is english here
var translationMap = en;

async function initLocalisations(callback) {
  try {
    // call Applanga.localizeMap once so it will upload all new strings
    // to the applanga dashboard
    // it only uploads if the debugger is connecter or the draft mode is enabled
    await Applanga.localizeMap({
        // add all languages you want to upload here
        en: en,
        de: de,
      });

    // do an update on app start
    // it will fetch all new strings from the dashboard
    // for the current language
    await Applanga.update();

    // get all strings for the current language into a map
    // strings which are not translated for the current language
    // will contain the fallback language (your baselanguage)
    // IMPORTANT: All strings which are coming back here have to be on the dashboard
    // if you want to have a local fallback you have to implement it yourself
    // look at the getString method below for an example
    translationMap = await Applanga.localizedStringsForCurrentLanguage();
  } catch (e) {
    console.error(e);
  }

  callback();
}

// this method only works aynchronously
async function getStringWithArgumentsAsync(key, value, args) {
  return Applanga.getStringWithArguments(key, value, args);
}

// get string is a simple wrapper for the translation map
function getString(key) {
    var translation = translationMap[key];
    if((typeof translation === 'undefined') || translation === ""){
        return en[key]
    }
    return translation
}

// set language set's the language for the applanga sdk
// and does an update for this language immediately 
// then it updates our translation map
async function setLanguage(lang){
    await Applanga.setLanguageAndUpdate(lang);
    translationMap = await Applanga.localizedStringsForCurrentLanguage();
}

export {initLocalisations, setLanguage, getString, getStringWithArgumentsAsync};
