import {translations} from './i18n';

export class TranslationUtils {
  static getLanguage() {
    return document.documentElement.lang || 'en';
  }

  static translate(key, params = {}) {
    const translationString = this.getTranslationString(key);

    if (!params || Object.keys(params).length === 0) {
      return translationString;
    }

    return this.replaceParameters(translationString, params);
  }

  static getTranslationString(key) {
    const lang = this.getLanguage();
    const keys = key.split('.');

    let result = translations[lang];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        result = translations['en'];
        for (const fallbackKey of keys) {
          if (result && result[fallbackKey]) {
            result = result[fallbackKey];
          } else {
            return key;
          }
        }
      }
    }

    return result;
  }

  static replaceParameters(str, params) {
    let result = str;

    Object.entries(params).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, value);
    });

    return result;
  }
}
