import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ConfirmDialog from "./components/ConfirmDialog";

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

  const response = await axios.get("http://localhost:3000/students");

  setStudents(response.data);

  setLoading(false);

};

  const addStudent = async (student) => {

  await axios.post("http://localhost:3000/students", student);

  fetchStudents();

};

  const updateStudent = async (student) => {

  await axios.put(
    `http://localhost:3000/students/${student.id}`,
    student
  );

  setEditingStudent(null);

  fetchStudents();

};

  const deleteStudent = (id) => {

    setStudentToDelete(id);
    setShowDialog(true);

  };

  const confirmDelete = async () => {

  await axios.delete(
    `http://localhost:3000/students/${studentToDelete}`
  );

  setShowDialog(false);

  fetchStudents();

};

  const cancelDelete = () => {

    setShowDialog(false);

  };

  if (loading) return <h2>Loading Students...</h2>;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div>

      <nav className="navbar">
        <h2>Student Manager</h2>
      </nav>

      <div className="container">

        <h1>Students Management System</h1>

        <input
          type="text"
          placeholder="Search students name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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