export const Colleges = [
    {label: 'ALL', value: 'ALL'},
    { label: "CAHS", value: "COLLEGE OF ALLIED HEALTH SCIENCES" },
    { label: "CASE", value: "COLLEGE OF ARTS, SCIENCES AND EDUCATION" },
    { label: "CBMA", value: "COLLEGE OF BUSINESS, MANAGEMENT & ACCOUNTANCY" },
    { label: "CEIS", value: "COLLEGE OF ENGINEERING AND INFORMATION SCIENCES" },
    { label: "CHTM", value: "COLLEGE OF HOSPITALITY AND TOURISM MANAGEMENT" },
    { label: "CMT", value: "COLLEGE OF MEDICAL TECHNOLOGY" },
    { label: "SLCN", value: "ST. LUKE’S COLLEGE OF NURSING" },
    { label: "THS", value: "HIGH SCHOOL" },
    { label: "GS", value: "GRADUATE SCHOOL" },
  ];


export const TableDataSample = [
    {
        "null": {
            "Aug": 7,
            "Dec": 4,
            "Nov": 29,
            "Oct": 8,
            "Sep": 1,
            "Apr": 25,
            "Feb": 3,
            "Jan": 19,
            "Jun": 1,
            "Mar": 32,
            "May": 19
        },
        "CEIS": {
            "Oct": 4
        },
        "COLLEGE OF ALLIED HEALTH SCIENCES": {
            "Aug": 42,
            "Dec": 10,
            "Nov": 16,
            "Oct": 108,
            "Sep": 20,
            "Apr": 42,
            "Feb": 45,
            "Jan": 28,
            "Jul": 7,
            "Jun": 5,
            "Mar": 45,
            "May": 51
        },
        "COLLEGE OF ARTS, SCIENCES AND EDUCATION": {
            "Aug": 8,
            "Dec": 6,
            "Nov": 20,
            "Oct": 91,
            "Sep": 20,
            "Apr": 50,
            "Feb": 62,
            "Jan": 50,
            "Jul": 10,
            "Jun": 4,
            "Mar": 110,
            "May": 50
        },
        "COLLEGE OF BUSINESS, MANAGEMENT & ACCOUNTANCY": {
            "Aug": 51,
            "Dec": 1,
            "Nov": 5,
            "Oct": 10,
            "Sep": 20,
            "Apr": 18,
            "Feb": 37,
            "Jan": 34,
            "Mar": 68,
            "May": 22
        },
        "COLLEGE OF ENGINEERING AND INFORMATION SCIENCES": {
            "Aug": 31,
            "Nov": 1,
            "Oct": 8,
            "Sep": 14,
            "Apr": 12,
            "Dec": 6,
            "Feb": 19,
            "Jan": 11,
            "Mar": 34,
            "May": 10
        },
        "COLLEGE OF HOSPITALITY AND TOURISM MANAGEMENT": {
            "Aug": 4,
            "Dec": 2,
            "Nov": 12,
            "Oct": 18,
            "Sep": 1,
            "Apr": 29,
            "Feb": 151,
            "Jan": 21,
            "Jul": 5,
            "Mar": 37,
            "May": 11
        },
        "COLLEGE OF MEDICAL TECHNOLOGY": {
            "Aug": 23,
            "Dec": 1,
            "Nov": 10,
            "Oct": 48,
            "Sep": 23,
            "Apr": 57,
            "Feb": 17,
            "Jan": 72,
            "Jul": 1,
            "Jun": 2,
            "Mar": 53,
            "May": 18
        },
        "GRADUATE SCHOOL": {
            "Aug": 49,
            "Dec": 3,
            "Nov": 65,
            "Oct": 17,
            "Sep": 41,
            "Apr": 60,
            "Feb": 39,
            "Jan": 14,
            "Jul": 16,
            "Jun": 20,
            "Mar": 91,
            "May": 32
        },
        "HIGHSCHOOL": {
            "Nov": 10,
            "Oct": 32,
            "Sep": 1
        },
        "ST. LUKE’S COLLEGE OF NURSING": {
            "Aug": 236,
            "Dec": 3,
            "Nov": 43,
            "Oct": 185,
            "Sep": 28,
            "Apr": 127,
            "Feb": 129,
            "Jan": 132,
            "Jul": 79,
            "Jun": 62,
            "Mar": 298,
            "May": 123
        }
    }
]

export const sampleResult = [
    {
        "department": "Department 1",
        "year": 2022,
        "month": "Dec",
        "event_count": 36
    },
    {
        "department": "Department 1",
        "year": 2023,
        "month": "Jan",
        "event_count": 28
    },
    {
        "department": "Department 2",
        "year": 2022,
        "month": "Dec",
        "event_count": 8
    },
    {
        "department": "Department 2",
        "year": 2023,
        "month": "Jan",
        "event_count": 50
    },
    {
        "department": "Department 3",
        "year": 2022,
        "month": "Dec",
        "event_count": 1
    },
    {
        "department": "Department 3",
        "year": 2023,
        "month": "Jan",
        "event_count": 34
    },
    {
        "department": "Department 4",
        "year": 2023,
        "month": "Jan",
        "event_count": 11
    },
    {
        "department": "Department 5",
        "year": 2022,
        "month": "Dec",
        "event_count": 2
    },
    {
        "department": "Department 5",
        "year": 2023,
        "month": "Jan",
        "event_count": 21
    },
    {
        "department": "Department 6",
        "year": 2022,
        "month": "Dec",
        "event_count": 17
    },
    {
        "department": "Department 6",
        "year": 2023,
        "month": "Jan",
        "event_count": 72
    },
    {
        "department": "Deparment 7",
        "year": 2022,
        "month": "Dec",
        "event_count": 38
    },
    {
        "department": "Deparment 7",
        "year": 2023,
        "month": "Jan",
        "event_count": 14
    },
    {
        "department": "Department 8",
        "year": 2022,
        "month": "Dec",
        "event_count": 44
    },
    {
        "department": "Department 8",
        "year": 2023,
        "month": "Jan",
        "event_count": 132
    }
]


// const resultArray = Object.keys(organizedData).map((college, idx) => ({
//     id: idx + 1,
//     colleges: college,
//     data: orderedMonths.reduce((acc, month) => {
//       if (organizedData[college][month]) {
//         acc[month] = organizedData[college][month];
//       }
//       return acc;
//     }, {}),
//     year: organizedData[college]['year'] // Add the year property
//   }));