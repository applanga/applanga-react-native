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
        maven { url 'https://raw.github.com/applanga/sdk-android/master/maven/releases/'}
        maven { url 'https://jitpack.io' }
    }
    dependencies {
        implementation 'com.applanga.android:Applanga:3.0.1'
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

For iOS, Add `pod 'ApplangaReactNative', :path => '../node_modules/applanga-react-native/ios/ApplangaReactNative.podspec'` to your podfile dependancies

Then run podinstall again


### 3. Usage

#### 3.1 Import
`import {Applanga} from 'applanga-react-native'`
 If the previous line is not working, you should see an error message: "*applanga-react-native module is not correctly linked*".
 
#### 3.2 Methods

**Note**: *React Native bridge is asynchronous. So all Methods are asynchronous calls.*

##### Applanga.getString("string\_key", "default\_message")
If *string\_key* does not exists, *default\_message* gets uploaded (see topic *String Upload*)

##### Applanga.getUpdate()
Fetches changes from the dashboard and updates the local Applanga Database. You have to rerender your UI to see latest changes. Be aware that due to our CDN-Caching it can take up to 15 minutes to be able to fetch new translations.

##### Applanga.localizeMap(map) (recommended)

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

##### Applanga.showDraftModeDialog()
Show the applanga draft mode activation popup

##### Applanga.showScreenShotMenu() & Applanga.hideScreenShotMenu()
Show and hide the applanga screenshot and tag picker popup

#### 3.3 String Upload
Strings from `Applanga.getString(String, String)` and Strings which are located in the map of `Applanga.localizeMap(map)`, will be uploaded if the app is in debug mode and fulfill one of the two points: They are non existent on the Applanga Dashboard or the target text is empty.
##### Debug mode for iOS
Open your ios/\*.xcodeproj or ios/\*.xcworkspace in XCode and run your app.

##### Debug mode for Android
Open Android Studio, File - Open. android/ directory. Run "Debug 'app'".
