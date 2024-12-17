import {html, fixture, expect} from '@open-wc/testing';
import sinon from 'sinon';

import '../../../src/components/employee-form/employee-form.js';
import {EmployeeService} from '../../../src/services/employee.service.js';

describe('EmployeeForm', () => {
  let element;
  let employeeService;

  beforeEach(async () => {
    employeeService = sinon.createStubInstance(EmployeeService);
    element = await fixture(html`<employee-form></employee-form>`);
    element.service.employeeService = employeeService;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the form fields', () => {
    expect(element.shadowRoot.querySelector('input#firstName')).to.exist;
    expect(element.shadowRoot.querySelector('input#lastName')).to.exist;
    expect(element.shadowRoot.querySelector('input#dateOfEmployment')).to.exist;
    expect(element.shadowRoot.querySelector('input#dateOfBirth')).to.exist;
    expect(element.shadowRoot.querySelector('input#phone')).to.exist;
    expect(element.shadowRoot.querySelector('input#email')).to.exist;
    expect(element.shadowRoot.querySelector('select#department')).to.exist;
    expect(element.shadowRoot.querySelector('select#position')).to.exist;
  });

  it('should update form fields when input values change', () => {
    const input = element.shadowRoot.querySelector('input#firstName');
    input.value = 'duygu';
    input.dispatchEvent(new Event('input'));

    expect(element._state.employee.firstName).to.equal('duygu');
  });
});
