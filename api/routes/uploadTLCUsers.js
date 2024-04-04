import express from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import { connection } from "../database/db.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("excel"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No File Uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    //0-9
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const columnsArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    })[0];

    const validation = ["firstname", "lastname", "department", "type"];

    const isExisting = validation.every((r) => columnsArray.includes(r));

    if (isExisting === true) {
      const successData = [];
      const failedData = [];

      for (let i = 0; i < data.length; i++) {
        const { firstname, lastname, department, type } = data[i];
        let fullname = `${firstname} ${lastname}`;

        const sql =
          "INSERT INTO users (firstname,lastname,department,type, fullname ) VALUES(?, ?, ?, ?, ?)";

        try {
          const [rows, fields] = await connection.execute(sql, [
            firstname || null,
            lastname || null,
            department || null,
            type || null,
            fullname || null,
          ]);

          if (rows.affectedRows) {
            successData.push(data[i]);
          } else {
            failedData.push(data[i]);
          }
        } catch (error) {
          console.error("Error executing SQL query:", error);
          failedData.push(data[i]);
          return res.status(400).json(error);
        }
      }
      return res.json({ msg: "Ok", data: { successData, failedData } });
    } else {
      return res.status(400).json("Excel header is not the same!");
    }
  } catch (error) {
    console.error("Error processing file:", error);
    return res
      .status(500)
      .json({ error: "Error reading/uploading file. Please try again." });
  }
});

export default router;
