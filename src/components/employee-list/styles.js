import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 1rem;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    :host {
      padding: 2rem;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.5rem;
    color: #ff6b00;
    margin: 0;
  }
`;
