import { FormValidator } from "./utils/form-validator";
import { PositionEnum } from "../../enums/position";
import { DepartmentEnum } from "../../enums/department";

export class EmployeeFormService {
  constructor(employeeService, translator) {
    this.employeeService = employeeService;
    this.t = translator;
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      employee: {
        firstName: '',
        lastName: '',
        dateOfEmployment: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        department: Object.values(DepartmentEnum)[0],
        position: Object.values(PositionEnum)[0],
      },
      isEdit: false,
      errors: {},
      loading: false,
      showDialog: false,
      dialogMode: '',
    };
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    return this.state;
  }

  resetState() {
    this.state = this.getInitialState();
  }

  setError(field, message) {
    const errors = {...this.state.errors, [field]: message};
    this.setState({errors});
  }

  clearError(field) {
    // eslint-disable-next-line no-unused-vars
    const {[field]: _, ...errors} = this.state.errors;
    this.setState({errors});
  }

  async loadEmployee(id) {
    try {
      this.setState({loading: true, errors: {}});
      const employee = await this.employeeService.getById(parseInt(id));


      this.setState({
        employee,
        isEdit: true,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errors: {general: this.t('errors.loadEmployee')},
        loading: false,
      });
      console.error('Error loading employee:', error);
    }
  }

  validateField(field) {
    const validationErrors = FormValidator.validateEmployee(
      this.state.employee
    );
    if (validationErrors[field]) {
      this.setError(field, validationErrors[field]);
    } else {
      this.clearError(field);
    }
    return !validationErrors[field];
  }

  validateForm() {
    const validationErrors = FormValidator.validateEmployee(
      this.state.employee
    );
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return false;
    }
    return true;
  }

  updateField(field, value) {
    const employee = {
      ...this.state.employee,
      [field]: value,
    };
    this.setState({employee});
    this.validateField(field);
  }

  async saveEmployee() {
    try {
      this.setState({loading: true});

      if (this.state.isEdit) {
        await this.employeeService.update(this.state.employee);
      } else {
        await this.employeeService.create(this.state.employee);
      }

      return true;
    } catch (error) {
      const errorMessage = this.state.isEdit
        ? this.t('errors.updateEmployee')
        : this.t('errors.createEmployee');

      this.setState({
        errors: {general: errorMessage},
        loading: false,
      });

      return false;
    }
  }

  showConfirmDialog() {
    const dialogMode = this.state.isEdit ? 'edit' : 'add';
    this.setState({showDialog: true, dialogMode});
  }

  hideDialog() {
    this.setState({showDialog: false});
  }

  getEmployeeFullName() {
    const {firstName, lastName} = this.state.employee;
    return `${firstName} ${lastName}`;
  }
}

