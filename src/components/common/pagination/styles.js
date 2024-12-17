import {css} from 'lit';

export const styles = css`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .page-button {
    padding: 0.5rem 1rem;
    border: 1px solid #eee;
    background: white;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
  }

  .page-button.active {
    background: #ff6b00;
    color: white;
    border-color: #ff6b00;
  }

  .page-button:hover:not(:disabled) {
    cursor: not-allowed;
  }

  .page-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
