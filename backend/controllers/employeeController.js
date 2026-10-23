const Employee = require('../models/Employee');

// Send validation errors as 400, everything else as 500
function handleError(res, error) {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    const message = error.errors.map((e) => e.message).join(', ');
    return res.status(400).json({ message });
  }

  console.error(error);
  res.status(500).json({ message: 'Something went wrong on the server' });
}

// GET /api/employees
async function getEmployees(req, res) {
  try {
    const employees = await Employee.findAll({ order: [['id', 'ASC']] });
    res.json(employees);
  } catch (error) {
    handleError(res, error);
  }
}

// POST /api/employees
async function createEmployee(req, res) {
  try {
    const { name, email, department } = req.body;
    const employee = await Employee.create({ name, email, department });
    res.status(201).json(employee);
  } catch (error) {
    handleError(res, error);
  }
}

// PUT /api/employees/:id
async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { name, email, department } = req.body;
    await employee.update({ name, email, department });
    res.json(employee);
  } catch (error) {
    handleError(res, error);
  }
}

// DELETE /api/employees/:id
async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
