# applanga-react-native

A React Native library for Applanga

## Table of Contents

  1. [Installation](#installation)
  2. [Usage](#usage)
  3. [Optional settings](#optional-settings)
  4. [Branching](#branching)
  5. [Pluralization and String Arrays](#pluralization-and-string-arrays)
  6. [Usage of i18next](#usage-of-i18next) 

***

## Installation
Add the Applanga native SDKs to your Project

### Android

1. Download the *Applanga Settings File* for your app from the Applanga Project Overview by clicking the ***[Prepare Release]*** button and then clicking ***[Get Settings File]***. 

Add the *Applanga Settings File* to your Android resources res/raw directory.

2. Add the following to your app/build.gradle file

```gradle
    repositories {
        maven { url 'https://maven.applanga.com/'}
    }
```

### iOS

1. Download the *Applanga Settings File* for your app from the App Overview in the dashboard by clicking the ***[Prepare Release]*** button and then clicking ***[Get Settings File]***.
 
2. Add the *Applanga Settings File* to your app's resources. It will be automatically loaded.

3. Disable automatic string update on init

The iOS SDK does an automatic string update on app launch. This is not necessary with `applanga-react-native` as the string update should be done by your React Native code.
Set the following to your `Info.plist`:
```
...
<key>ApplangaInitialUpdate</key>
<false/>
...
```


4. Add applanga-react-native: `npm install applanga-react-native --save`


## Usage

### The Example app

In this repository you will find an example app named 'BasicExampleApp'. In this app, you will find examples of all techniques explained below. We recommend taking a look, particularly at the string file mapping and init process, before you start using the plugin in your own project. 


### Understanding the flow of the ApplangaSDK

The applanga_settings.applanga file, that you added to your app earlier in this process, contains all the languages and translations that are present in the Applanga dashboard at the time you download the file. This data is then entered into a database on the device.

When your app launches and the ApplangaSDK is initialised, the SDK pulls the latest translations for the current app language and the base (default) language, and then updates those languages in the database.

Other languages are not automatically updated as this would mean potentially pulling data that is not required.

If you wish to trigger an update, and pull the latest data, after the init process then you can use the method:

`Applanga.update()`

This fetches changes from the dashboard (of the current app language and the base language) and updates the local Applanga Database. You have to rerender your UI to see latest changes. Be aware that due to our CDN-Caching it can take up to 10 minutes before new translations are available from the dashboard.

**Note**: *React Native bridge is asynchronous. So all Methods are asynchronous calls.*

### Import
`import {Applanga} from 'applanga-react-native'`


### Initialization

Before the translations can be accessed you must init the ApplangaSDK by calling `Applanga.update()`.

Here is an example function that you could copy and use to handle init, and also for mapping translations (See the Localize a Map section below for more info).

```
var en = require('./strings/en.json');
var de = require('./strings/de.json');

var localisedMap;

async function applangaInit(callback){
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
    callback()
}
```
 
### Get a String

You can get the localised value of a string Using the following method:

`async Applanga.getString("string\_key", "default\_message")`

If *string\_key* does not exists, *default\_message* gets uploaded to the applanga dashboard (See the Debug String Upload section of this doc for more info regarding string upload).

As this call is async, it might not always be convenient, so we advise localising a map(json object), as explained in the next section. Check the BasicExampleApp in this repo for a good example of this.

### Get a String with arguments (New)

You can get the localised value of a string with his arguments using the following method:

`async getStringWithArgumentsAsync("string\key", "default\_message",{"argumentName":"argumentValue"})`

Example:

```
this.greetingsText = await getStringWithArgumentsAsync("greetingskey", "Hello %{userName}",{"userName":"John Doe"})
```
and then assign the greetingsText variable to a Text component in React Native

Like so:

```
<Text style = {styles.greetingText}>
    {this.greetingsText}
</Text>
```

If *string\_key* does not exists, *default\_message* gets uploaded to the applanga dashboard (See the Debug String Upload section of this doc for more info regarding string upload).



### Localize a Map

With `async Applanga.localizeMap(map);` you can translate a collection of json objects all in one go. So an optimal setup would be to have the strings for each language in json objects (perhaps in separate files) and then call Applanga.localizeMap on those objects after applanga has finished initialising. Then after that you can get the translations from those objects immediately instead of asynchronously.

Like so:

```
Applanga.localizeMap(
	{
		"en": {
			"hello_world": "Hello World"
		}, 
		"de" : {
			"hello_world": "Hallo Welt"
		}
	}
);
```

`Applanga.localizeMap(map)` returns the same map but with the actual Applanga localizations. 

Check our ExampleApp included in this repo to see a clear and simple example of using localizeMap to translate all strings on startup and make them accessible synchronously.

### Set Language

By Default, the ApplangaSDK will use the devices current language. But if you wish to you can set the language manually using the Set Language method.

`Applanga.setLanguage(string language)`

If you want to make sure that you have the very latest changes from the dashboard, then you should call `Applanga.update();` after setting the language as this will pull all the latest changes for the newly selected language.

### Set Language and Update (Recommended)

This is the recommended option by the Applanga Team. Its combine the Set Language functionality to set the language manually and the Update functionality to get the the very latest changes from the dashboard. To use this method you should call `Applanga.SetLanguageAndUpdate(String Language);`


### Draft Mode & Localisation Screenshots

To show the Applanga [draft mode](https://www.applanga.com/docs/translation-management-dashboard/draft_on-device-testing) and screenshot menus you can either use the following methods or follow the native documentation for each platform to implement showing the menus using gestures.

Show the applanga draft mode activation popup:

`Applanga.showDraftModeDialog()`

Show and hide the Applanga screenshot and tag picker popup (Draft mode must be active for these menus to appear):

`Applanga.showScreenShotMenu()` & `Applanga.hideScreenShotMenu()`

You can read more about tags here: [Manage Tags](https://applanga.com/docs#manage_tags) and about screenshots here: 	[Uploading screenshots](https://applanga.com/docs#uploading_screenshots).

### Show Id Mode

Enabling the applanga show id mode forces the SDK to return your string ids instead of string values, for all `getString()` or `localizeMap()` calls.
This should not be used in production. It is especially useful for screenshots - as all strings will be tagged correctly even the dynamic strings and strings set at runtime.

```
Applanga.setShowIdModeEnabled(true);
```

After enabling the show id mode you have to call `localizeMap()`  again and you have to refresh your view tree with `setState()`.

### Debug String Upload

Strings from `Applanga.getString(String, String)` and Strings which are located in the map of `Applanga.localizeMap(map)`, will be uploaded if the app is in debug mode and fulfill one of the two points: They are non existent on the Applanga Dashboard or the target text is empty.
#### Debug mode for iOS
Open your ios/\*.xcodeproj or ios/\*.xcworkspace in XCode and run your app.

#### Debug mode for Android
Open Android Studio, File - Open. android/ directory. Run "Debug 'app'".

## Branching

If your project is a branching project use at least SDK version 0.0.36 and update your settings files.
The settings file defines the default branch for your current app.
This branch is used on app start and for update calls.
To be sure branching is working look for the log line: `Branching is enabled.`

When enabling the Draft Mode you can switch your branch at runtime - an app restart is required.
You also can use our draft overlay to switch your current branch.
Every screenshot you take is linked to the current branch.

Already published apps that still use settings files without branching and older SDKs will still work and they will use the default branch defined on the Applanga dashboard.

To learn more about branching please have a look [here](https://www.applanga.com/docs/advanced-features/branching).

## Pluralization and String Arrays
For pluralization and string arrays, we recommend using an external library such as `i18next`.
We support its JSON v4 format so you can simply attach Applanga for over-the-air updates.
You can read more in [Usage of i18next](#usage-of-i18next).

## Usage of i18next 

With Applanga you also can use the `i18next` library.
We support the [JSON v4](https://www.i18next.com/misc/json-format#i18next-json-v4) of the language file format.
You simply pass your map to `await Applanga.localizeMapI18NextJsonV4(map)` and it returns the translated map which then has to be added to your `i18next` instance.
We have added a working example to our sample app `I18NextExample`.