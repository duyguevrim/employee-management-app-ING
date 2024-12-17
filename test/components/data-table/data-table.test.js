import {fixture, html, expect, elementUpdated} from '@open-wc/testing';

import {BaseComponent} from '../../../src/components/common/base-component.js';
import '../../../src/components/common/data-table/data-table.js';

class MockBaseComponent extends BaseComponent {
  t(key) {
    const translations = {
      'messages.noData': 'No data available',
      'messages.loading': 'Loading...',
      'employeeList.columns.firstName': 'First Name',
      'employeeList.columns.lastName': 'Last Name',
    };
    return translations[key] || key;
  }
}

customElements.define('mock-base-component', MockBaseComponent);

describe('DataTable Component', () => {
  const sampleColumns = [
    {key: 'firstName', label: 'employeeList.columns.firstName'},
    {key: 'lastName', label: 'employeeList.columns.lastName'},
  ];

  const sampleData = [
    {id: 1, firstName: 'duygu', lastName: 'odabas'},
    {id: 2, firstName: 'evrim', lastName: 'odabas'},
  ];

  const sampleActions = [
    {
      label: 'Edit',
      handler: () => {},
      icon: html`<svg></svg>`,
    },
    {
      label: 'Delete',
      handler: () => {},
      icon: html`<svg></svg>`,
    },
  ];

  describe('Data Rendering', () => {
    it('renders data rows correctly', async () => {
      const el = await fixture(html`
        <data-table .columns=${sampleColumns} .data=${sampleData}></data-table>
      `);

      const rows = el.shadowRoot.querySelectorAll('tbody tr');
      expect(rows).to.have.lengthOf(sampleData.length);

      const firstRow = rows[0];
      const cells = firstRow.querySelectorAll('td');
      expect(cells[0].textContent.trim()).to.equal('duygu');
      expect(cells[1].textContent.trim()).to.equal('odabas');
    });

    it('updates when data changes', async () => {
      const el = await fixture(html`
        <data-table .columns=${sampleColumns} .data=${sampleData}></data-table>
      `);

      const newData = [
        ...sampleData,
        {id: 3, firstName: 'Bob', lastName: 'Odabas'},
      ];
      el.data = newData;
      await elementUpdated(el);

      const rows = el.shadowRoot.querySelectorAll('tbody tr');
      expect(rows).to.have.lengthOf(3);
    });
  });

  describe('Action Handling', () => {
    it('renders action buttons', async () => {
      const el = await fixture(html`
        <data-table
          .columns=${sampleColumns}
          .data=${sampleData}
          .actions=${sampleActions}
        ></data-table>
      `);

      const actionButtons = el.shadowRoot.querySelectorAll('.action-button');
      expect(actionButtons).to.have.lengthOf(
        sampleData.length * sampleActions.length
      );
    });

    it('calls action handlers with correct data', async () => {
      let actionData = null;
      const actions = [
        {
          label: 'Test',
          handler: (data) => {
            actionData = data;
          },
          icon: html`<svg></svg>`,
        },
      ];

      const el = await fixture(html`
        <data-table
          .columns=${sampleColumns}
          .data=${sampleData}
          .actions=${actions}
        ></data-table>
      `);

      const actionButton = el.shadowRoot.querySelector('.action-button');
      actionButton.click();

      expect(actionData).to.deep.equal(sampleData[0]);
    });

    it('sets correct button titles', async () => {
      const el = await fixture(html`
        <data-table
          .columns=${sampleColumns}
          .data=${sampleData}
          .actions=${sampleActions}
        ></data-table>
      `);

      const actionButtons = el.shadowRoot.querySelectorAll('.action-button');
      expect(actionButtons[0].getAttribute('title')).to.equal('Edit');
      expect(actionButtons[1].getAttribute('title')).to.equal('Delete');
    });
  });
});
