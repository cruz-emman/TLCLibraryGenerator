import * as XLSX from "xlsx";
import { connection } from "../database/db.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const { from, startYear, end, endYear, type } = req.query;

  try {
    const sql = `
    SELECT
    DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') as formatted_month_year,
    tlc.userfullname,
    u.department,
    u.type,
    tlc.affecteduser,
    tlc.eventcontext,
    tlc.component,
    tlc.eventname,
    tlc.description,
    tlc.origin,
    tlc.ipaddress
FROM
    userlibrary tlc
LEFT JOIN
    users u ON tlc.userfullname = u.fullname
WHERE
	u.type = ?
    AND DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') BETWEEN ? AND ?;


    `;

    const [results, fields] = await connection.query(sql, [
      type,
      `${startYear}-${from}`,
      `${endYear}-${end}`,
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/table", async (req, res) => {
  const { from, startYear, end, endYear, type } = req.query;

  try {
    const sql = `
    SELECT
    u.department,
    YEAR(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')) AS year,
    DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%b') AS month,
    COUNT(*) AS event_count
    FROM
        userlibrary tlc
    LEFT JOIN
        users u ON tlc.userfullname = u.fullname
    WHERE
        u.type = ?
        AND DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') BETWEEN ? AND ?
        GROUP BY
        u.department,
        year,
        month
    ORDER BY
        u.department,
        STR_TO_DATE(CONCAT('01', '-', MONTH(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')), '-', year), '%d-%m-%Y'),
        year;
    
  `;

    const [results, fields] = await connection.query(sql, [
      type,
      `${startYear}-${from}`,
      `${endYear}-${end}`,
    ]);

    //must be limited by the query

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let intStartYear = parseInt(startYear);
    let intStartMonth = parseInt(from);
    let intEndMonth = parseInt(end);
    let intEndYear = parseInt(endYear);

    const getMonthOrder = (startIndex, endIndex) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return startIndex <= endIndex
        ? monthNames.slice(startIndex - 1, endIndex)
        : [
            ...monthNames.slice(startIndex - 1),
            ...monthNames.slice(0, endIndex),
          ];
    };

    function groupResultsByDepartment(results) {
      const groupedData = [];

      results.forEach((entry) => {
        const { department, year, month, event_count } = entry;

        let departmentIndex = groupedData.findIndex(
          (item) => item.department === department
        );

        if (departmentIndex === -1) {
          // If department doesn't exist in groupedData, initialize it
          groupedData.push({
            department: department,
            totalResult: 0,
            data: [],
          });
          departmentIndex = groupedData.length - 1;
        }

        groupedData[departmentIndex].data.push({
          id: groupedData[departmentIndex].data.length + 1, // Use the length of the data array as ID
          month: month,
          result: event_count,
          year: year,
        });

        groupedData[departmentIndex].totalResult += event_count; // Update total result for the department
      });

      return groupedData;
    }

    const orderedMonths = getMonthOrder(intStartMonth, intEndMonth);
    const groupedData = groupResultsByDepartment(results);

    function generateMonthColumn(startMonth, startYear, endMonth, endYear) {
      const months = [];
      let currendId = 1;
      let currentDate = new Date(startYear, startMonth - 1, 1); // Month is 0-indexed

      while (
        currentDate.getFullYear() < endYear ||
        (currentDate.getFullYear() === endYear &&
          currentDate.getMonth() <= endMonth - 1)
      ) {
        const month = currentDate.toLocaleString("default", { month: "short" });
        const year = currentDate.getFullYear();
        months.push({ id: currendId++, month: month, year: year });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return months;
    }

    // Example usage:

    const column = generateMonthColumn(
      intStartMonth,
      intStartYear,
      intEndMonth,
      intEndYear
    );

    const sql2 = `SELECT
    YEAR(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')) AS year,
    DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%b') AS month,
    COUNT(*) AS event_count
    FROM
        userlibrary tlc
    LEFT JOIN
        users u ON tlc.userfullname = u.fullname
    WHERE
    u.type = ?
    AND DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') BETWEEN ? AND ?
        GROUP BY
        year,
        month
    ORDER BY
        STR_TO_DATE(CONCAT('01', '-', MONTH(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')), '-', year), '%d-%m-%Y'),
        year;`;

    const [results2, fields2] = await connection.query(sql2, [
      type,
      `${startYear}-${from}`,
      `${endYear}-${end}`,
    ]);

    const sql3 = `
    SELECT

    COUNT(*) AS event_count
    FROM
        userlibrary tlc
    LEFT JOIN
        users u ON tlc.userfullname = u.fullname
    WHERE
        u.type = ?
        AND DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') BETWEEN ? AND ?
        `

        const [results3, fields3] = await connection.query(sql3, [
          type,
          `${startYear}-${from}`,
          `${endYear}-${end}`,
        ]);
    res.status(200).json({ groupedData, orderedMonths, column, results2, results3 });
    // res.status(200).json({ groupedData });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/resultPerMonth", async (req, res) => {
  const { from, startYear, end, endYear, type } = req.query;
  try {
    const sql = `SELECT
    YEAR(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')) AS year,
    DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%b') AS month,
    COUNT(*) AS event_count
    FROM
        userlibrary tlc
    LEFT JOIN
        users u ON tlc.userfullname = u.fullname
    WHERE
    u.type = ?
    AND DATE_FORMAT(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y'), '%Y-%m') BETWEEN ? AND ?
        GROUP BY
        year,
        month
    ORDER BY
        STR_TO_DATE(CONCAT('01', '-', MONTH(STR_TO_DATE(SUBSTRING_INDEX(tlc.time, ',', 1), '%d/%m/%y')), '-', year), '%d-%m-%Y'),
        year;`;

    const [results, fields] = await connection.query(sql, [
      type,
      `${startYear}-${from}`,
      `${endYear}-${end}`,
    ]);

    res.status(200).json(results)
    
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
