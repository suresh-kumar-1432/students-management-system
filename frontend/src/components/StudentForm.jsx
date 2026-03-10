import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

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

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // trim values to remove spaces
    const name = student.name.trim();
    const email = student.email.trim();
    const age = student.age.trim();

    // mandatory fields check
    if (!name || !email || !age) {
      alert("Name, Email and Age are required");
      return;
    }

    // email validation
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // age validation
    if (isNaN(age) || age <= 0) {
      alert("Age must be a valid number");
      return;
    }

    const newStudent = {
      ...student,
      name,
      email,
      age
    };

    if (editingStudent) {
      updateStudent(newStudent);
    } else {
      addStudent(newStudent);
    }

    // reset form
    setStudent({
      name: "",
      email: "",
      age: ""
    });

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

    </form>

  );

}

export default StudentForm;