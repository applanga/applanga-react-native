# applanga-react-native

A React Native library for Applanga

## Installation
### 1. Add Applanga to your Project
- First, set up Applanga in your app as instructed on [applanga.com](https://www.applanga.com/docs-integration). This includes setting up the Applanga-SDK and the Applanga Settings File, for both *Android* and *iOS*.

### 2. Add applanga-react-native

 - `npm install applanga-react-native --save`
 - `react-native link applanga-react-native`
 
### iOS with CocoaPods support
`react-native link applanga-react-native` automatically inserts `pod 'Applanga'` to your Podfile. To be more correct, replace it with `pod 'Applanga', '>= 2.0.107'`.

 1. `bundle install` to install *cocoapods-fix-react-native*
 2. `cd ios && pod install`
 - On top of the Podfile put the following line:
 `plugin 'cocoapods-fix-react-native'`
 - `pod install` again

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

#### 3.3 String Upload
Strings from `Applanga.getString(String, String)` and Strings which are located in the map of `Applanga.localizeMap(map)`, will be uploaded if the app is in debug mode and fulfill one of the two points: They are non existent on the Applanga Dashboard or the target text is empty.
##### Debug mode for iOS
Open your ios/\*.xcodeproj or ios/\*.xcworkspace in XCode and run your app.

##### Debug mode for Android
Open Android Studio, File - Open. android/ directory. Run "Debug 'app'".
