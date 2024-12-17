import {expect} from '@open-wc/testing';

import '../app.js';

describe('EmployeeApp', () => {
  it('is defined', () => {
    const el = document.createElement('employee-app');
    expect(el).to.be.instanceOf(customElements.get('employee-app'));
  });
});
