import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent, students }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(student.email)) {
      setError("Invalid email format");
      return;
    }

    const duplicate = students.some(
      (s) =>
        s.name.toLowerCase() === student.name.toLowerCase() &&
        s.email.toLowerCase() === student.email.toLowerCase()
    );

    if (duplicate && !editingStudent) {
      setError("Student with same name and email already exists");
      return;
    }

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });

    setError("");
  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

      {error && <p className="error-message">{error}</p>}

    </form>

  );

}

export default StudentForm;