//
//  ApplangaReactNative.h
//  ApplangaReactNative
//
//  Created by Leonard Arnold on 03.07.18.
//  Copyright © 2018 Applanga. All rights reserved.
//

// import RCTBridge.h
/*#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#else
#import "React/RCTBridge.h"
#endif
*/


#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include(<RCTBridgeModule.h>)
#import <RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import "React/RCTBridgeModule.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "ApplangaSpec.h"

@interface ApplangaReactNative : NSObject <NativeApplangaSpec>
#else
@interface ApplangaReactNative : NSObject <RCTBridgeModule>
#endif
@end
