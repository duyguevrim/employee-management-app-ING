import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';

import './src/components/navigation/nav-menu.js';
import './src/components/employee-list/employee-list.js';
import './src/components/employee-form/employee-form.js';

export class EmployeeApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .container {
      margin: 0 auto;
      padding: 20px;
    }

    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
    }
  `;

  constructor() {
    super();
    this.router = null;
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    this.router = new Router(outlet);

    this.router.setRoutes([
      {
        path: '/',
        component: 'employee-list',
      },
      {
        path: '/employees/add',
        component: 'employee-form',
      },
      {
        path: '/employees/edit/:id',
        component: 'employee-form',
      },
    ]);
  }

  render() {
    return html`
      <div class="container">
        <nav-menu></nav-menu>
        <div id="outlet"></div>
      </div>
    `;
  }
}

customElements.define('employee-app', EmployeeApp);
