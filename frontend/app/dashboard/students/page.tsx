"use client"

import { useEffect, useState } from "react"
import { getStudents } from "@/api/students"

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🚀 FETCH START")

        const data = await getStudents()

        console.log("✅ DATA RECEIVED:", data)

        const raw = await getStudents()

        const studentsData =
          raw?.data ||
          raw?.students ||
          raw

        setStudents(studentsData)
      } catch (error) {
        console.log("❌ ERROR:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>⏳ Chargement...</p>

  return (
    <div>
      <h1>👨‍🎓 Students</h1>

      <table border={1} cellPadding={10} style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Matricule</th>
            <th>Class</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.matricule}</td>
              <td>{s.class?.level} {s.class?.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}