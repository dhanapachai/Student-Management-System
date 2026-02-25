import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for current page
  const [currentPage, setCurrentPage] = useState('home');
  
  // State for students list
  const [students, setStudents] = useState([]);
  
  // State for form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    course: ''
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for loading
  const [loading, setLoading] = useState(false);
  
  // State for error
  const [error, setError] = useState('');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch students when component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to get all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/students');
      const data = await response.json();
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      course: ''
    });
    setIsEditing(false);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.course) {
      alert('Please fill all fields');
      return;
    }
    
    if (isEditing) {
      await updateStudent();
    } else {
      await addStudent();
    }
  };

  // Add new student
  const addStudent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          course: formData.course
        })
      });
      
      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      resetForm();
      alert('Student added successfully!');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  // Update student
  const updateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          course: formData.course
        })
      });
      
      const updatedStudent = await response.json();
      setStudents(students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      ));
      resetForm();
      alert('Student updated successfully!');
    } catch (err) {
      alert('Failed to update student');
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`http://localhost:8080/api/students/${id}`, {
          method: 'DELETE'
        });
        setStudents(students.filter(student => student.id !== id));
        alert('Student deleted successfully!');
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };

  // Edit student
  const editStudent = (student) => {
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      course: student.course
    });
    setIsEditing(true);
    setCurrentPage('add');
  };

  // Filter students
  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render different pages
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <div className="page-header">
              <h1>🏠 Home</h1>
              <p>Welcome to Student Management System</p>
            </div>
            <div className="stats-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Total Students</h3>
                <p style={{ fontSize: '2.5rem', color: '#3498db', fontWeight: 'bold' }}>{students.length}</p>
              </div>
            </div>
          </>
        );
      
      case 'add':
        return (
          <>
            <div className="page-header">
              <h1>{isEditing ? '✏️ Edit Student' : '➕ Add Student'}</h1>
              <p>{isEditing ? 'Update student information' : 'Enter new student details'}</p>
            </div>
            
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                {isEditing && (
                  <div className="form-group">
                    <label>Student ID:</label>
                    <input type="text" value={formData.id} disabled />
                  </div>
                )}
                
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Course:</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="Enter course"
                    required
                  />
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Student' : 'Add Student'}
                  </button>
                  {isEditing && (
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        );
      
      case 'list':
        return (
          <>
            <div className="page-header">
              <h1>📋 Student List</h1>
              <p>View and manage all students</p>
            </div>
            
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data">No students found</td>
                      </tr>
                    ) : (
                      filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td>{student.id}</td>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td><span className="course-badge">{student.course}</span></td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn btn-primary btn-small"
                                onClick={() => editStudent(student)}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn btn-danger btn-small"
                                onClick={() => deleteStudent(student.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="table-footer">
                  Total: {students.length} students
                  {searchTerm && ` (Filtered: ${filteredStudents.length})`}
                </div>
              </div>
            )}
          </>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar - FIXED: Replaced <a> with <button> */}
      <nav className="navbar">
        <div className="logo">📚 Student Management System</div>
        <div className="nav-links">
          <button 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'add' ? 'active' : ''}
            onClick={() => { 
              setCurrentPage('add'); 
              resetForm(); 
            }}
          >
            Add Student
          </button>
          <button 
            className={currentPage === 'list' ? 'active' : ''}
            onClick={() => setCurrentPage('list')}
          >
            Student List
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Student Management System</p>
      </footer>
    </div>
  );
}

export default App;