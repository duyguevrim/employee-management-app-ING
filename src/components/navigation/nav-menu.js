import {html} from 'lit';
import {Router} from '@vaadin/router';

import CONFIG from '../../../config';
import {Icons} from './icons';
import {styles} from './styles';
import {NavigationService} from '../../services/navigation.service';
import BaseComponent from '../common/base-component';
import {TranslationUtils} from '../../translations/translation-utils';

export class NavMenu extends BaseComponent {
  static properties = {
    _state: {type: Object, state: true},
  };

  static styles = styles;

  constructor() {
    super();
    this._state = {
      isMenuOpen: false,
      isMobileView: true,
      currentLang: TranslationUtils.getLanguage(),
    };

    this._mediaQuery = window.matchMedia(CONFIG.BREAKPOINTS.DESKTOP);
    this._handleResize = this._handleResize.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
    this._handleResize(this._mediaQuery);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
  }

  async _handleNavigation(path) {
    try {
      await NavigationService.navigateTo(path);
      this._closeMenu();
      this._setState({error: null});
    } catch (error) {
      this._setState({
        error: this.t('errors.navigation'),
      });
    }
  }

  _setupEventListeners() {
    this._mediaQuery.addEventListener('change', this._handleResize);
    document.addEventListener('keydown', this._handleKeydown);
  }

  _removeEventListeners() {
    this._mediaQuery.removeEventListener('change', this._handleResize);
    document.removeEventListener('keydown', this._handleKeydown);
  }

  _handleResize(e) {
    this._setState({
      isMobileView: !e.matches,
      isMenuOpen: !e.matches ? false : this._state.isMenuOpen,
    });
  }

  _handleKeydown(e) {
    if (e.key === 'Escape' && this._state.isMenuOpen) {
      this._closeMenu();
    }
  }

  _setState(newState) {
    this._state = {...this._state, ...newState};
    this.requestUpdate();
  }

  _toggleMenu() {
    this._setState({isMenuOpen: !this._state.isMenuOpen});
  }

  _closeMenu() {
    this._setState({isMenuOpen: false});
  }

  async _handleLanguageChange(event) {
    const newLang = event.target.value;
    document.documentElement.lang = newLang;

    try {
      await this._dispatchLanguageEvent(newLang);
      this._setState({currentLang: newLang});
      this._closeMenu();
    } catch (error) {
      console.error('Language change failed:', error);
    }
  }

  handleLanguageChange(event) {
    document.documentElement.lang = event.target.value;
    const languageEvent = new CustomEvent('language-changed', {
      detail: {language: event.target.value},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(languageEvent);
    this._closeMenu();
    this.requestUpdate();
  }

  async _handleAddNew() {
    try {
      await Router.go('/employees/add');
      this._closeMenu();
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  }

  _renderBrand() {
    return html`
      <a href="/" class="brand" @click=${this._closeMenu} aria-label="Home">
        <img src="/assets/logo.png" alt="ING Logo" width="32" height="32" />
        <span>ING</span>
      </a>
    `;
  }

  _renderMobileToggle() {
    const {isMenuOpen} = this._state;
    return html`
      <button
        class="menu-toggle"
        @click=${this._toggleMenu}
        aria-expanded=${isMenuOpen}
        aria-controls="nav-actions"
        aria-label=${isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        ${isMenuOpen ? Icons.close : Icons.menu}
      </button>
    `;
  }

  _renderNavActions() {
    const {isMenuOpen, currentLang} = this._state;

    return html`
      <div
        id="nav-actions"
        class="nav-actions ${isMenuOpen ? 'open' : ''}"
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          href="/"
          class="employees-link"
          @click=${this._closeMenu}
          aria-label="View employees"
        >
          ${Icons.employees}
          <span>${this.t('navbar.employees')}</span>
        </a>

        <button
          class="add-new"
          @click=${this._handleAddNew}
          aria-label="Add new employee"
        >
          ${Icons.addNew}
          <span>${this.t('navbar.addNew')}</span>
        </button>

        <select
          class="language-selector"
          @change=${this.handleLanguageChange}
          aria-label="Select language"
        >
          <option value="en" ?selected=${currentLang === 'en'}>
            🇬🇧 ${this.t('languageEN')}
          </option>
          <option value="tr" ?selected=${currentLang === 'tr'}>
            🇹🇷 ${this.t('languageTR')}
          </option>
        </select>
      </div>
    `;
  }

  render() {
    return html`
      <nav class="navbar" role="navigation" aria-label="Main navigation">
        ${this._renderBrand()}
        ${this._state.isMobileView ? this._renderMobileToggle() : ''}
        ${this._renderNavActions()}
      </nav>
    `;
  }
}

customElements.define('nav-menu', NavMenu);
