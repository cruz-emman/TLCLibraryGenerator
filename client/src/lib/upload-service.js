import * as XLSX from "xlsx";

export const readAsBinaryString = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsBinaryString(file);
  });
};

export const makeArrayToSmall = (headerRow) => {
  let arrayToCheck = [];

  for (let i = 0; i < headerRow.length; i++) {
    let lowercaseLetter = headerRow[i].toLowerCase().replace(/\s/g, "");
    arrayToCheck.push(lowercaseLetter);
  }
  return arrayToCheck;
};
