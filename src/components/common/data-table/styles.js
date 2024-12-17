import {css} from 'lit';

export const styles = css`
  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
  }

  th {
    color: #ff6b00;
    padding: 28px 0px;
    font-weight: 500;
  }

  td {
    padding: 12px 12px 12px 24px;
    border-top: 1px solid #eee;
    min-height: 50px;
  }

  @media (max-width: 1200px) {
    td {
      padding: 4px 4px 4px 12px;
      min-height: 80px;
    }
  }

  .actions {
    display: flex;
  }

  .action-button {
    border: none;
    background-color: transparent;
    color: #ff6b00;
    cursor: pointer;
  }

  .action-button:hover {
    color: #cc5500;
  }
`;
