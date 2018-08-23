//
//  ApplangaReactNative.m
//  ApplangaReactNative
//
//  Created by Leonard Arnold on 03.07.18.
//  Copyright © 2018 Applanga. All rights reserved.
//

#import "ApplangaReactNative.h"
#import <React/RCTLog.h>


/*#if __has_include(<Applanga/Applanga.h>)
#import <Applanga/Applanga.h>
#elif __has_include(<Applanga.h>)
#import <Applanga.h>
#elif __has_include("Applanga/Applanga.h")
#import "Applanga/Applanga.h"
#elif __has_include("Applanga.h")
#import "Applanga.h"
#else
*/
//no include found we just redeclare what we need and let the linker do the rest
@interface Applanga : NSObject

+ (NSString*)localizedStringForKey:(NSString*)key withDefaultValue:(NSString*)value;

+ (NSDictionary*) localizeMap:(NSDictionary*)map;

+ (void)updateWithCompletionHandler:(void (^)(BOOL success))completionHandler;

+ (BOOL)setLanguage:(NSString*)language;

@end

//#endif

@implementation Applanga (ApplangaReactNative)

+ (bool)isReactDev {
#if RCT_DEV
    return true;
#else
    return false;
#endif
}

+ (bool)isReactDebug {
#if RCT_DEBUG
    return true;
#else
    return false;
#endif
}
@end


//https://stackoverflow.com/questions/29771622/react-native-how-to-export-a-method-with-a-return-value
//https://facebook.github.io/react-native/docs/native-modules-ios.html
//https://dashboard.applanga.com/#!/mobile-apps/57acebda5da7f30532e07f6e/languages/57acebda5da7f30532e07f6f/entry//group/




@implementation ApplangaReactNative

// To export a module named Applanga
RCT_EXPORT_MODULE(Applanga);

RCT_REMAP_METHOD(getString,
                 key: (NSString *)key
                 withDefaultValue: (NSString *) value
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
    resolve([Applanga localizedStringForKey:key withDefaultValue:value]);
}

RCT_REMAP_METHOD(localizeMap,
                 map:(NSDictionary *)map
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([Applanga localizeMap: map]);
}

RCT_REMAP_METHOD(update,
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [Applanga updateWithCompletionHandler:^(BOOL success) {
        NSNumber *result=[NSNumber numberWithBool:success];

        resolve(result);
    }];
}

RCT_REMAP_METHOD(setLanguage,
                 lang: (NSString *)lang
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
    NSNumber *result = [NSNumber numberWithBool:([Applanga setLanguage:lang])];
    resolve(result);
}

@end
