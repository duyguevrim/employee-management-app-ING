import {html} from 'lit';

import {BaseComponent} from '../base-component.js';
import {styles} from './styles.js';

export class DataTable extends BaseComponent {
  static properties = {
    columns: {type: Array},
    data: {type: Array},
    actions: {type: Array},
    actionTitle: {type: String},
  };
  static styles = styles;

  constructor() {
    super();
  }

  renderTableBody() {
    if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
      return html`
        <tr>
          <td colspan="${this.columns.length + (this.actions.length ? 1 : 0)}">
            ${this.t('messages.noData')}
          </td>
        </tr>
      `;
    }

    return this.data.map(
      (item) => html`
        <tr>
          ${this.columns.map((col) => html` <td>${item[col.key]}</td> `)}
          ${this.actions?.length &&
          html`
            <td class="actions">
              ${this.actions.map(
                (action) => html`
                  <button
                    class="action-button"
                    @click=${() => action.handler(item)}
                    title=${action.label}
                  >
                    ${action.icon}
                  </button>
                `
              )}
            </td>
          `}
        </tr>
      `
    );
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.columns?.map(
                (col) => html`<th>${this.t(col.label)}</th>`
              )}
              <th>${this.actionTitle}</th>
            </tr>
          </thead>
          <tbody>
            ${this.renderTableBody()}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('data-table', DataTable);
