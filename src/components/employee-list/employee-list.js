import {html} from 'lit';
import {Router} from '@vaadin/router';

import {EmployeeService} from '../../services/employee.service.js';
import {CONFIG} from '../../../config/index.js';
import {EmployeeListService} from './service.js';
import {
  cardFields,
  deleteIconSvg,
  editIconSvg,
  tableColumns,
} from './constant.js';
import BaseComponent from '../common/base-component.js';
import '../dialog/dialog.js';
import '../common/card/card.js';
import '../common/data-table/data-table.js';
import '../common/pagination/pagination.js';
import '../common/search-bar/search-bar.js';
import {styles} from './styles.js';

export class EmployeeList extends BaseComponent {
  static properties = {
    _state: {type: Object},
  };

  static styles = styles;

  constructor() {
    super();
    const employeeService = new EmployeeService();
    this.service = new EmployeeListService(employeeService, CONFIG);
    this._state = this.service.state;
    this._handleResize = this._handleResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.mediaQuery = window.matchMedia(CONFIG.BREAKPOINTS.MOBILE);
    this.mediaQuery.addEventListener('change', this._handleResize);
    this.service.updateMobileView(this.mediaQuery.matches);
    this.loadEmployees();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mediaQuery.removeEventListener('change', this._handleResize);
  }

  _updateState() {
    this._state = this.service.state;
    this.requestUpdate();
  }

  async loadEmployees() {
    await this.service.loadEmployees();
    this._updateState();
  }

  _handleResize(e) {
    this.service.updateMobileView(e.matches);
    this._updateState();
  }

  get actions() {
    return [
      {
        icon: editIconSvg,
        handler: (employee) => Router.go(`/employees/edit/${employee.id}`),
        label: this.t('actions.edit'),
      },
      {
        icon: deleteIconSvg,
        handler: (employee) => {
          this.service.initiateDelete(employee);
          this._updateState();
        },
        label: this.t('actions.delete'),
      },
    ];
  }

  renderDeleteDialog() {
    if (!this._state.deleteEmployee) return '';

    return html`
      <app-dialog
        .open=${true}
        .name=${this.service.getEmployeeFullName(this._state.deleteEmployee)}
        .mode=${'delete'}
        @proceed=${async () => {
          await this.service.confirmDelete();
          this._updateState();
        }}
        @cancel=${() => {
          this.service.cancelDelete();
          this._updateState();
        }}
      ></app-dialog>
    `;
  }

  renderHeader() {
    return html`
      <div class="header">
        <h1 class="title">${this.t('employeeList.title')}</h1>
        <search-bar
          .value=${this._state.searchTerm}
          .input=${(e) => {
            this.service.performSearch(e.target.value);
            this._updateState();
          }}
          .placeholder=${this.t('employeeList.search')}
        ></search-bar>
      </div>
    `;
  }

  renderEmployeeList() {
    const paginatedEmployees = this.service.getPaginatedEmployees();
    return this._state.isMobileView
      ? paginatedEmployees.map(
          (employee) => html`
            <app-card
              .title=${this.service.getEmployeeFullName(employee)}
              .data=${employee}
              .fields=${cardFields}
              .actions=${this.actions}
            ></app-card>
          `
        )
      : html`
          <data-table
            .columns=${tableColumns}
            .data=${paginatedEmployees}
            .actions=${this.actions}
            .actionTitle=${this.t('employeeList.columns.actions')}
          ></data-table>
        `;
  }

  renderPagination() {
    return html`
      <app-pagination
        .currentPage=${this._state.currentPage}
        .totalPages=${this.service.getTotalPages()}
        .onPageChange=${(page) => {
          this.service.changePage(page);
          this._updateState();
        }}
      ></app-pagination>
    `;
  }

  render() {
    return html`
      ${this.renderDeleteDialog()} ${this.renderHeader()}
      ${this.renderEmployeeList()} ${this.renderPagination()}
    `;
  }
}

customElements.define('employee-list', EmployeeList);
