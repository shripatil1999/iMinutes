import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import React from "react";
import SimpleInputField from "../MainReUsables/SimpleInputField";
import ButtonField from "../MainReUsables/ButtonField";
import BootstrapTooltip from "../MainReUsables/BootstrapTooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const AddTask = ({ rowData, columns, columns2, childData }) => {
  const [state, setState] = useState({
    filteredArray: childData.filter((item) => item.Id === rowData[0]),
    first: "",
    second: "",
    third: "",
    btnText: "Save",
    labelHeader: "Add SubTask",
    row: 0,
  });

  const colSpan = columns2.length + 1; // to ensure the expandable row has correct colspan

  const handleInputChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const editRowCallBack = (childRowData) => {
    setState({
      ...state,
      first: childRowData.Name,
      second: childRowData.Title,
      third: childRowData.Location,
      row: childRowData.childId,
      btnText: "Update",
      labelHeader: "Update SubTask",
    });
  };

  const saveData = (rowData) => {
    const newObj = {
      childId: childData.length + 1,
      Id: rowData[0],
      Name: state.first,
      Title: state.second,
      Location: state.third,
      Age: "23",
      Salary: "$100,000",
    };

    childData.push(newObj);
    setState((prev) => ({
      ...prev,
      filteredArray: [...prev.filteredArray, newObj],
      first: "",
      second: "",
      third: "",
    }));
  };

  const updateData = (rowData) => {
    const updatedArray = state.filteredArray.map((obj) => {
      if (obj.childId === state.row) {
        return {
          ...obj,
          Name: state.first,
          Title: state.second,
          Location: state.third,
        };
      }
      return obj;
    });

    setState({
      ...state,
      filteredArray: updatedArray,
      first: "",
      second: "",
      third: "",
      row: 0,
      btnText: "Save",
      labelHeader: "Add SubTask",
    });
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <div className="flex mb-2">
            <label className="font-bold">{state.labelHeader}</label>
          </div>
          <div className="flex items-start mt-3 gap-2">
            <SimpleInputField
              name="first"
              label="Name"
              required={true}
              min={3}
              onChange={(e) => handleInputChange("first", e.target.value)}
              value={state.first}
              InputProps={{
                inputProps: {
                  maxLength: 20,
                },
              }}
            />
            <SimpleInputField
              name="second"
              label="Title"
              required={true}
              min={3}
              onChange={(e) => handleInputChange("second", e.target.value)}
              value={state.second}
              InputProps={{
                inputProps: {
                  maxLength: 20,
                },
              }}
            />
            <SimpleInputField
              name="third"
              label="Location"
              required={true}
              min={3}
              onChange={(e) => handleInputChange("third", e.target.value)}
              value={state.third}
              InputProps={{
                inputProps: {
                  maxLength: 20,
                },
              }}
            />
            <ButtonField
              label={state.btnText}
              onClick={() => {
                if (state.btnText === "Save") {
                  saveData(rowData);
                } else {
                  updateData(rowData);
                }
              }}
            />
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={colSpan}>
          <Table>
            <TableHead>
              <TableRow>
                {columns2.map((col, index) => {
                  if (col.name !== "Id" && col.name !== "childId") {
                    return (
                      <TableCell className="childTableHead" key={index}>
                        {col.name}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.filteredArray.map((childRow, index) => (
                <TableRow key={index}>
                  {Object.keys(childRow).map((key, cellIndex) => {
                    if (key !== "Id" && key !== "childId") {
                      return (
                        <TableCell key={cellIndex}>{childRow[key]}</TableCell>
                      );
                    }
                  })}
                  <TableCell>
                    <div className="flex justify-center cursor-pointer">
                      <BootstrapTooltip title="Edit">
                        <CheckCircleIcon
                          className="text-blue-500"
                          onClick={() => editRowCallBack(childRow)}
                        />
                      </BootstrapTooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AddTask;
