package com.applanga.android.react;

import com.applanga.android.Applanga;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class ApplangaModule extends ReactContextBaseJavaModule {
    public ApplangaModule(ReactApplicationContext context) {
        super(context);
        Applanga.init(context);
    }

    @Override
    public String getName() {
        return ApplangaModuleImpl.NAME;
    }

    @ReactMethod
    public void setShowIdModeEnabled(boolean enabled, Promise promise) {
        ApplangaModuleImpl.setShowIdModeEnabled(enabled, promise);
    }

    @ReactMethod
    public void showDraftModeDialog(Promise promise) {
        ApplangaModuleImpl.showDraftModeDialog(getCurrentActivity());
        promise.resolve(null);
    }

    @ReactMethod
    public void showScreenShotMenu(Promise promise) {
        ApplangaModuleImpl.setScreenShotMenuVisible(getCurrentActivity(), true);
        promise.resolve(null);
    }

    @ReactMethod
    public void hideScreenShotMenu(Promise promise) {
        ApplangaModuleImpl.setScreenShotMenuVisible(getCurrentActivity(), false);
        promise.resolve(null);
    }

    @ReactMethod
    public void setLanguage(String lang, Promise promise) {
        ApplangaModuleImpl.setLanguage(lang, promise);
    }

    @ReactMethod
    public void setLanguageAndUpdate(String lang, Promise promise) {
        ApplangaModuleImpl.setLanguageAndUpdate(lang, promise);
    }

    @ReactMethod
    public void getString(String s, String d, Promise promise) {
        ApplangaModuleImpl.getString(s, d, promise);
    }

    @ReactMethod
    public void getStringWithArguments(String s, String d, ReadableMap a, Promise promise) {
        ApplangaModuleImpl.getStringWithArguments(s, d, a, promise);
    }

    @ReactMethod
    public void update(ReadableArray languages, Promise promise) {
        ApplangaModuleImpl.update(languages, promise);
    }

    @ReactMethod
    public void localizedStringsForCurrentLanguage(Promise promise) {
        ApplangaModuleImpl.localizedStringsForCurrentLanguage(promise);
    }

    @ReactMethod
    public void localizeMap(ReadableMap map, Promise promise) {
        ApplangaModuleImpl.localizeMap(map, promise);
    }

    @ReactMethod
    public void localizeMapI18NextJsonV4(ReadableMap map, Promise promise) {
        ApplangaModuleImpl.localizeMapI18NextJsonV4(map, promise);
    }
}
