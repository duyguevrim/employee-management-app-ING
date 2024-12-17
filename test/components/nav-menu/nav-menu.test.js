import {fixture, html, expect} from '@open-wc/testing';
import {Router} from '@vaadin/router';
import sinon from 'sinon';

import '../../../src/components/navigation/nav-menu.js';
import {NavigationService} from '../../../src/services/navigation.service.js';

describe('NavMenu Component', () => {
  let element;
  let matchMediaStub;

  beforeEach(() => {
    matchMediaStub = sinon.stub(window, 'matchMedia').returns({
      matches: false,
      addEventListener: sinon.stub(),
      removeEventListener: sinon.stub(),
    });

    sinon.stub(Router, 'go');

    sinon.stub(NavigationService, 'navigateTo');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Component Initialization', () => {
    it('initializes with correct default state', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      expect(element._state).to.deep.include({
        isMenuOpen: false,
        isMobileView: true,
      });
    });

    it('sets up event listeners on connection', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      expect(matchMediaStub.called).to.be.true;
      expect(element._mediaQuery.addEventListener.called).to.be.true;
    });
  });

  describe('Responsive Behavior', () => {
    it('updates state on resize', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      element._handleResize({matches: true});
      await element.updateComplete;
      expect(element._state.isMobileView).to.be.false;

      element._handleResize({matches: false});
      await element.updateComplete;
      expect(element._state.isMobileView).to.be.true;
    });

    it('renders mobile toggle only in mobile view', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      element._setState({isMobileView: true});
      await element.updateComplete;
      expect(element.shadowRoot.querySelector('.menu-toggle')).to.exist;

      element._setState({isMobileView: false});
      await element.updateComplete;
      expect(element.shadowRoot.querySelector('.menu-toggle')).to.not.exist;
    });
  });

  describe('Menu Behavior', () => {
    it('toggles menu state', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      element._toggleMenu();
      expect(element._state.isMenuOpen).to.be.true;

      element._toggleMenu();
      expect(element._state.isMenuOpen).to.be.false;
    });
  });

  describe('Navigation', () => {
    it('handles navigation correctly', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);
      NavigationService.navigateTo.resolves();

      await element._handleNavigation('/test-path');

      expect(NavigationService.navigateTo.calledWith('/test-path')).to.be.true;
      expect(element._state.isMenuOpen).to.be.false;
    });

    it('handles navigation errors', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);
      NavigationService.navigateTo.rejects(new Error('Navigation failed'));

      await element._handleNavigation('/test-path');

      expect(element._state.error).to.equal(element.t('errors.navigation'));
    });

    it('navigates to add employee page', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      await element._handleAddNew();

      expect(Router.go.calledWith('/employees/add')).to.be.true;
      expect(element._state.isMenuOpen).to.be.false;
    });
  });

  describe('Language Switching', () => {
    it('changes language correctly', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      const event = new Event('change');
      Object.defineProperty(event, 'target', {value: {value: 'tr'}});

      await element.handleLanguageChange(event);

      expect(document.documentElement.lang).to.equal('tr');
    });
  });

  describe('Cleanup', () => {
    it('removes event listeners on disconnection', async () => {
      element = await fixture(html`<nav-menu></nav-menu>`);

      element.disconnectedCallback();

      expect(element._mediaQuery.removeEventListener.called).to.be.true;
    });
  });
});
