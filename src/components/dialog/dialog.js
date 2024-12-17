import {html} from 'lit';

import {styles} from './styles';
import BaseComponent from '../common/base-component';

export class Dialog extends BaseComponent {
  static properties = {
    open: {type: Boolean},
    title: {type: String},
    name: {type: String},
    mode: {type: String},
  };

  static styles = styles;

  constructor() {
    super();
    this.open = false;
    this.name = '';
    this.mode = 'delete';
  }

  getDialogMessage() {
    switch (this.mode) {
      case 'add':
        return this.t('confirmations.add', {name: this.name});
      case 'edit':
        return this.t('confirmations.update', {name: this.name});
      case 'delete':
        return this.t('confirmations.delete', {name: this.name});
      default:
        return '';
    }
  }

  close() {
    this.open = false;
  }

  proceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
    this.close();
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.close();
  }

  render() {
    return html`
      <div class="container" ?open=${this.open}>
        <div class="dialog">
          <button class="close-button" @click=${this.cancel}>×</button>
          <h2>${this.t('confirmations.sure')}</h2>
          <div class="message">${this.getDialogMessage()}</div>
          <div class="buttons">
            <button class="cancel" @click=${this.cancel}>
              ${this.t('buttons.cancel')}
            </button>
            <button class="proceed" @click=${this.proceed}>
              ${this.t('buttons.proceed')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-dialog', Dialog);
