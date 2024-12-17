import { store } from '../../../store/store';
import { TranslationUtils } from '../../../translations/translation-utils';
import CONFIG from '../../../../config';

export class FormValidator {
  static t(key, params = {}) {
    return TranslationUtils.translate(key, params);
  }

  static validateEmployee(employee) {
    const errors = {};
    const rules = {
      email: {
        pattern: CONFIG.VALIDATION.EMAIL_REGEX,
        message: this.t('employeeForm.validation.invalidEmail'),
      },
      phone: {
        pattern: CONFIG.VALIDATION.PHONE_REGEX,
        message: this.t('employeeForm.validation.invalidPhone'),
      },
    };

    const requiredFields = {
      firstName: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.firstName') }),
      lastName: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.lastName') }),
      dateOfEmployment: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.dateOfEmployment') }),
      dateOfBirth: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.dateOfBirth') }),
      email: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.email') }),
      phone: this.t('employeeForm.validation.required', { field: this.t('employeeList.columns.phone') }),
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!employee[field]?.trim()) {
        errors[field] = message;
      }
    });

    if (employee.email && !rules.email.pattern.test(employee.email)) {
      errors.email = rules.email.message;
    }

    if (employee.phone && !rules.phone.pattern.test(employee.phone)) {
      errors.phone = rules.phone.message;
    }

    const dateValidations = this.validateDates(employee);
    const checkDuplicateEmployee = this.checkDuplicateEmployee(employee);
    Object.assign(errors, dateValidations, checkDuplicateEmployee);

    return errors;
  }

  static checkDuplicateEmployee(employee) {
    const employees = store.getState().employees;
    const errors = {};
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === employee.id) continue;
      if (employees[i].email === employee.email) {
        errors.email = this.t('employeeForm.validation.duplicate.email', { email: employee.email });
      }
      if (employees[i].phone === employee.phone) {
        errors.phone = this.t('employeeForm.validation.duplicate.phone', { phone: employee.phone });
      }
    }
    return errors;
  }

  static validateDates(employee) {
    const errors = {};
    const today = new Date();
    const birthDate = new Date(employee.dateOfBirth);
    const employmentDate = new Date(employee.dateOfEmployment);

    if (birthDate > today) {
      errors.dateOfBirth = this.t('employeeForm.validation.futureDate');
    } 

    if (employmentDate > today) {
      errors.dateOfEmployment = this.t('employeeForm.validation.futureEmployment');
    }

    return errors;
  }
}
