import { TranslationUtils } from "./translation-utils";
export const Localized = (superClass) => class extends superClass {
  constructor() {
    super();
    this._handleLanguageChange = () => {
      this.requestUpdate();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this._handleLanguageChange);
  }

  t(key, params = {}) {
    return TranslationUtils.translate(key, params);
  }
};