import {fixture, html, expect} from '@open-wc/testing';
import {Router} from '@vaadin/router';
import sinon from 'sinon';

import '../../../src/components/employee-list/employee-list.js';
import {EmployeeService} from '../../../src/services/employee.service.js';

describe('EmployeeList Component', () => {
  const sampleEmployees = [
    {
      id: 1,
      firstName: 'duygu',
      lastName: 'odabas',
      email: 'duygu@example.com',
      department: 'Tech',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      department: 'Analytics',
    },
  ];

  let employeeService;

  beforeEach(() => {
    employeeService = new EmployeeService();
    sinon.stub(employeeService, 'getAll').returns(sampleEmployees);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Component Initialization', () => {
    it('initializes with default state', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);

      expect(el._state).to.exist;
      expect(el._state.employees).to.be.an('array');
      expect(el._state.currentPage).to.equal(1);
      expect(el._state.searchTerm).to.equal('');
    });

    it('sets up media query listener', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);

      expect(el.mediaQuery).to.exist;
      expect(el.mediaQuery.matches).to.be.a('boolean');
    });
  });

  describe('Render Modes', () => {
    it('renders data-table in desktop mode', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);
      el.service.updateMobileView(false);
      await el.updateComplete;

      const dataTable = el.shadowRoot.querySelector('data-table');
      expect(dataTable).to.exist;
    });
  });

  describe('Search Functionality', () => {
    it('updates search term on input', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);
      const searchBar = el.shadowRoot.querySelector('search-bar');

      searchBar.input({target: {value: 'duygu'}});
      await el.updateComplete;

      expect(el._state.searchTerm).to.equal('duygu');
    });
  });

  describe('Pagination', () => {
    it('renders pagination component', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);

      const pagination = el.shadowRoot.querySelector('app-pagination');
      expect(pagination).to.exist;
    });

 
  });

  describe('Employee Actions', () => {
    it('handles edit action', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);

      const routerStub = sinon.stub(Router, 'go').resolves();

      try {
        el.actions[0].handler(sampleEmployees[0]);

        expect(routerStub.calledOnce).to.be.true;
        expect(routerStub.calledWith('/employees/edit/1')).to.be.true;
      } finally {
        routerStub.restore();
      }
    });

    it('initiates delete dialog', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);

      el.actions[1].handler(sampleEmployees[0]);
      await el.updateComplete;

      const dialog = el.shadowRoot.querySelector('app-dialog');
      expect(dialog).to.exist;
      expect(dialog.mode).to.equal('delete');
    });

    it('handles delete confirmation', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);
      const deleteStub = sinon.stub(el.service, 'confirmDelete').resolves();

      el.actions[1].handler(sampleEmployees[0]);
      await el.updateComplete;

      const dialog = el.shadowRoot.querySelector('app-dialog');
      dialog.dispatchEvent(new CustomEvent('proceed'));

      expect(deleteStub.called).to.be.true;
    });
  });

  describe('Pagination', () => {
    it('updates page state correctly', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);
      const newState = {...el._state, currentPage: 2};

      el.service.state = newState;
      el._updateState();

      expect(el._state.currentPage).to.equal(2);
    });
  });

  describe('Cleanup', () => {
    it('removes event listeners on disconnect', async () => {
      const el = await fixture(html`<employee-list></employee-list>`);
      const removeListenerSpy = sinon.spy(el.mediaQuery, 'removeEventListener');

      el.disconnectedCallback();

      expect(removeListenerSpy.called).to.be.true;
    });
  });
});
