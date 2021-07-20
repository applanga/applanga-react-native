import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, NativeModules, ActivityIndicator} from 'react-native';
import {Applanga} from 'applanga-react-native';
import {initLocalisations,getString, localizeMap, getStringWithArgumentsAsync} from './LocalisationManager.js';

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

    async setStrings() {
        console.log(getString("test-2-draft-mode-show"));
        this.titleText = getString("test-1")
        this.showDraftModeText = getString("test-2-draft-mode-show")
        this.showScreenshotText = getString("test-3-show-screenshot-menu")
        this.hideScreenshotText = getString("test-4-hide-screenshot-menu")
        this.enableShowIdMode = getString("test-5-enable-show-id-mode")
        this.disableShowIdMode = getString("test-6-disable-show-id-mode")
    }

	constructor(){
		super();
		this.state = {
      		applangaInitialized: false,
      		recreateViews:true,
		}
		
		initLocalisations(async () =>{
			await this.setStrings();   
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
                <Button
		          	title={this.enableShowIdMode}
		          	onPress={async () => {
                          await Applanga.setShowIdModeEnabled(true);
                          await localizeMap();
                          this.setStrings();
                          this.setState({});
                        }
                    }
		        />
                <Button
		          	title={this.disableShowIdMode}
		          	onPress={async () => {
                          await Applanga.setShowIdModeEnabled(false);
                          await localizeMap();
                          this.setStrings();
                          this.setState({});
                        }
                    }
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
