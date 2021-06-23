import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, NativeModules, ActivityIndicator} from 'react-native';
import {Applanga} from 'applanga-react-native';
import {initLocalisations,getString, getStringWithArgumentsAsync} from './LocalisationManager.js';

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
		this.state = {
      		applangaInitialized: false,
      		recreateViews:true,
		}
		
		initLocalisations(async () =>{
			this.titleText = getString("test-1")
			this.showDraftModeText = getString("test-2-draft-mode-show")
			this.showScreenshotText = getString("test-3-show-screenshot-menu")
			this.hideScreenshotText = getString("test-4-hide-screenshot-menu")
            this.stringWithArgsText = await getStringWithArgumentsAsync("test-5-string-with-args", "empty", 
            {"firstName":"John", "lastName": "Doe"})
			this.setState({applangaInitialized: true});		   
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
		          	title={this.showDraftModeText}
		          	onPress={() => Applanga.showDraftModeDialog()}
		        />
				<Button
		          	title={this.showScreenshotText}
		          	onPress={() => Applanga.showScreenShotMenu()}
		        />
				<Button
		          	title={this.hideScreenshotText}
		          	onPress={() => Applanga.hideScreenShotMenu()}
		        />
                <Text style = {styles.titleText}>
                    {this.stringWithArgsText}
                </Text>
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
