import {html} from 'lit';
import {Router} from '@vaadin/router';

import {DepartmentEnum} from '../../enums/department';
import {PositionEnum} from '../../enums/position.js';
import {formStyles} from './styles.js';
import {EmployeeService} from '../../services/employee.service.js';
import {EmployeeFormService} from './service.js';
import BaseComponent from '../common/base-component.js';

export class EmployeeForm extends BaseComponent {
  static properties = {
    _state: {type: Object},
  };

  static styles = formStyles;

  constructor() {
    super();
    const employeeService = new EmployeeService();
    this.service = new EmployeeFormService(employeeService, this.t.bind(this));
    this._state = this.service.state;
  }

  async connectedCallback() {
    super.connectedCallback();
    const id = window.location.pathname.split('/').pop();
    if (id && id !== 'add') {
      await this.service.loadEmployee(id);
      this._updateState();
    }
  }

  _updateState() {
    this._state = this.service.state;
    this.requestUpdate();
  }

  async _handleSubmit(e) {
    e.preventDefault();

    if (!this.service.validateForm()) {
      this._updateState();
      return;
    }

    this.service.showConfirmDialog();
    this._updateState();
  }

  async _handleDialogConfirm() {
    const success = await this.service.saveEmployee();
    this._updateState();

    if (success) {
      await Router.go('/');
    }
  }

  _handleInput(e, field) {
    this.service.updateField(field, e.target.value);
    this._updateState();
  }

  _renderFormField(field, type = 'text', options = {}) {
    const {label, placeholder = '', inputType = type} = options;
    const fieldLabel = label || this.t(`employeeList.columns.${field}`);

    return html`
      <div class="form-group">
        <label class="required" for=${field}>${fieldLabel}</label>
        ${this._renderFieldInput(field, inputType, placeholder, options)}
        ${this._state.errors[field]
          ? html`
              <div class="error-message">${this._state.errors[field]}</div>
            `
          : ''}
      </div>
    `;
  }

  _renderFieldInput(field, inputType, placeholder, options) {
    return inputType === 'select'
      ? this._renderSelect(field, options)
      : this._renderInput(field, inputType, placeholder);
  }

  _renderInput(field, inputType, placeholder) {


    return html`
      <input
        id=${field}
        type=${inputType}
        .value=${this._state.employee[field]}
        @input=${(e) => this._handleInput(e, field)}
        ?disabled=${this._state.loading}
        placeholder=${placeholder}
      />
    `;
  }

  _renderSelect(field, {options}) {
    return html`
      <select
        id=${field}
        @change=${(e) => this._handleInput(e, field)}
        ?disabled=${this._state.loading}
      >
        ${Object.entries(options).map(
          // eslint-disable-next-line no-unused-vars
          ([_, value]) => html`
            <option
              value=${value}
              ?selected=${value === this._state.employee[field]}
            >
              ${value}
            </option>
          `
        )}
      </select>
    `;
  }

  render() {
    const formClasses = this._state.loading
      ? 'form-container disabled'
      : 'form-container';

    return html`
      <div class=${formClasses}>
        ${this._state.showDialog
          ? html`
              <app-dialog
                .open=${true}
                .name=${this.service.getEmployeeFullName()}
                .mode=${this._state.dialogMode}
                @proceed=${this._handleDialogConfirm}
                @cancel=${() => {
                  this.service.hideDialog();
                  this._updateState();
                }}
              ></app-dialog>
            `
          : ''}

        <h2 class="form-title">
          ${this._state.isEdit
            ? this.t('employeeForm.editTitle')
            : this.t('employeeForm.addTitle')}
        </h2>

        ${this._state.errors.general
          ? html`
              <div class="error-message">${this._state.errors.general}</div>
            `
          : ''}

        <form @submit=${this._handleSubmit}>
          ${this._renderFormField('firstName', 'text', {
            placeholder: 'Enter first name',
          })}
          ${this._renderFormField('lastName', 'text', {
            placeholder: 'Enter last name',
          })}
          ${this._renderFormField('dateOfEmployment', 'date')}
          ${this._renderFormField('dateOfBirth', 'date', {
            placeholder: 'DD/MM/YYYY',
          })}
          ${this._renderFormField('phone', 'tel', {
            placeholder: '+90 5XX XXX XX XX',
          })}
          ${this._renderFormField('email', 'email', {
            placeholder: 'example@company.com',
          })}
          ${this._renderFormField('department', 'select', {
            options: DepartmentEnum,
          })}
          ${this._renderFormField('position', 'select', {
            options: PositionEnum,
          })}

          <div class="button-group">
            <button
              type="button"
              @click=${() => Router.go('/')}
              ?disabled=${this._state.loading}
            >
              ${this.t('buttons.cancel')}
            </button>
            <button type="submit" ?disabled=${this._state.loading}>
              ${this._state.isEdit
                ? this.t('employeeForm.buttons.update')
                : this.t('employeeForm.buttons.create')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
