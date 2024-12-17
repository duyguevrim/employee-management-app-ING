import {html} from 'lit';

import {BaseComponent} from '../base-component.js';
import {styles} from './styles.js';

export class Card extends BaseComponent {
  static properties = {
    title: {type: String},
    fields: {type: Array},
    data: {type: Object},
    actions: {type: Array},
  };

  constructor() {
    super();
  }

  static styles = styles;

  render() {
    return html`
      <div class="card">
        <div class="header">
          <h3 class="title">${this.title}</h3>

          ${html`
            <div class="actions">
              ${this.actions.map(
                (action) => html`
                  <button
                    class="action-button"
                    @click=${() => action.handler(this.data)}
                    title=${action.label}
                  >
                    ${action.icon}
                  </button>
                `
              )}
            </div>
          `}
        </div>

        <div class="card-content">
          ${this.fields.map(
            (field) => html`
              <div class="field">
                <span class="field-label">${this.t(field.label)}</span>
                <span>${this.data[field.key]}</span>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('app-card', Card);
