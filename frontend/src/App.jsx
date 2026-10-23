import { useEffect, useState } from 'react';
import api from './api';

const emptyForm = { name: '', email: '', department: '' };

// Use the message from the backend if there is one
function getErrorMessage(error) {
  return error.response?.data?.message || 'Could not connect to the server';
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  async function loadEmployees() {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const employee = {
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department.trim(),
    };

    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, employee);
      } else {
        await api.post('/employees', employee);
      }
      resetForm();
      loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  function handleEdit(employee) {
    setError('');
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this employee?')) return;
    setError('');

    try {
      await api.delete(`/employees/${id}`);
      if (id === editingId) resetForm();
      loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <div className="container">
      <h1>Employee Management</h1>

      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit Employee' : 'Add Employee'}</h2>

        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Department
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No employees yet.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
