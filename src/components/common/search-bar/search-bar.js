import {html, LitElement} from 'lit';

import {styles} from './styles.js';

export class SearchBar extends LitElement {
  static properties = {
    value: {type: String},
    input: {type: Function},
    placeholder: {type: String},
  };

  constructor() {
    super();
  }

  static styles = styles;

  render() {
    return html`
      <div>
        <input
          type="text"
          .value=${this.value}
          @input=${(e) => this.input(e)}
          placeholder=${this.placeholder}
        />
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);
