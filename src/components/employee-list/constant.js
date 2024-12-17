import {html} from 'lit';

export const cardFields = [
  {key: 'department', label: 'employeeList.columns.department'},
  {key: 'position', label: 'employeeList.columns.position'},
  {key: 'email', label: 'employeeList.columns.email'},
  {key: 'phone', label: 'employeeList.columns.phone'},
];

export const tableColumns = [
  {key: 'firstName', label: 'employeeList.columns.firstName'},
  {key: 'lastName', label: 'employeeList.columns.lastName'},
  {
    key: 'dateOfEmployment',
    label: 'employeeList.columns.dateOfEmployment',
  },
  {key: 'dateOfBirth', label: 'employeeList.columns.dateOfBirth'},
  {key: 'phone', label: 'employeeList.columns.phone'},
  {key: 'email', label: 'employeeList.columns.email'},
  {key: 'department', label: 'employeeList.columns.department'},
  {key: 'position', label: 'employeeList.columns.position'},
];

export const editIconSvg = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
>
  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg>`;

export const deleteIconSvg = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
>
  <path d="M3 6h18"></path>
  <path
    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  ></path>
</svg>`;
