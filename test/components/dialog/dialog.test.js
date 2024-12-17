import {fixture, html, expect} from '@open-wc/testing';

import {Localized} from '../../../src/translations/localized.js';
import '../../../src/components/dialog/dialog.js';

const mockTranslations = {
  'confirmations.sure': 'Are you sure?',
  'confirmations.add': '{name} will be added',
  'confirmations.update': '{name} will be updated',
  'confirmations.delete': '{name} will be deleted',
  'buttons.cancel': 'Cancel',
  'buttons.proceed': 'Proceed',
};

const MockLocalizedDialog = class extends Localized(HTMLElement) {
  t(key, params = {}) {
    let text = mockTranslations[key] || key;
    if (params.name) {
      text = text.replace('{name}', params.name);
    }
    return text;
  }
};
customElements.define('mock-localized-dialog', MockLocalizedDialog);

describe('Dialog Component', () => {
  describe('Initialization and Rendering', () => {
   
   

    it('renders all required elements', async () => {
      const el = await fixture(html`<app-dialog .open=${true}></app-dialog>`);

      const shadowRoot = el.shadowRoot;
      expect(shadowRoot.querySelector('.dialog')).to.exist;
      expect(shadowRoot.querySelector('.close-button')).to.exist;
      expect(shadowRoot.querySelector('h2')).to.exist;
      expect(shadowRoot.querySelector('.message')).to.exist;
      expect(shadowRoot.querySelectorAll('button').length).to.equal(3);
    });
  });

  describe('Dialog Modes and Messages', () => {
    it('displays correct message for add mode', async () => {
      const el = await fixture(html`
        <app-dialog
          .open=${true}
          .mode=${'add'}
          .name=${'Duygu Odabas'}
        ></app-dialog>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.textContent).to.include('Duygu Odabas');
      expect(message.textContent).to.include('will be added');
    });

    it('displays correct message for edit mode', async () => {
      const el = await fixture(html`
        <app-dialog
          .open=${true}
          .mode=${'edit'}
          .name=${'Duygu Odabas'}
        ></app-dialog>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.textContent).to.include('Duygu Odabas');
      expect(message.textContent).to.include('will be updated');
    });

    it('displays correct message for delete mode', async () => {
      const el = await fixture(html`
        <app-dialog
          .open=${true}
          .mode=${'delete'}
          .name=${'Duygu Odabas'}
        ></app-dialog>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.textContent).to.include('Duygu Odabas');
      expect(message.textContent).to.include('will be deleted');
    });

    it('returns empty message for invalid mode', async () => {
      const el = await fixture(html`
        <app-dialog
          .open=${true}
          .mode=${'invalid'}
          .name=${'Duygu Odabas'}
        ></app-dialog>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.textContent).to.equal('');
    });
  });

  describe('Accessibility', () => {
    it('has proper button labeling', async () => {
      const el = await fixture(html`<app-dialog .open=${true}></app-dialog>`);

      const closeButton = el.shadowRoot.querySelector('.close-button');
      const cancelButton = el.shadowRoot.querySelector('.cancel');
      const proceedButton = el.shadowRoot.querySelector('.proceed');

      expect(closeButton).to.exist;
      expect(cancelButton.textContent.trim()).to.equal('Cancel');
      expect(proceedButton.textContent.trim()).to.equal('Proceed');
    });
  });
});
