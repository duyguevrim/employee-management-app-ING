class Store {
  constructor() {
    this._state = {
      employees: [],
      loading: false,
      error: null,
    };

    // eslint-disable-next-line no-undef
    this._listeners = new Set();

    this._loadFromStorage();
  }

  getState() {
    return this._state;
  }

  _loadFromStorage() {
    try {
      const stored = localStorage.getItem('employeeStore');
      if (stored) {
        this._state = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  _saveToStorage() {
    try {
      localStorage.setItem('employeeStore', JSON.stringify(this._state));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _notify() {
    this._listeners.forEach((listener) => listener(this._state));
  }

  dispatch(action) {
    switch (action.type) {
      case 'ADD_EMPLOYEE':
        this._state = {
          ...this._state,
          employees: [...this._state.employees, action.payload],
        };
        break;

      case 'UPDATE_EMPLOYEE':
        this._state = {
          ...this._state,
          employees: this._state.employees.map((emp) =>
            emp.id === action.payload.id ? action.payload : emp
          ),
        };
        break;

      case 'DELETE_EMPLOYEE':
        this._state = {
          ...this._state,
          employees: this._state.employees.filter(
            (emp) => emp.id !== action.payload
          ),
        };
        break;

      default:
        return;
    }

    this._saveToStorage();
    this._notify();
  }
}

export const store = new Store();
