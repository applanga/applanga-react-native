import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getString(key: string, defaultValue: string): Promise<string>;
  getStringWithArguments(
    key: string,
    defaultValue: string,
    args: Object,
  ): Promise<string>;
  getLocalizedValue(key: string, defaultValue: string): string;
  localizeMap(map: Object): Promise<Object>;
  localizeMapI18NextJsonV4(map: Object): Promise<Object>;
  localizedStringsForCurrentLanguage(): Promise<Object>;
  update(languages: Array<string> | null): Promise<boolean>;
  setLanguage(language: string): Promise<boolean>;
  setLanguageAndUpdate(language: string): Promise<boolean>;
  setShowIdModeEnabled(enabled: boolean): Promise<void>;
  showDraftModeDialog(): void;
  showScreenShotMenu(): void;
  hideScreenShotMenu(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Applanga');
