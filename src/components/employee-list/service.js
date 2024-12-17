export class EmployeeListService {
  constructor(employeeService, config) {
    this.employeeService = employeeService;
    this.config = config;
    this.state = {
      employees: [],
      filteredEmployees: [],
      currentPage: 1,
      searchTerm: '',
      deleteEmployee: null,
      loading: false,
      error: null,
      isMobileView: false,
    };
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    return this.state;
  }

  async loadEmployees() {
    try {
      this.setState({loading: true, error: null});
      const employees = await this.employeeService.getAll();
      this.setState({employees});
      this.performSearch(this.state.searchTerm);
      return true;
    } catch (error) {
      this.setState({error: 'Failed to load employees'});
      console.error('Error loading employees:', error);
      return false;
    } finally {
      this.setState({loading: false});
    }
  }

  performSearch(searchTerm) {
    this.setState({searchTerm, currentPage: 1});

    if (!searchTerm) {
      this.setState({filteredEmployees: [...this.state.employees]});
      return;
    }

    const term = searchTerm.toLowerCase();
    const filteredEmployees = this.state.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(term) ||
        employee.lastName.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term) ||
        employee.position.toLowerCase().includes(term)
    );

    this.setState({filteredEmployees});
  }

  async confirmDelete() {
    if (!this.state.deleteEmployee) return;

    try {
      this.setState({loading: true, error: null});
      await this.employeeService.delete(this.state.deleteEmployee.id);
      this.setState({deleteEmployee: null});
      await this.loadEmployees();
    } catch (error) {
      this.setState({error: 'Failed to delete employee'});
      console.error('Error deleting employee:', error);
    } finally {
      this.setState({loading: false});
    }
  }

  cancelDelete() {
    this.setState({deleteEmployee: null});
  }

  initiateDelete(employee) {
    this.setState({deleteEmployee: employee});
  }

  getPaginatedEmployees() {
    const startIndex =
      (this.state.currentPage - 1) * this.config.PAGINATION.DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + this.config.PAGINATION.DEFAULT_PAGE_SIZE;
    return this.state.filteredEmployees.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(
      this.state.filteredEmployees.length /
        this.config.PAGINATION.DEFAULT_PAGE_SIZE
    );
  }

  changePage(newPage) {
    const totalPages = this.getTotalPages();
    if (newPage >= 1 && newPage <= totalPages) {
      this.setState({currentPage: newPage});
    }
  }

  updateMobileView(isMobile) {
    this.setState({isMobileView: isMobile});
  }

  getEmployeeFullName(employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
}
