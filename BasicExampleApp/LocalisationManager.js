var en = require('./strings/en.json');
var de = require('./strings/de.json');

import {Applanga} from 'applanga-react-native';
import I18n from 'react-native-i18n';

var localisedMap;

var defaultLanguage = "en"

async function initLocalisations(callback){
    try{
      await Applanga.update()
      localisedMap = await Applanga.localizeMap(
        {
            "en": en,
            "de": de
        })
        console.log("Localise map complete")
        console.log(localisedMap)
    } catch (e) {
      console.error(e);
    }


var testMap = await Applanga.localizedStringsForCurrentLanguage()
console.log("testMap: " + JSON.stringify(testMap))

    callback()
}

async function getStringWithArgumentsAsync(key, value, args){
    return Applanga.getStringWithArguments(key, value, args);
}

function getString(key)
{
    console.log("get string with key: " + key)

    deviceLocale = I18n.currentLocale().substring(0, 2)

    console.log("device lang: " + deviceLocale)

    var lang = localisedMap[deviceLocale]

    if(lang == null)
    {
        console.log("language not supported: " + deviceLocale)
        lang = localisedMap[defaultLanguage]
    }

    console.log("get lang from map")

    console.log(lang)

    var translation = lang[key]

    if(translation == null)
    {
        console.log("Key not found: " + key)
        return "Key not found: " + key
    }

    console.log("translation: " + translation)

    return translation
}

export {initLocalisations,getString,getStringWithArgumentsAsync};
