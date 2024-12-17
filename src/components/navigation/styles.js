import { css } from 'lit';

  export const styles = css`
  .navbar {
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      color: #333;
      text-decoration: none;
    }

    .brand img {
      width: 32px;
      height: 32px;
      padding-right: 0.5rem;
    }

    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #ff6b00;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      transition: background-color 0.3s;
    }

    .menu-toggle:hover {
      background: #e65c00;
    }

    .nav-actions {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 1rem;
      border-top: 1px solid #ddd;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      flex-direction: column;
      gap: 1rem;
      z-index: 1000;
    }

    .nav-actions.open {
      display: flex;
    }

    .employees-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ff6b00;
      text-decoration: none;
      padding: 0.75rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .employees-link:hover {
      background: #fff5ee;
    }

    .add-new {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: none;
      border: 2px solid #ff6b00;
      border-radius: 4px;
      color: #ff6b00;
      cursor: pointer;
      width: 100%;
      justify-content: center;
      transition: all 0.3s;
    }

    .add-new:hover {
      background: #ff6b00;
      color: white;
    }

    .language-selector {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      font-size: 1rem;
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .navbar {
        padding: 1rem 2rem;
      }

      .menu-toggle {
        display: none;
      }

      .nav-actions {
        display: flex;
        position: static;
        padding: 0;
        box-shadow: none;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        border-top: none;
      }

      .add-new {
        width: auto;
        padding: 0.75rem 1.5rem;
      }

      .language-selector {
        width: auto;
        min-width: 100px;
      }
    }
`;
  