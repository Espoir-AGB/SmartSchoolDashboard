import axios from "axios"

export const getStudents = async () => {
  const res = await axios.get("http://localhost:3000/students")
  return res.data
}

export const createStudent = async (data: any) => {
  const res = await axios.post("http://localhost:3000/students", data)
  return res.data
}