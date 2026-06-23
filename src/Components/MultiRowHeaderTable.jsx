import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material";

function MultiRowHeaderTable({ columns, data }) {
  const options = {
    // filterType: "none",
    checkBox: false,
    pagination: false,
    selectableRowsHideCheckboxes: true,
  };

  let mainColumns = Object.keys(data[0]);

  columns = [
    {
      name: "Health & Safety",
      options: {
        filter: true,
        // filterType: "none",
        checkBox: false,
        customHeadRender: (tableMeta, value) => (
          <>
            <TableRow key={tableMeta.index}>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Health & Safety
              </TableCell>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                Health & Safety
              </TableCell>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                Health & Safety
              </TableCell>
            </TableRow>
            <TableRow key={tableMeta.index}>
              {mainColumns.map((EMPLOYE, index) => {
                // console.log(index
                return (
                  <TableCell
                    style={{
                      width: EMPLOYE == "id" ? "50px" : "130px",
                      textAlign: "center",
                    }}
                    key={index}
                  >
                    {EMPLOYE}
                  </TableCell>
                );
              })}
            </TableRow>
          </>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const columnIndex = tableMeta.columnIndex;
          return (
            <>
              <TableRow style={{ padding: "0px" }}>
                {data.map((EMPLOYE, index) => {
                  // console.log("val--" + data[rowIndex][mainColumns[index]]);
                  if (data[rowIndex][mainColumns[index]] === undefined) {
                    return false;
                  }
                  return (
                    <TableCell
                      style={{
                        width: mainColumns[index] == "id" ? "50px" : "130px",
                        padding: "0px",
                        height: "4rem",
                        textAlign: "center",
                        borderRight: "1px solid black",
                        borderBottom: "none",
                      }}
                      // style={{ width: "130px", border: "none" }}
                      key={rowIndex}
                    >
                      {/* Body content */}
                      {data[rowIndex][mainColumns[index]]}
                    </TableCell>
                  );
                })}
              </TableRow>
            </>
          );
        },
      },
    },
  ];

  const DataTableContainer = styled("div")(() => ({
    //All the Styles will come from Table.css,
    "& .MuiTableRow-root  .MuiTableCell-body": {
      padding: "0px !important",
    },
    ".MuiTableBody-root": {
      borderLeft: "1px solid black!important",
      borderBottom: "2px solid black!important",
    },
  }));

  return (
    <DataTableContainer className="ml-3 mb-3">
      <MUIDataTable
        title={"Employee Data"}
        data={data}
        columns={columns}
        options={options}
        className="w-fit"
      />
    </DataTableContainer>
  );
}

export default MultiRowHeaderTable;
