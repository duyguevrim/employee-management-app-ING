import {LitElement, html} from 'lit';

import {styles} from './styles.js';

export class Pagination extends LitElement {
  static properties = {
    currentPage: {type: Number},
    totalPages: {type: Number},
    onPageChange: {type: Function},
  };

  static styles = styles;

  render() {
    return html`
      <div class="pagination">
        <button
          class="page-button"
          ?disabled=${this.currentPage === 1}
          @click=${() => this.onPageChange(this.currentPage - 1)}
        >
          &lt;
        </button>

        ${Array.from({length: this.totalPages}, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="page-button ${page === this.currentPage ? 'active' : ''}"
              @click=${() => this.onPageChange(page)}
            >
              ${page}
            </button>
          `
        )}

        <button
          class="page-button"
          ?disabled=${this.currentPage === this.totalPages}
          @click=${() => this.onPageChange(this.currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    `;
  }
}

customElements.define('app-pagination', Pagination);
