/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, NativeModules, ActivityIndicator} from 'react-native';
import {Applanga} from 'applanga-react-native';

const styles = StyleSheet.create({

  buttonHolder: {
   	flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3199D5',
    height: 400
  },
  baseText: {
    fontFamily: 'Cochin',
    color: 'white',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
  
});

export default class App extends Component {

	constructor(){
		super();

		console.log("Applanga Starting init");
		
		this.state = {
      		applangaInitialized: false,
      		recreateViews:true,
		}
		
		applangaInit(() =>{
				Applanga.getString("title_test","default").then((data) => {
				this.titleText = data;
				this.setState({applangaInitialized: true});
		    });
    	});
	}
 
  	render() {
		if(this.state.applangaInitialized)
		{
			return(
      		<View style={styles.buttonHolder}>
          		<Text style={styles.titleText}>
          			{this.titleText}
          		</Text>
		        <Button
		          	title="Show Draft Menu"
		          	onPress={() => Applanga.showDraftModeDialog()}
		        />
		        <Button
		          	title="Show Screen Shot Menu"
		          	onPress={() => Applanga.showScreenShotMenu()}
		        />
		        <Button
		          	title="Hide Screen Shot Menu"
		          	onPress={() => Applanga.hideScreenShotMenu()}
		        />         
      		</View>
      	);
		}
		else
		{
			return(
	      		<View style={styles.buttonHolder}>
			      	<Text style={styles.titleText}>
			          	"Waiting for applanga to init"
			        </Text>		             
	      		</View>
      		);
		}
  	}
}

	async function applangaInit(callback){
	  var result;
	  try{
	    await Applanga.update()
	    result = await Applanga.localizeMap(
			{
				"en": {
					"title_test": "this is the original title text",
				}
			})
	  } catch (e) {
	    console.error(e);
	  }
	  callback(result);
	}




