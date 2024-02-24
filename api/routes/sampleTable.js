import * as XLSX from "xlsx";
import { connection } from "../database/db.js";
import express from "express";
const router = express.Router();


router.get("/table", async (req, res) => {

    const { from, startYear, end, endYear, type } = req.query;

   try {
    
    function groupDataByDepartment(results, startMonth, endMonth) {
        
        const monthNames = [
          { abbreviation: "Jan", number: 1 },
          { abbreviation: "Feb", number: 2 },
          { abbreviation: "Mar", number: 3 },
          { abbreviation: "Apr", number: 4 },
          { abbreviation: "May", number: 5 },
          { abbreviation: "Jun", number: 6 },
          { abbreviation: "Jul", number: 7 },
          { abbreviation: "Aug", number: 8 },
          { abbreviation: "Sep", number: 9 },
          { abbreviation: "Oct", number: 10 },
          { abbreviation: "Nov", number: 11 },
          { abbreviation: "Dec", number: 12 },
        ];
        
        const groupedData = {};
        let currentID = 1; // Initialize ID counter
        let currentDepartment;
    
        results.forEach((entry) => {
            const { department, year, month, event_count } = entry;
            
            for(let i = 0; i < entry.length; i++){
                return department[i]
            }
    
            // if (department !== currentDepartment) {
            //     currentDepartment = department;
            //     currentID = 1; // Reset ID counter when department changes
            // }
    
            // if (!groupedData[department]) {
            //     groupedData[department] = [];
                
            // }
    
            // groupedData[department].push({
            //     id: currentID++,
            //     [month]: event_count,
            //     year: year,
            // });
        });
    
        return groupedData;
    }

    const groupedData = groupDataByDepartment(sampleResult, 12, 1)
    res.status(200).json(groupedData)
    
   } catch (error) {
    
   }
  });


  router.get("/table1", async (req, res) => {
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
  
      function getAllMonths(startYear, startMonth, endYear, endMonth) {
        const start = startYear * 12 + startMonth - 1;
        return Array.from(
          { length: endYear * 12 + endMonth - start },
          (_, i) => ({
            id: i + 1,
            month: ((i + start) % 12) + 1,
            monthName: monthNames[(i + start) % 12],
            year: Math.floor((i + start) / 12),
          })
        );
      }
  
      // the months of the tables
      const resultDates = getAllMonths(
        intStartYear,
        intStartMonth,
        intEndYear,
        intEndMonth
      );
  
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
  
      const organizedData = results.reduce(
        (acc, { department, year, month, event_count }) => {
          acc[department] = acc[department] || {};
          acc[department][month] = event_count;
          return acc;
        },
        {}
      );
  
      let total_output = {};
  
      for (const department in organizedData) {
        const monthlyData = organizedData[department];
        for (const month in monthlyData) {
          const count = monthlyData[month];
          total_output[`total_${month.toLowerCase()}`] =
            (total_output[`total_${month.toLowerCase()}`] || 0) + count;
        }
      }
  
      function groupDataByDepartment(results) {
        const monthNames = [
          { abbreviation: "Jan", number: 1 },
          { abbreviation: "Feb", number: 2 },
          { abbreviation: "Mar", number: 3 },
          { abbreviation: "Apr", number: 4 },
          { abbreviation: "May", number: 5 },
          { abbreviation: "Jun", number: 6 },
          { abbreviation: "Jul", number: 7 },
          { abbreviation: "Aug", number: 8 },
          { abbreviation: "Sep", number: 9 },
          { abbreviation: "Oct", number: 10 },
          { abbreviation: "Nov", number: 11 },
          { abbreviation: "Dec", number: 12 },
        ];
        
        const groupedData = {};
        let currentID = 1; // Initialize ID counter
        let currentDepartment;
    
        results.forEach((entry) => {
            const { department, year, month, event_count } = entry;
    
            if (department !== currentDepartment) {
                currentDepartment = department;
                currentID = 1; // Reset ID counter when department changes
            }
    
            if (!groupedData[department]) {
                groupedData[department] = [];
            }
    
            groupedData[department].push({
                id: currentID++,
                [month]: event_count,
                year: year,
            });
        });
    
        return groupedData;
    }
      const orderedMonths = getMonthOrder(intStartMonth, intEndMonth);
  
      
  
      
      res.status(200).json({ results});
      // res.status(200).json({ groupedData });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });
export default router;
