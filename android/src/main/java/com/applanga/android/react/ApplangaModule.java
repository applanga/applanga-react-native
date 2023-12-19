package com.applanga.android.react;

import android.util.Log;

import com.applanga.android.ApplangaCallback;
import com.applanga.android.$InternalALPlugin;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import com.applanga.android.Applanga;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ApplangaModule extends ReactContextBaseJavaModule {
    private static String TAG = "applanga";
    
    public ApplangaModule(ReactApplicationContext context) {
        super(context);
        Applanga.init(context);
    }
    
    @Override
    public String getName() {
        return "Applanga";
    }
    
    @ReactMethod
    public void setShowIdModeEnabled(boolean enabled, final Promise promise) {
        try {
            Applanga.setShowIdModeEnabled(enabled);
            promise.resolve(null);
        } catch (Exception error) {
            promise.reject(error);
        }
    }
    
    @ReactMethod
    public void showDraftModeDialog(final Promise promise) {
        try {
            getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Applanga.showDraftModeDialog(getCurrentActivity());
                }
            });
            promise.resolve(null);
        } catch (Exception error) {
            promise.reject(error);
        }
    }
    
    @ReactMethod
    public void showScreenShotMenu(final Promise promise) {
        try {
            getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Applanga.setScreenShotMenuVisible(true);
                }
            });
            promise.resolve(null);
        } catch (Exception error) {
            promise.reject(error);
        }
    }
    
    @ReactMethod
    public void hideScreenShotMenu(final Promise promise) {
        try {
            getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Applanga.setScreenShotMenuVisible(false);
                }
            });
            promise.resolve(null);
        } catch (Exception error) {
            promise.reject(error);
        }
    }
    
    @ReactMethod
    public void setLanguage(String lang, Promise promise) {
        try {
            promise.resolve(Applanga.setLanguage(lang));
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void setLanguageAndUpdate(String lang, final Promise promise) {
        try {
            Applanga.setLanguageAndUpdate(lang, new ApplangaCallback() {
                @Override
                public void onLocalizeFinished(boolean succeeded) {
                    promise.resolve(succeeded);
                }
            });
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void getString(String s, String d, Promise promise) {
        try {
            promise.resolve(Applanga.getString(s, d));
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void getStringWithArguments(String s, String d, ReadableMap a, Promise promise) {
        try {
            promise.resolve(Applanga.getString(s, d, convertReadableMapToMap(a)));
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void update(final Promise promise) {
        try {
            Applanga.update(new ApplangaCallback() {
                @Override
                public void onLocalizeFinished(boolean succeeded) {
                    promise.resolve(succeeded);
                }
            });
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void update(ReadableArray languages, final Promise promise) {
        ArrayList<String> langs = new ArrayList<>();
        for (int i = 0; i < languages.size(); i++) {
            langs.add(languages.getString(i));
        }
        try {
            Applanga.update(null, langs,
                    new ApplangaCallback() {
                        @Override
                        public void onLocalizeFinished(boolean succeeded) {
                            promise.resolve(succeeded);
                        }
                    });
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    
    @ReactMethod
    public void localizedStringsForCurrentLanguage(Promise promise) {
        
        try {
            Map<String, String> map = $InternalALPlugin.localizedStringsForCurrentLanguage();
            Iterator it = map.keySet().iterator();
            WritableMap writableMap = Arguments.createMap();
            while (it.hasNext()) {
                String key = it.next().toString();
                String value = map.get(key);
                writableMap.putString(key, value);
            }
            promise.resolve(writableMap);
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void localizeMap(ReadableMap map, Promise promise) {
        try {
            promise.resolve(toWritableMap(Applanga.localizeMap(toHashMap(map, false)), false));
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    @ReactMethod
    public void localizeMapI18NextJsonV4(ReadableMap map, Promise promise) {
        try {
            promise.resolve(toWritableMap(Applanga.localizeMap(toHashMap(map, true)), true));
        } catch (Exception error) {
            promise.reject(TAG, error.getMessage(), error);
        }
    }
    
    private Map<String, Object> convertReadableMapToMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Map<String, Object> deconstructedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                case Boolean:
                    deconstructedMap.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    deconstructedMap.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;
                case Map:
                    deconstructedMap.put(key, convertReadableMapToMap(readableMap.getMap(key)));
                    break;
                case Array:
                    deconstructedMap.put(key, convertReadableArrayToList(readableMap.getArray(key)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }
            
        }
        return deconstructedMap;
    }
    
    private List<Object> convertReadableArrayToList(ReadableArray readableArray) {
        List<Object> deconstructedList = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType indexType = readableArray.getType(i);
            switch (indexType) {
                case Null:
                    deconstructedList.add(i, null);
                    break;
                case Boolean:
                    deconstructedList.add(i, readableArray.getBoolean(i));
                    break;
                case Number:
                    deconstructedList.add(i, readableArray.getDouble(i));
                    break;
                case String:
                    deconstructedList.add(i, readableArray.getString(i));
                    break;
                case Map:
                    deconstructedList.add(i, convertReadableMapToMap(readableArray.getMap(i)));
                    break;
                case Array:
                    deconstructedList.add(i, convertReadableArrayToList(readableArray.getArray(i)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object at index " + i + ".");
            }
        }
        return deconstructedList;
    }
    
    private static HashMap<String, HashMap<String, String>> toHashMap(ReadableMap map, boolean isI18NextJsonV4) {
        ReadableMapKeySetIterator it = map.keySetIterator();
        HashMap<String, HashMap<String, String>> hashMap = new HashMap<>();
        
        while (it.hasNextKey()) {
            String lang = it.nextKey();
            ReadableMap langMap = map.getMap(lang);
            if (langMap == null) continue;
            ReadableMapKeySetIterator langMapIt = langMap.keySetIterator();
            HashMap<String, String> langHashMap = new HashMap<>();
            while (langMapIt.hasNextKey()) {
                final String id = langMapIt.nextKey();
                final String type = langMap.getType(id).name();
                if (!isI18NextJsonV4) {
                    langHashMap.put(id, langMap.getString(id));
                } else {
                    String transformedId = id;
                    Pattern pluralsPattern = Pattern.compile("(.*)_(zero|one|two|few|many|other)$");
                    Matcher pluralsMatcher = pluralsPattern.matcher(id);
                    if (pluralsMatcher.find()) {
                        transformedId = pluralsMatcher.group(1) + "[" + pluralsMatcher.group(2) + "]";
                    }
                    if (type.equals("String")) {
                        String value = langMap.getString(id);
                        langHashMap.put(transformedId, value);
                    } else if (type.equals("Array")) {
                        ReadableArray array = langMap.getArray(id);
                        if (array == null) continue;
                        for (int i = 0; i < array.size(); i++) {
                            String value = array.getString(i);
                            String arrayId = id + "[" + i + "]";
                            langHashMap.put(arrayId, value);
                        }
                    }
                }
            }
            hashMap.put(lang, langHashMap);
        }
        return hashMap;
    }
    
    private static WritableMap toWritableMap(HashMap<String, HashMap<String, String>> map, boolean isI18NextJsonV4) {
        WritableMap writableMap = Arguments.createMap();
        
        for (Map.Entry<String, HashMap<String, String>> lang : map.entrySet()) {
            WritableMap writableMapLang = Arguments.createMap();
            HashMap<String, String[]> arrayMap = new HashMap<>();
            for (Map.Entry<String, String> string : map.get(lang.getKey()).entrySet()) {
                if (!isI18NextJsonV4) {
                    writableMapLang.putString(string.getKey(), string.getValue());
                } else {
                    final String id = string.getKey();
                    String transformedId = id;
                    Pattern pluralsPattern = Pattern.compile("(.*)\\[(zero|one|two|few|many|other)\\]$");
                    Matcher pluralsMatcher = pluralsPattern.matcher(id);
                    if (pluralsMatcher.find()) {
                        transformedId = pluralsMatcher.group(1) + "_" + pluralsMatcher.group(2);
                        writableMapLang.putString(transformedId, string.getValue());
                        continue;
                    }
                    Pattern arrayPattern = Pattern.compile("(.*)\\[(\\d+)\\]$");
                    Matcher arrayMatcher = arrayPattern.matcher(id);
                    if (arrayMatcher.find()) {
                        transformedId = arrayMatcher.group(1);
                        if (transformedId == null) {
                            Log.w("ApplangaModule", "LocalizeMap transformedId is null");
                            continue;
                        }
                        if (arrayMap.get(transformedId) == null) {
                            arrayMap.put(transformedId, new String[]{string.getValue()});
                        } else {
                            String[] array = arrayMap.get(transformedId);
                            String[] newArray = Arrays.copyOf(array, array.length + 1);
                            newArray[array.length] = string.getValue();
                            arrayMap.put(transformedId, newArray);
                        }
                        continue;
                    }
                    writableMapLang.putString(transformedId, string.getValue());
                }
            }
            for (Map.Entry<String, String[]> array : arrayMap.entrySet()) {
                writableMapLang.putArray(array.getKey(), Arguments.fromArray(array.getValue()));
            }
            writableMap.putMap(lang.getKey(), writableMapLang);
        }
        return writableMap;
    }
}
