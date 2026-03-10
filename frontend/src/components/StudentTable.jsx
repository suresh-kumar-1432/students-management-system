import { exportToExcel } from "../utils/excelExport";

function StudentTable({ students, setEditingStudent, deleteStudent }) {

  return (

    <div>

      <button
        className="download-btn"
        onClick={() => exportToExcel(students)}
        style={{ marginBottom: "10px" }}
      >
        Download Excel
      </button>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (

        <table border="1" width="100%" style={{ textAlign: "center" }}>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>

                <td>

                  <button
                    onClick={() => setEditingStudent(student)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default StudentTable;