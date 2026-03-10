import { exportToExcel } from "../utils/excelExport";

function StudentTable({ students, setEditingStudent, deleteStudent }) {

  return (

    <div>

      <button
        className="download-btn"
        onClick={() => exportToExcel(students)}
      >
        <i className="fas fa-file-excel"></i> Download Excel
      </button>

      <table>

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
                  className="edit-btn"
                  onClick={() => setEditingStudent(student)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default StudentTable;