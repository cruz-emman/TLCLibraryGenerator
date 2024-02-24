import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import XLSX from "xlsx";

const TableData = ({ totalUsers, loading }) => {
  const column = totalUsers.column;

  if (loading) {
    return <div>Data is loading...</div>;
  }

  const renderCell = (res, monthToCheck) => {
    const matchingMonth = res.find(
      (item) =>
        item.month === monthToCheck.month && item.year === monthToCheck.year
    );
    return matchingMonth ? matchingMonth.result : 0;
  };

  function exportToExcel() {
    /* Select the HTML table */
    var table = document.getElementById("myTable");
  
    /* Convert the HTML table to a worksheet */
    var worksheet = XLSX.utils.table_to_sheet(table);
  
    /* Create a new workbook */
    var workbook = XLSX.utils.book_new();
  
    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    /* Export the workbook */
    XLSX.writeFile(workbook, "example.xlsx");
  }

  return (
    <>
     <Button disabled={loading}  onClick={exportToExcel}>
        {loading ? "Gathering data...": "Download Table"}
      </Button>
      <Table id="myTable">
        <TableHeader>
          <TableRow>
            <TableHead>Attendance </TableHead>
            {totalUsers.orderedMonths.map((item, index) => {
              return <TableCell key={index}>{item}</TableCell>;
            })}
            <TableCell className="font-bold ">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalUsers.groupedData.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  {item.department === null ? "No College" : item.department}
                </TableCell>

                {column.map((month, index) => (
                  <TableCell key={index}>
                    {renderCell(item.data, month)}
                  </TableCell>
                ))}

                <TableCell className="font-bold">{item.totalResult}</TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableHead>Total</TableHead>
            {totalUsers.results2.map((item, index) => {
              return (
                <TableCell key={index} className="font-bold">{item.event_count}</TableCell>
              );
            })}
            <TableCell className="font-bold">
              {totalUsers.results3[0].event_count}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default TableData;
