const { query } = require("../database")

const classControllers = {
  getClasses: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM classes;`

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find classes",
        result: dbResult
      })
    } catch (err) {
      next()
    }
  },
  createClass: async (req, res, next) => {
    try {
      const { class_name, lecturer_id } = req.body

      const sql = `INSERT INTO classes VALUES (0, ?, ?)`

      const replacements = [class_name, lecturer_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created class"
      })
    } catch (err) {
      next()
    }
  },
  editClassById: async (req, res, next) => { },
  deleteClassById: async (req, res, next) => {
    try {
      const { id } = req.params

      const sql = `DELETE FROM classes WHERE id = ?`

      await query(sql, [id])

      return res.status(200).json({
        message: "Deleted class"
      })
    } catch (err) {
      next()
    }
  },
  getClassesStudentById : async (req, res, next) => {
    const { classId } = req.params

    try {
      const sql = `SELECT *, cs.id as cs_id FROM class_student AS cs
      JOIN  students AS s ON s.id = cs.student_id
      WHERE cs.class_id = ${classId}`

      const dbResult = await query(sql)

      return res.status(200).json({
        message: "Classes found",
        result: dbResult
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server error"
      })
    }
  }
}

module.exports = classControllers