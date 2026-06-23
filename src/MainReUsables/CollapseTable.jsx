import React from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddTask from "../Components/AddTask";

const CollapseTable = () => {
  const columns = [
    //Parent Columns for Table
    {
      name: "Id",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "Location",
      options: {
        filter: false,
      },
    },
    {
      name: "Age",
      options: {
        filter: true,
      },
    },
    {
      name: "Salary",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const data = [
    //Parent Data for Table
    {
      Id: 1,
      Name: "Gabby George",
      Title: "Business Analyst",
      Location: "Minneapolis",
      Age: 30,
      Salary: "$100,000",
    },
    {
      Id: 2,
      Name: "Aiden Lloyd",
      Title: "Business Consultant",
      Location: "Dallas",
      Age: 55,
      Salary: "$200,000",
    },
    {
      Id: 3,
      Name: "Jaden Collins",
      Title: "Attorney",
      Location: "Santa Ana",
      Age: 27,
      Salary: "$500,000",
    },
    {
      Id: 4,
      Name: "Franky Rees",
      Title: "Business Analyst",
      Location: "St. Petersburg",
      Age: 22,
      Salary: "$50,000",
    },
    {
      Id: 5,
      Name: "Aaren Rose",
      Title: "Business Consultant",
      Location: "Toledo",
      Age: 28,
      Salary: "$75,000",
    },
    {
      Id: 6,
      Name: "Blake Duncan",
      Title: "Business Management Analyst",
      Location: "San Diego",
      Age: 65,
      Salary: "$94,000",
    },
    {
      Id: 7,
      Name: "Frankie Parry",
      Title: "Agency Legal Counsel",
      Location: "Jacksonville",
      Age: 71,
      Salary: "$210,000",
    },
    // add more as needed
  ];

  const columns2 = [
    //Child Columns for Table
    {
      name: "childId",
    },
    {
      name: "Id",
    },
    {
      name: "Name",
    },
    {
      name: "Title",
    },
    {
      name: "Location",
    },
    {
      name: "Age",
    },
    {
      name: "Salary",
    },
  ];

  const childData = [
    //Child Data for Table
    {
      childId: 1,
      Id: 1,
      Name: "Bobby",
      Title: "Business Analyst",
      Location: "Minneapolis",
      Age: 30,
      Salary: "$100,000",
    },
    {
      childId: 2,
      Id: 2,
      Name: "Franky Miles",
      Title: "Industrial Analyst",
      Location: "Buffalo",
      Age: 49,
      Salary: "$190,000",
    },
    {
      childId: 3,
      Id: 3,
      Name: "Glen Nixon",
      Title: "Corporate Counselor",
      Location: "Arlington",
      Age: 44,
      Salary: "$80,000",
    },
    {
      childId: 4,
      Id: 4,
      Name: "Gabby Strickland",
      Title: "Business Process Consultant",
      Location: "Scottsdale",
      Age: 26,
      Salary: "$45,000",
    },
    {
      childId: 5,
      Id: 5,
      Name: "Mason Ray",
      Title: "Computer Scientist",
      Location: "San Francisco",
      Age: 39,
      Salary: "$142,000",
    },
    {
      childId: 6,
      Id: 6,
      Name: "Mason ",
      Title: "Computer ",
      Location: "San ",
      Age: 39,
      Salary: "$142,000",
    },
    {
      childId: 7,
      Id: 7,
      Name: "Mason uu",
      Title: "Computer uu",
      Location: "San uu",
      Age: 39,
      Salary: "$142,000",
    },
    // add more as needed
  ];

  const newData = {
    name: "Action",
  };
  //push newData to push object
  columns2.push(newData);

  const theme = createTheme({
    components: {
      MUIDataTableSelectCell: {
        styleOverrides: {
          expandDisabled: {
            visibility: "hidden",
          },
        },
      },
    },
  });

  const options = {
    pagination: false,
    checkBox: false,
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none", // This removes checkboxes
    expandableRows: true, // This adds expandable rows
    expandableRowsOnClick: true, // This adds expandable rows
    expandableRowsHeader: false, // This adds expandable rows for main header

    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <AddTask
          rowData={rowData}
          columns={columns}
          columns2={columns2}
          childData={childData}
        />
      );
    },
  };

  // const components = {
  //   ExpandButton: (props) => {
  //     // Example: you might want to hide expand button for some rows
  //     if (props.dataIndex === 3 || props.dataIndex === 4) {
  //       return <div style={{ width: "24px" }} />;
  //     }
  //     return <ExpandButton {...props} />;
  //   },
  // };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={"ACME Employee List"}
        data={data}
        columns={columns}
        options={options}
        // components={components}
      />
    </ThemeProvider>
  );
};

export default CollapseTable;
