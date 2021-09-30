# applanga-react-native

A React Native library for Applanga

## Installation
### 1. Add the Applanga native SDKs to your Project

#### Android

1. Download the *Applanga Settings File* for your app from the Applanga App Overview by clicking the ***[Prepare Release]*** button and then clicking ***[Get Settings File]***. 

Add the *Applanga Settings File* to your android resources res/raw directory

2. Add the following to your build.gradle file

```gradle
    repositories {
        maven { url 'https://maven.applanga.com/'}
        maven { url 'https://jitpack.io' }
    }
    dependencies {
        implementation 'com.applanga.android:Applanga:3.0.134'
    }
```

3. Add the permission **android.permission.INTERNET** in your **AndroidManifest.xml** file to allow your App internet access, which is needed for Applanga to function.

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

#### iOS

1. Download the *Applanga Settings File* for your app from the App Overview in the dashboard by clicking the ***[Prepare Release]*** button and then clicking ***[Get Settings File]***.
 
Add the *Applanga Settings File* to your apps resources. It will be automatically loaded.

2. insert this line of code: `pod 'Applanga'` to your iOS podfile

3. Once you have done so, re-run **pod install** from the command line.

### 2. Add applanga-react-native

 - `npm install applanga-react-native --save`
 - `react-native link applanga-react-native`

For iOS, Add `pod 'ApplangaReactNative', :path => '../node_modules/applanga-react-native/ios/ApplangaReactNative.podspec'` to your podfile dependencies

Then run pod install again


## Usage

#### 0. The Example app

In this repo you will find an example app named 'BasicExampleApp'. In this app you will find examples of all techniques explained below. We reccomend taking a look, particularly at the string file mapping and init process, before you start using the plugin in your own project. 


#### 1. Understanding the flow of the ApplangaSDK

The applanga_settings.applanga file, that you added to your app earlier in this process, contains all the languages and translations that are present in the Applanga dashboard at the time you download the file. This data is then entered into a database on the device.

When your app launches and the ApplangaSDK is initialised, the SDK pulls the latest translations for the current app language and the base (default) language, and then updates those languages in the database.

Other languages are not automatically updated as this would mean potentially pulling data that is not required.

If you wish to trigger an update, and pull the latest data, after the init process then you can use the method:

`Applanga.update()`

This fetches changes from the dashboard (of the current app language and the base language) and updates the local Applanga Database. You have to rerender your UI to see latest changes. Be aware that due to our CDN-Caching it can take up to 10 minutes before new translations are avalable from the dashboard.

#### **Note**: *React Native bridge is asynchronous. So all Methods are asynchronous calls.*

#### 2. Import
`import {Applanga} from 'applanga-react-native'`

#### 3. Initialisation

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
 
#### 4. Get a String

You can get the localised value of a string Using the following method:

`async Applanga.getString("string\_key", "default\_message")`

If *string\_key* does not exists, *default\_message* gets uploaded to the applanga dashboard (See the Debug String Upload section of this doc for more info regarding string upload).

As this call is async, it might not always be convinient, so we advise localising a map(json object), as explained in the next section. Check the BasicExampleApp in this repo for a good example of this.


#### 5. Localize a Map

With `async Applanga.localizeMap(map);` you can translate a collection of json objects all in one go. So an optimal setup would be to have the strings for each language in json objects (perhaps in seperate files) and then call Applanga.localizeMap on those objects after applanga has finished initialising. Then after that you can get the translations from those objects immidiatly instead of asynchronously.

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

Check our ExampleApp included in this repo to see a clear and simple example of using localizeMap to translate all strings on startup and make them accessable syncronously.

#### 6. Set Language

By Default, the ApplangaSDK will use the devices current language. But if you wish to you can set the language manually using the Set Language method.

##### Applanga.setLanguage(string language)

If you want to make sure that you have the very latest changes from the dashboard, then you should call `Applanga.update();` after setting the language as this will pull all the latest changes for the newly selected language.

#### 7. Set Language and Update (Recommended)

This is the recommended option by the Applanga Team. Its combine the Set Language functionality to set the language manually and the Update functionality to get the the very latest changes from the dashboard. To use this method you should call `Applanga.SetLanguageAndUpdate(String Language);`


#### 8. Draft Mode & Localisation Screenshots

To show the applanga [draft mode](https://www.applanga.com/docs/translation-management-dashboard/draft_on-device-testing) and screen shot menus you can either use the following methods, or follow the native documentation for each platform to implement showing the menues using gestures.

Show the applanga draft mode activation popup:

##### Applanga.showDraftModeDialog()

Show and hide the applanga screenshot and tag picker popup (Draft mode must be active for these menus to appear):

##### Applanga.showScreenShotMenu() & Applanga.hideScreenShotMenu()

You can read more about tags here : [Manage Tags](https://applanga.com/docs#manage_tags) and about screenshots here: 	[Uploading screenshots](https://applanga.com/docs#uploading_screenshots).

#### 9. Debug String Upload

Strings from `Applanga.getString(String, String)` and Strings which are located in the map of `Applanga.localizeMap(map)`, will be uploaded if the app is in debug mode and fulfill one of the two points: They are non existent on the Applanga Dashboard or the target text is empty.
##### Debug mode for iOS
Open your ios/\*.xcodeproj or ios/\*.xcworkspace in XCode and run your app.

##### Debug mode for Android
Open Android Studio, File - Open. android/ directory. Run "Debug 'app'".
