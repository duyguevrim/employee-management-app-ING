import { store } from "../store/store";

export class EmployeeService {
  constructor() {
    this.store = store;
  }

  getAll() {
    return this.store.getState().employees;
  }

  getById(id) {
    const employees = this.getAll();
    return employees.find(emp => emp.id === id);
  }

  async create(employee) {
    try {
      await this.store.dispatch({
        type: 'ADD_EMPLOYEE',
        payload: {
          ...employee,
          id: Date.now(),
        },
      });
      return true;
    } catch (error) {
      throw new Error('Failed to create employee');
    }
  }

  async update(employee) {
    try {
      await this.store.dispatch({
        type: 'UPDATE_EMPLOYEE',
        payload: employee,
      });
      return true;
    } catch (error) {
      throw new Error('Failed to update employee');
    }
  }

  async delete(id) {
    try {
      await this.store.dispatch({
        type: 'DELETE_EMPLOYEE',
        payload: id,
      });
      return true;
    } catch (error) {
      throw new Error('Failed to delete employee');
    }
  }
}