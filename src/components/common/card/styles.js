import {css} from 'lit';

export const styles = css`
  .card {
    display: block;
    background: #ffffff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }

  .card-status {
    font-size: 14px;
    color: #6b7280;
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

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .field-label {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }
`;
