import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import "./TableField.css";
import { TableCell, TableRow } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import BootstrapTooltip from "./BootstrapTooltip";

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  // palette: {
  // header: {
  //   main: "#361aa9", // Adjust the color as needed
  // },
  // background: {
  //   default: "#f5f5f5", //#0f172a
  //   paper: "#f5f5f5", //#1e293b
  // },
  // mode: "dark",// Change to Dark mode
  // primary: {
  //   main: "#1976d2", // Change primary color
  // },
  // secondary: {
  //   main: "#f44336", // Change secondary color
  // },
  // },
  Components: {
    MuiButton: {
      styleOverrides: {
        // head: {
        //   background: "#361aa9",
        // },
        root: {
          textTransform: "none",
          fontFamily: "Poppins, sans-serif",
        },
        body: {
          fontFamily: "Poppins, sans-serif",
          // height: "100px",
        },
      },
    },
  },
});

const CustomToolbar = ({ onPrint }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div> {/* Place any other custom toolbar items here */}</div>
    <div>
      <button onClick={onPrint}>Print</button>
    </div>
  </div>
);

const TableField = ({
  title,
  sampleColumns,
  data,
  columnsHide,
  checkBox,
  selectableRows,
  showPrint,
  showDownload,
  showSearch,
  pagination,
  showFilter,
  filterType,
  elevation,
  rowsPerPage,
  rowsPerPageOptions,
  fixedHeader,
  fixedSelectColumn,
  tableBodyHeight,
  tableBodyMaxHeight,
  caseSensitive,
  onRowsDelete,
  rowHover,
  addSort,
  allColumnsSort,
  columnsToSort,
  showEditDelBtn,
  editRowCallBack,
  deleteRowCallBack,
  viewColumns,
}) => {
  const getCustomBodyRender = () => (value, tableMeta, updateValue) =>
    showEditDelBtn === "edit-delete" ? (
      <div className="flex justify-around">
        <div className="">
          <BootstrapTooltip title="Edit">
            <EditIcon
              className="text-blue-500 cursor-pointer"
              onClick={() => editRowCallBack(tableMeta.rowData)}
            />
          </BootstrapTooltip>
        </div>
        <div className="">
          <BootstrapTooltip title="Delete">
            <DeleteIcon
              className="text-red-500 cursor-pointer"
              onClick={() => deleteRowCallBack(tableMeta.rowData)}
            />
          </BootstrapTooltip>
        </div>
      </div>
    ) : showEditDelBtn === "edit" ? (
      <div className="flex justify-center">
        <BootstrapTooltip title="Edit">
          <EditIcon
            className="text-blue-500 cursor-pointer"
            onClick={() => editRowCallBack(tableMeta.rowData)}
          />
        </BootstrapTooltip>
      </div>
    ) : (
      <div className="flex justify-center">
        <BootstrapTooltip title="Delete">
          <DeleteIcon
            className="text-red-500 cursor-pointer"
            onClick={() => deleteRowCallBack(tableMeta.rowIndex)}
          />
        </BootstrapTooltip>
      </div>
    );
  // console.log(data);

  let columns = [];
  if (data.length === 0) {
    columns = sampleColumns;
  } else {
    const keys = Object.keys(data[0]);
    // Create columns array using the keys
    columns = keys
      // .filter((key) => (key = !columnsHide.includes(key))) // Exclude the "id" column
      .map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        name: key,
        options: {
          sort:
            columnsToSort.length > 0 && columnsToSort.includes(key)
              ? true
              : allColumnsSort,
          display: columnsHide.includes(key) ? "excluded" : true,
          filter: !columnsHide.includes(key),
        },
      }));
  }
  // // Extract keys from the first object in the data array

  // console.log(columns);

  const handlePrint = () => {
    // Hide the last column before printing
    console.log("handlePrint");
    const lastColumnIndex = columns.length - 1;
    const table = document.querySelector(".MuiTable-root");
    const cells = table.querySelectorAll(
      `td:nth-child(${lastColumnIndex + 1})`
    );
    cells.forEach((cell) => {
      cell.style.display = "none";
    });
    // Trigger the print action
    window.print();
    // Restore the display of the last column after printing
    cells.forEach((cell) => {
      cell.style.display = "";
    });
  };

  const options = {
    checkBox: checkBox,
    selectableRows: selectableRows, // Use "multiple", "single", or "none"
    print: showPrint,
    download: showDownload,
    search: showSearch,
    pagination: pagination,
    sort: addSort,
    filter: showFilter,
    filterType: filterType,
    elevation: elevation, // remove shadow
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: rowsPerPageOptions,
    fixedHeader: fixedHeader,
    fixedSelectColumn: fixedSelectColumn,
    // tableBodyHeight: tableBodyHeight,
    tableBodyMaxHeight: tableBodyMaxHeight,
    caseSensitive: caseSensitive,
    onRowsDelete: onRowsDelete,
    rowHover: rowHover,
    viewColumns: viewColumns,
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: "No data found",
      },
    },
    // customToolbar: () => {
    //   return <button onClick={this.handleDownloadPDF}>Download PDF</button>;
    // },
    // customToolbarSelect: () => {
    //   return <CustomToolbar onPrint={handlePrint} />;
    // },
  };

  const newData = {
    name: "Action",
    label: "Action",
    options: {
      sort: false,
      customBodyRender: getCustomBodyRender(),
    },
  };
  if (showEditDelBtn === "edit-delete" && data.length > 0) {
    //push newData to push object
    columns.push(newData);
  }

  const DataTableContainer = styled("div")(() => ({
    //All the Styles will come from Table.css,
    "& .tss-1cdcmys-MUIDataTable-responsiveBase": {
      height: tableBodyHeight + " !important",
    },
  }));

  return (
    <DataTableContainer className="mt-4">
      <ThemeProvider theme={theme}>
        {/* <TableRow>
          <TableCell>Title</TableCell>
        </TableRow>
        <Table>
          <TableRow colSpan={8}>
            <TableCell colSpan={2}>hh</TableCell>
            <TableCell colSpan={2}>hh</TableCell>
            <TableCell colSpan={2}>hh</TableCell>
            <TableCell colSpan={2}>hh</TableCell>
          </TableRow>
        </Table> */}

        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </DataTableContainer>
  );
};

TableField.propTypes = {
  title: PropTypes.string.isRequired,
  sampleColumns: PropTypes.array,
  data: PropTypes.array.isRequired,
  columnsHide: PropTypes.arrayOf(PropTypes.string),
  checkBox: PropTypes.bool,
  selectableRows: PropTypes.oneOf(["multiple", "single", "none"]),
  showPrint: PropTypes.bool,
  showDownload: PropTypes.bool,
  showSearch: PropTypes.bool,
  pagination: PropTypes.bool,
  showFilter: PropTypes.bool,
  filterType: PropTypes.string,
  elevation: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  fixedHeader: PropTypes.bool,
  fixedSelectColumn: PropTypes.bool,
  tableBodyHeight: PropTypes.string,
  tableBodyMaxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  caseSensitive: PropTypes.bool,
  onRowsDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rowHover: PropTypes.bool,
  addSort: PropTypes.bool,
  allColumnsSort: PropTypes.bool,
  columnsToSort: PropTypes.arrayOf(PropTypes.string),
  showEditDelBtn: PropTypes.string,
  editRowCallBack: PropTypes.func,
  deleteRowCallBack: PropTypes.func,
  viewColumns: PropTypes.bool,
};

TableField.defaultProps = {
  sampleColumns: [],
  data: [],
  columnsHide: [],
  checkBox: false,
  selectableRows: "none",
  showPrint: false,
  showDownload: false,
  showSearch: true,
  pagination: false,
  showFilter: true,
  filterType: "dropdown",
  elevation: 4,
  rowsPerPage: 5,
  rowsPerPageOptions: [],
  fixedHeader: true,
  fixedSelectColumn: true,
  tableBodyHeight: "",
  tableBodyMaxHeight: "450px",
  caseSensitive: false,
  onRowsDelete: false,
  rowHover: true,
  addSort: true,
  allColumnsSort: false,
  columnsToSort: [],
  showEditDelBtn: "",
  editRowCallBack: () => {},
  deleteRowCallBack: () => {},
  viewColumns: false,
};

export default TableField;
