import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableData = ({ totalUsers, loading }) => {
  if (loading) {
    return <div>Data is loading...</div>;
  }

  const resultTable = Object.values(totalUsers)[0];
  const monthDates = Object.values(totalUsers)[1];
  const monthToCheck = Object.values(totalUsers)[2];

  const resultData = Object.entries(resultTable).map(([key, value]) => ({
    key,
    value,
  }));

  const renderCell = (res, monthToCheck) => {
    const matchingMonth = res.find(item => item.month === monthToCheck.month && item.year === monthToCheck.year);
    return matchingMonth ? matchingMonth.result : 0;
  };


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Attendance </TableHead>
          {monthDates.map((item, index) => (
            <TableCell key={index}>{item}</TableCell>
          ))}
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resultData.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {item.key === "null" ? "NO COLLEGE" : item.key}
              </TableCell>
              {monthToCheck.map((month, index) => (
                <TableCell key={index}>{renderCell(item.value, month)}</TableCell>
              ))}
              {/* Total column logic goes here */}
              <TableCell>Hello</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default TableData;
