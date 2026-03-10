import axios from "axios";

const API_URL = "https://students-backend-qaxl.onrender.com/students";

export const getStudents = () => axios.get(API_URL);

export const addStudentAPI = (student) =>
  axios.post(API_URL, student);

export const updateStudentAPI = (id, student) =>
  axios.put(`${API_URL}/${id}`, student);

export const deleteStudentAPI = (id) =>
  axios.delete(`${API_URL}/${id}`);