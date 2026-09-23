package com.applanga.android.react;

import com.applanga.android.Applanga;
import com.facebook.fbreact.specs.NativeApplangaSpec;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class ApplangaModule extends NativeApplangaSpec {
    public ApplangaModule(ReactApplicationContext context) {
        super(context);
        Applanga.init(context);
    }

    @Override
    public void setShowIdModeEnabled(boolean enabled, Promise promise) {
        ApplangaModuleImpl.setShowIdModeEnabled(enabled, promise);
    }

    @Override
    public void showDraftModeDialog() {
        ApplangaModuleImpl.showDraftModeDialog(getCurrentActivity());
    }

    @Override
    public void showScreenShotMenu() {
        ApplangaModuleImpl.setScreenShotMenuVisible(getCurrentActivity(), true);
    }

    @Override
    public void hideScreenShotMenu() {
        ApplangaModuleImpl.setScreenShotMenuVisible(getCurrentActivity(), false);
    }

    @Override
    public void setLanguage(String language, Promise promise) {
        ApplangaModuleImpl.setLanguage(language, promise);
    }

    @Override
    public void setLanguageAndUpdate(String language, Promise promise) {
        ApplangaModuleImpl.setLanguageAndUpdate(language, promise);
    }

    @Override
    public void getString(String key, String defaultValue, Promise promise) {
        ApplangaModuleImpl.getString(key, defaultValue, promise);
    }

    @Override
    public String getLocalizedValue(String key, String defaultValue) {
        return ApplangaModuleImpl.getLocalizedValue(key, defaultValue);
    }

    @Override
    public void getStringWithArguments(String key, String defaultValue, ReadableMap args, Promise promise) {
        ApplangaModuleImpl.getStringWithArguments(key, defaultValue, args, promise);
    }

    @Override
    public void update(ReadableArray languages, Promise promise) {
        ApplangaModuleImpl.update(languages, promise);
    }

    @Override
    public void localizedStringsForCurrentLanguage(Promise promise) {
        ApplangaModuleImpl.localizedStringsForCurrentLanguage(promise);
    }

    @Override
    public void localizeMap(ReadableMap map, Promise promise) {
        ApplangaModuleImpl.localizeMap(map, promise);
    }

    @Override
    public void localizeMapI18NextJsonV4(ReadableMap map, Promise promise) {
        ApplangaModuleImpl.localizeMapI18NextJsonV4(map, promise);
    }
}
