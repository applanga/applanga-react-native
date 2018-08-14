'use strict';

import { NativeModules } from 'react-native';
export const { Applanga } = NativeModules;

if(typeof Applanga === 'undefined'){
    console.warn('applanga-react-native module is not correctly linked');
}

export default Applanga;
