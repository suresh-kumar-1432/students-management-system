import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ConfirmDialog from "./components/ConfirmDialog";

const API_URL = "https://students-backend-qaxl.onrender.com/students";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    try {
      await axios.post(API_URL, student);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (student) => {
    try {
      await axios.put(`${API_URL}/${student.id}`, student);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = (id) => {
    setStudentToDelete(id);
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${studentToDelete}`);
      setShowDialog(false);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  if (loading) return <h2>Loading Students...</h2>;

  const searchText = search.toLowerCase().trim();

  const filteredStudents = students.filter((student) => {
    const name = student.name?.toLowerCase() || "";
    const email = student.email?.toLowerCase() || "";
    return name.includes(searchText) || email.includes(searchText);
  });

  return (
    <div>

      <nav className="navbar">
        <h2>Student Manager</h2>
      </nav>

      <div className="container">

        <h1>Students Management System</h1>

        <div style={{ marginBottom: "15px" }}>

          <input
            type="search"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "6px", marginRight: "10px" }}
          />

          <button onClick={() => setSearch("")}>
            Clear
          </button>

          <p style={{ marginTop: "5px" }}>
            {filteredStudents.length} student(s) found
          </p>

        </div>

        <StudentForm
          addStudent={addStudent}
          updateStudent={updateStudent}
          editingStudent={editingStudent}
        />

        <StudentTable
          students={filteredStudents}
          setEditingStudent={setEditingStudent}
          deleteStudent={deleteStudent}
        />

      </div>

      {showDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this student?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

    </div>
  );
}

export default App;