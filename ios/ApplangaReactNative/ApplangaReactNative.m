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

+ (NSString*)localizedStringForKey:(NSString*)key withDefaultValue:(NSString*)value andArguments:(NSDictionary*)arguments;

+ (NSDictionary*) localizeMap:(NSDictionary*)map;

+ (NSDictionary*) localizeMapI18NextJsonV4:(NSDictionary*)map;

+ (NSDictionary*) localizedStringsForCurrentLanguage;

+ (void)updateWithCompletionHandler:(void (^)(BOOL success))completionHandler;

+ (void)updateGroups:(NSArray*)groups andLanguages:(NSArray*)languages withCompletionHandler:(void (^)(BOOL success))completionHandler;

+ (void)setShowIdModeEnabled:(BOOL)enabled;
+ (void)showDraftModeDialog;

+ (BOOL)setScreenShotMenuVisible:(BOOL)visible;

+ (BOOL)setLanguage:(NSString*)language;

+ (void)setLanguageAndUpdate:(NSString*)language withCompletionHandler:(void (^)(BOOL success))completionHandler;

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

RCT_REMAP_METHOD(getStringWithArguments,
                 key: (NSString *)key
                 withDefaultValue: (NSString *) value
                 andArguments:(NSDictionary*)arguments
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
    resolve([Applanga localizedStringForKey:key withDefaultValue:value andArguments:arguments]);
}

RCT_REMAP_METHOD(localizeMap,
                 map:(NSDictionary *)map
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([Applanga localizeMap: map]);
}

RCT_REMAP_METHOD(localizeMapI18NextJsonV4,
                 m:(NSDictionary *)m
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSEnumerator *enumerator = [m keyEnumerator];
    NSMutableDictionary<NSString *, NSMutableDictionary<NSString *, NSString *> *> *cleaneadMap = [NSMutableDictionary dictionary];
    
    NSString *lang;
    while ((lang = [enumerator nextObject])) {
        NSDictionary *langMap = [m objectForKey:lang];
        if (!langMap) continue;
        
        NSEnumerator *langMapEnumerator = [langMap keyEnumerator];
        NSMutableDictionary<NSString *, NSString *> *langHashMap = [NSMutableDictionary dictionary];
        
        NSString *id;
        while ((id = [langMapEnumerator nextObject])) {
            NSString *value = [langMap objectForKey:id] ;
            NSString *transformedId = id;
            NSError *error = NULL;
            NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"(.*)_(zero|one|two|few|many|other)$" options:NSRegularExpressionCaseInsensitive error:&error];
            NSTextCheckingResult *match = [regex firstMatchInString:id options:0 range:NSMakeRange(0, [id length])];
            
            if (match) {
                transformedId = [NSString stringWithFormat:@"%@[%@]", [id substringWithRange:[match rangeAtIndex:1]], [id substringWithRange:[match rangeAtIndex:2]]];
            }
            
            if ([value isKindOfClass:[NSString class]]) {
                NSString *value = [langMap objectForKey:id];
                [langHashMap setObject:value forKey:transformedId];
            } else if ([value isKindOfClass:[NSArray class]]) {
                NSArray *array = [langMap objectForKey:id];
                if (!array) continue;
                
                for (NSUInteger i = 0; i < [array count]; i++) {
                    NSString *value = [array objectAtIndex:i];
                    NSString *arrayId = [NSString stringWithFormat:@"%@[%lu]", id, (unsigned long)i];
                    [langHashMap setObject:value forKey:arrayId];
                }
            }
        }
        [cleaneadMap setObject:langHashMap forKey:lang];
    }
    
    // get the map from applanga back
    NSDictionary* updatedMap = [[Applanga localizeMap: cleaneadMap] mutableCopy];
    NSMutableDictionary* transformedUpdatedMap = [NSMutableDictionary dictionary];
    
    for (NSString *langKey in updatedMap) {
        NSMutableDictionary<NSString *, NSObject *> *writableMapLang = [NSMutableDictionary dictionary];
        NSMutableDictionary<NSString *, NSMutableArray<NSString *> *> *arrayMap = [NSMutableDictionary dictionary];
        
        NSDictionary<NSString *, NSString *> *lang = updatedMap[langKey];
        
        for (NSString *stringKey in lang) {
            NSString *value = lang[stringKey];
            
            NSString *id = stringKey;
            NSString *transformedId = id;
            
            NSRegularExpression *pluralsRegex = [NSRegularExpression regularExpressionWithPattern:@"(.*)\\[(zero|one|two|few|many|other)\\]$" options:0 error:nil];
            NSTextCheckingResult *pluralsMatch = [pluralsRegex firstMatchInString:id options:0 range:NSMakeRange(0, id.length)];
            
            if (pluralsMatch) {
                transformedId = [NSString stringWithFormat:@"%@_%@", [id substringWithRange:[pluralsMatch rangeAtIndex:1]], [id substringWithRange:[pluralsMatch rangeAtIndex:2]]];
                writableMapLang[transformedId] = value;
                continue;
            }
            
            NSRegularExpression *arrayRegex = [NSRegularExpression regularExpressionWithPattern:@"(.*)\\[(\\d+)\\]$" options:0 error:nil];
            NSTextCheckingResult *arrayMatch = [arrayRegex firstMatchInString:id options:0 range:NSMakeRange(0, id.length)];
            
            if (arrayMatch) {
                transformedId = [id substringWithRange:[arrayMatch rangeAtIndex:1]];
                
                if (!transformedId) {
                    NSLog(@"LocalizeMap transformedId is null");
                    continue;
                }
                
                if (!arrayMap[transformedId]) {
                    arrayMap[transformedId] = [NSMutableArray arrayWithObject:value];
                } else {
                    [arrayMap[transformedId] addObject:value];
                }
                continue;
            }
            writableMapLang[transformedId] = value;
        }
        for (NSString *arrayKey in arrayMap) {
            writableMapLang[arrayKey] = arrayMap[arrayKey];
        }
        transformedUpdatedMap[langKey] = writableMapLang;
    }
    resolve(transformedUpdatedMap);
}

RCT_REMAP_METHOD(localizedStringsForCurrentLanguage,
                 findEventsWthResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([Applanga localizedStringsForCurrentLanguage]);
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

RCT_REMAP_METHOD(update,
                 languages: (NSArray*) languages
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [Applanga updateGroups:nil andLanguages:languages withCompletionHandler:^(BOOL success) {
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

RCT_REMAP_METHOD(setLanguageAndUpdate,
                 language: (NSString *)language
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
                 {
                    [Applanga setLanguageAndUpdate:language withCompletionHandler:^(BOOL success) {
                        NSNumber *result=[NSNumber numberWithBool:success];
                        resolve(result);
                    }];
}

RCT_REMAP_METHOD(setShowIdModeEnabled, 
                 enabled: (BOOL)enabled
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
    [Applanga setShowIdModeEnabled:enabled];
    resolve(nil);
}

RCT_EXPORT_METHOD(showDraftModeDialog)
{
     dispatch_sync(dispatch_get_main_queue(), ^{
        [Applanga showDraftModeDialog];
    });
}

RCT_EXPORT_METHOD(showScreenShotMenu)
{
    dispatch_sync(dispatch_get_main_queue(),  ^{
        [Applanga setScreenShotMenuVisible:true];
    });
}

RCT_EXPORT_METHOD(hideScreenShotMenu)
{
    dispatch_sync(dispatch_get_main_queue(),  ^{
        [Applanga setScreenShotMenuVisible:false];
    });
}

@end
