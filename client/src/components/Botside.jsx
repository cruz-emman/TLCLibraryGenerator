import React, { useState } from "react";
import useUserResultStore from "@/services/store";
import { Button } from "./ui/button";
import XLSX from "xlsx";
import { sampleData } from "@/dataSample.js";
import TableData from "./TableData";
const Botside = () => {
  
  const { userResults, setUserResults, clearUserResults, loading, setLoading, setTotalUsers, totalUsers, clearTotalUsers } =
  useUserResultStore();


  const handleExportTable = async () =>{
    try {
      setLoading(true)
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      setLoading(true)
      const exportData = (department) => {
        const filteredData = userResults.filter((data) => data.department === department);
        return filteredData.map((row) => ({
          time: row.formatted_month_year + " " + row.formatted_time,
          userfullname: row.userfullname,
          college: row.department,
          type: row.type,
          affecteduser: row.affecteduser,
          eventcontext: row.eventcontext, 
          component: row.component, 
          eventname: row.eventname,
          description: row.description,
          origin: row.origin,
          ipaddress: row.ipaddress,
        }));
      };
  
      const resultCAHS = exportData("COLLEGE OF ALLIED HEALTH SCIENCES");
      const resultCASE = exportData("COLLEGE OF ARTS, SCIENCES AND EDUCATION");
      const resultCBMA = exportData("COLLEGE OF BUSINESS, MANAGEMENT & ACCOUNTANCY");
      const resultCEIS = exportData("COLLEGE OF ENGINEERING AND INFORMATION SCIENCES");
      const resultCHTM = exportData("COLLEGE OF HOSPITALITY AND TOURISM MANAGEMENT");
      const resultCMT = exportData("COLLEGE OF MEDICAL TECHNOLOGY");
      const resultSLCN = exportData("ST. LUKE’S COLLEGE OF NURSING");
      const resultTHS = exportData("HIGHSCHOOL");
      const resultGS = exportData("GRADUATE SCHOOL");
      const resultNoCollege = exportData(null);
  
        const sheetCAHS = XLSX.utils.json_to_sheet(resultCAHS);
        const sheetCASE = XLSX.utils.json_to_sheet(resultCASE);
        const sheetCBMA = XLSX.utils.json_to_sheet(resultCBMA);
        const sheetCEIS = XLSX.utils.json_to_sheet(resultCEIS);
        const sheetCHTM = XLSX.utils.json_to_sheet(resultCHTM);
        const sheetCMT = XLSX.utils.json_to_sheet(resultCMT);
        const sheetSLCN = XLSX.utils.json_to_sheet(resultSLCN);
        const sheetTHS = XLSX.utils.json_to_sheet(resultTHS);
        const sheetGS = XLSX.utils.json_to_sheet(resultGS);
        const sheetNoCollege = XLSX.utils.json_to_sheet(resultNoCollege);
  
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheetCAHS, "CAHS");
        XLSX.utils.book_append_sheet(workbook, sheetCASE, "CASE");
        XLSX.utils.book_append_sheet(workbook, sheetCBMA, "CBMA");
        XLSX.utils.book_append_sheet(workbook, sheetCEIS, "CEIS");
        XLSX.utils.book_append_sheet(workbook, sheetCHTM, "CHTM");
        XLSX.utils.book_append_sheet(workbook, sheetCMT, "CMT");
        XLSX.utils.book_append_sheet(workbook, sheetSLCN, "SLCN");
        XLSX.utils.book_append_sheet(workbook, sheetTHS, "THS");
        XLSX.utils.book_append_sheet(workbook, sheetGS, "GS");
        XLSX.utils.book_append_sheet(workbook, sheetNoCollege, "No College");
  
        XLSX.writeFile(workbook, "TLC-Library.xlsx", { compression: true });
  
    } catch (error) {
      console.error("Error exporting data:", error);
    }
    finally{
      setLoading(false)
    }
  };


  return (
    <div className="flex flex-col gap-1">
      <Button disabled={loading} variant="exportTable"  onClick={handleExportData}>
        {loading ? "Gathering data...": "Export"}
      </Button>
     
      
        {totalUsers.length <= 0 ? "Waiting for the data...": (
          <TableData disabled={loading}   totalUsers={totalUsers} loading={loading} />
        )}
    </div>
  );
};

export default Botside;
