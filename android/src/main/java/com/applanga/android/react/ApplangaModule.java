package com.applanga.android.react;

import android.util.Log;
import android.widget.Toast;

import com.applanga.android.ApplangaCallback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import com.applanga.android.Applanga;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ApplangaModule extends ReactContextBaseJavaModule {
    
    public ApplangaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    
    @Override
    public String getName() {
        return "Applanga";
    }
    
    public static boolean applangaInitialised = false;
    
    public void applangaInit(){
        Applanga.init(getCurrentActivity());
        applangaInitialised = true;
    }

    @ReactMethod
    public void getString(String s, String d, Promise promise){
        if(!applangaInitialised){
            applangaInit();
        }
        promise.resolve(Applanga.getString(s, d));
    }
    @ReactMethod
    public void update(final Promise promise){
        if(!applangaInitialised){
            applangaInit();
        }
        Applanga.update(new ApplangaCallback() {
            @Override
            public void onLocalizeFinished(boolean b) {
               promise.resolve(b);
            }
        });
    }
    
    @ReactMethod
    public void localizeMap(ReadableMap map, Promise promise){   
        if(!applangaInitialised){
            applangaInit();
        }
        promise.resolve(toWritableMap(Applanga.localizeMap(toHashMap(map))));
    }
    
    private static HashMap<String, HashMap<String, String>> toHashMap(ReadableMap map){
        ReadableMapKeySetIterator it = map.keySetIterator();
        HashMap<String, HashMap<String,String>> hashMap = new HashMap<>();
    
        while(it.hasNextKey()){
            String lang = it.nextKey();
            //Log.e("localizeMap", "lang = " + lang);
            ReadableMap langMap = map.getMap(lang);
            ReadableMapKeySetIterator langMapIt = langMap.keySetIterator();
            HashMap<String, String> langHashMap = new HashMap<>();
            while (langMapIt.hasNextKey()){
                String id = langMapIt.nextKey();
                //Log.e("localizeMap", "id = " + id);
                String value = langMap.getString(id);
                //Log.e("localizeMap", "value = " + value);
                langHashMap.put(id, value);
            }
            hashMap.put(lang, langHashMap);
        }
        return hashMap;
    }
    
    public static WritableMap toWritableMap(HashMap<String, HashMap<String, String>> map) {
        WritableMap writableMap = Arguments.createMap();
    
        for(Map.Entry<String, HashMap<String,String>> lang : map.entrySet()){
            WritableMap writableMapLang = Arguments.createMap();
            for(Map.Entry<String,String> string : map.get(lang.getKey()).entrySet()){
                writableMapLang.putString(string.getKey(), string.getValue());
            }
            writableMap.putMap(lang.getKey(), writableMapLang);
        }
        return writableMap;
    }
}