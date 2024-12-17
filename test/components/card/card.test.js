import {html, fixture, expect} from '@open-wc/testing';

import '../../../src/components/common/card/card.js';

describe('AppCard', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`
      <app-card
        title="Employee Details"
        .fields=${[
          {key: 'name', label: 'Name'},
          {key: 'email', label: 'Email'},
        ]}
        .data=${{name: 'duygu odabas', email: 'duygu@example.com'}}
        .actions=${[
          {label: 'Edit', icon: 'edit', handler: () => {}},
          {label: 'Delete', icon: 'delete', handler: () => {}},
        ]}
      ></app-card>
    `);
  });

  it('should render the card actions', () => {
    const actionButtons = element.shadowRoot.querySelectorAll('.action-button');
    expect(actionButtons.length).to.equal(2);

    const editButton = actionButtons[0];
    expect(editButton.title).to.equal('Edit');

    const deleteButton = actionButtons[1];
    expect(deleteButton.title).to.equal('Delete');
  });
});
