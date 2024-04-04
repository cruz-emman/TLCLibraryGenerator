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
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const columnsArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    })[0];

    const validation = [
      "time",
      "userfullname",
      "affecteduser",
      "eventcontext",
      "component",
      "eventname",
      "description",
      "origin",
      "ipaddress",
    ];

    const MakeArrayToSmall = (headerRow) => {
      let arrayToCheck = [];

      for (let i = 0; i < headerRow.length; i++) {
        let lowercaseLetter = headerRow[i].toLowerCase().replace(/\s/g, "");
        arrayToCheck.push(lowercaseLetter)
      }
      return arrayToCheck
    
    };

    let resultArray = MakeArrayToSmall(columnsArray);

    var is_same =
      validation.length == resultArray.length &&
      validation.every(function (element, index) {
        return element === resultArray[index];
      });


    if(is_same === true){
      const successData = [];
      const failedData = [];
  
      for (let i = 0; i < data.length; i++) {
        const {
          time,
          userfullname,
          affecteduser,
          eventcontext,
          component,
          eventname,
          description,
          origin,
          ipaddress,
        } = data[i];
  
        // Replace undefined values with null
        const values = [
          time || null,
          userfullname || null,
          affecteduser || null,
          eventcontext || null,
          component || null,
          eventname || null,
          description || null,
          origin || null,
          ipaddress || null,
        ];
  
        const sql =
          "INSERT INTO userlibrary (time, userfullname, affecteduser, eventcontext, component, eventname, description, origin, ipaddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
        try {
          const [rows, fields] = await connection.execute(sql, values);
  
          if (rows.affectedRows) {
            successData.push(data[i]);
          } else {
            failedData.push(data[i]);
          }
        } catch (error) {
          console.error("Error executing SQL query:", error);
          failedData.push(data[i]);
        }
      }
  
      // Assuming 'excel' is the file path, make sure to replace it with the actual file path if different
  
      return res.json({ msg: "Ok", data: { successData, failedData } });
    }
    else{
      return res.json({msg: "Excel Header is not valid,"})
    }

   
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;