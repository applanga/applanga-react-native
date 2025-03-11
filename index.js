'use strict';

import { NativeModules } from 'react-native';
export const { Applanga } = NativeModules;

if(typeof Applanga === 'undefined'){
    console.warn('applanga-react-native module is not correctly linked');
}

const nativeUpdate = Applanga.update;

Applanga.update = (languages = null) => {
  return nativeUpdate(languages);
};

export default Applanga;
