import React from "react";
import ButtonField from "../MainReUsables/ButtonField";
import InputField from "../MainReUsables/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  pawdRegExp,
  phoneRegExp,
  minMax18_50,
  _2DecimalsRegExp,
  pawdErrMsg,
  phoneErrMsg,
  minMax18_50ErrMsg,
  _2DecimalsErrMsg,
  countryList,
  dateRegExp,
  dateRegExp2,
  dateTimeRegExp,
  dateErrMsg,
  emailRegExp,
  emailErrMsg,
} from "../utils";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SelectField from "../MainReUsables/SelectField";
import TextAreaField from "../MainReUsables/TextAreaField";
import CheckboxFields from "../MainReUsables/CheckboxFields";
import RadioBtnField from "../MainReUsables/RadioBtnField";
import { useEffect } from "react";
import { postDataAxios } from "../Utilities/httpApi";
import TableField from "../MainReUsables/TableField";
import { alertField } from "../MainReUsables/AlertField";

let sampleColumns = [
  {
    label: "Employee_Id",
    name: "Employee_Id",
    options: {
      sort: false,
      display: "excluded",
      filter: false,
    },
  },
  {
    label: "RefDepartment_Id",
    name: "RefDepartment_Id",
    options: {
      sort: false,
      display: "excluded",
      filter: false,
    },
  },
  {
    label: "Department",
    name: "Department",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "RefDesignation_Id",
    name: "RefDesignation_Id",
    options: {
      sort: false,
      display: "excluded",
      filter: false,
    },
  },
  {
    label: "Designation",
    name: "Designation",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "EmpCode",
    name: "EmpCode",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "EmpName",
    name: "EmpName",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "EmpLogin",
    name: "EmpLogin",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "Mobile No",
    name: "Mobile No",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "EmpType",
    name: "EmpType",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    label: "IsAdmin",
    name: "IsAdmin",
    options: {
      sort: false,
      display: true,
      filter: true,
    },
  },
  {
    name: "Action",
    label: "Action",
    options: {
      sort: false,
    },
  },
];

const ManageProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState("");
  const [departList, setDepartList] = useState([]);
  const [desigList, setDesigList] = useState([]);
  const [reloadEmpList, setReloadEmpList] = useState(0);
  const [empList, setEmpList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userNameDisabled, setUserNameDisabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [reset, setReset] = useState(false);
  const [reload, setReload] = useState(false);
  // State variable to trigger re-render of InputField
  const [inputFieldKey, setInputFieldKey] = useState(0);
  const [empType, setEmpType] = useState("");
  const [empId, setEmpId] = useState("");

  const schema = yup.object().shape({
    username: yup.string().min(3, "Employee ID must be at least 6 characters"),
    // .required(),
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      // .max(20, "Username must not exceed 20 characters")
      .required("Employee ID is required"),
    department: yup
      .string()
      .required("Department is required")
      .test("is-valid-code", "Invalid Department selected", function (value) {
        // Find the selected code from the codeList
        const selectedCode = departList.find((code) => code.label === value);
        // Ensure the selected code is not the one with id = 0
        return selectedCode && selectedCode.id !== 0;
      }),
    designation: yup
      .string()
      .required("Designation is required")
      .test("is-valid-code", "Invalid Designation selected", function (value) {
        // Find the selected code from the codeList
        const selectedCode = desigList.find((code) => code.label === value);
        // Ensure the selected code is not the one with id = 0
        return selectedCode && selectedCode.id !== 0;
      }),
    empCode: yup
      .string()
      // .min(3, "Name must be at least 3 characters")
      // .max(20, "Username must not exceed 20 characters")
      .required("Employee Code is required"),
    // email: yup
    //   .string()
    //   // .min(3, "Username must be at least 3 characters")
    //   // .max(20, "Username must not exceed 20 characters")
    //   .matches(emailRegExp, emailErrMsg)
    //   .required(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(pawdRegExp, pawdErrMsg)
      .required(),
    mobile: yup
      .string()
      .required("Mobile Phone is required")
      .matches(phoneRegExp, phoneErrMsg)
      .length(10, "Phone number must be exactly 10 characters"),

    empType: yup.string().required("Employee Type is required"),
    manager: yup.boolean().oneOf([true, false], "You must agree to the terms"), // Remove false in case user must select privacy
  });

  const handleEditEmp = (editdata) => {
    console.log(editdata);
    setEmpId(editdata[0]);
    setValue("username", editdata[7]); //editdata[7]
    setUserName(editdata[7]);
    setUserNameDisabled(true);

    setValue("department", editdata[2]);
    setValue("departmentId", editdata[1]);
    setValue("designation", editdata[4]);
    setValue("designationId", editdata[3]);

    setValue("empCode", editdata[5]);
    setValue("name", editdata[6]);
    setValue("mobile", editdata[8]);
    setValue("empType", editdata[9] ? editdata[9].toLowerCase() : "");
    setEmpType(editdata[9] ? editdata[9].toLowerCase() : "");

    setChecked(editdata[10] === "Y" ? true : false);
    setValue("manager", editdata[10] === "Y" ? true : false);
    setValue("password", "");

    setInputFieldKey((prevKey) => prevKey + 1); // Trigger re-render of InputField

    // setText("");
  };

  const handleDeleteEmp = (deldata) => {
    console.log(deldata);
    let id = deldata[0];
    let first2 = empList.filter((item) => item.Employee_Id !== id);
    setEmpList(first2);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch, // This is the watch function
    setValue, // Add setValue function from react-hook-form
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchDepartList = async () => {
      let postData = { FromApi: "CodeListDDL", Code: "Department" };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        // console.log("fetched ", fetchedData);
        setValue("department", fetchedData[0].label); // Set default country value
        setValue("departmentId", fetchedData[0].id); // Set default country ID value
        setDepartList(fetchedData);
      } catch (error) {
        // alertField(error, "error");
        console.log("Error fetching department data:", error);
      }
    };

    const fetchDesigList = async () => {
      let postData = { FromApi: "CodeListDDL", Code: "Designation" };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        setValue("designation", fetchedData[0].label); // Set default country value
        setValue("designationId", fetchedData[0].id); // Set default country ID value
        setDesigList(fetchedData);
      } catch (error) {
        // alertField(error, "error");
        console.log("Error fetching designation data:", error);
      }
    };
    fetchDepartList();
    fetchDesigList();
  }, []);

  useEffect(() => {
    const fetchEmpList = async () => {
      const userData = sessionStorage.getItem("userData"); // get user data from session storage
      const parsedData = JSON.parse(userData); // parse the user data
      const Company_Id = parsedData[0].Company_Id;

      let postData = { FromApi: "EmployeeList", RefCompany_Id: Company_Id };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        // console.log("fetched ", fetchedData);
        setEmpList(fetchedData);
      } catch (error) {
        // alertField(error, "error");
        console.log("Error fetching designation data:", error);
      }
    };
    fetchEmpList();
    setValue("username", "");
  }, [reloadEmpList]);

  const resetFields = () => {
    if (Object.keys(errors).length > 0) {
      // Clear form errors
      Object.keys(errors).forEach((field) => {
        setValue(field, undefined);
      });
    }
    if (departList.length > 0) {
      setValue("department", departList[0].label);
      setValue("departmentId", departList[0].id);
    } else {
      setValue("department", "");
      setValue("departmentId", "");
    }

    if (desigList.length > 0) {
      setValue("designation", desigList[0].label);
      setValue("designationId", desigList[0].id);
    } else {
      setValue("designation", "");
      setValue("designationId", "");
    }
    setChecked(false);
    setValue("username", "");
    setValue("manager", false);
    setValue("mobile", "");
    setEmpType("");

    setValue("empCode", "");
    setValue("name", null);
    setValue("password", "");
    setValue("empType", "");

    setText("");
    setUserNameDisabled(false);
    setUserName("");
    setEmpId("");

    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
    setInputFieldKey((prevKey) => prevKey + 1); // Trigger re-render of InputField

    // const removeErrors = document.getElementsByClassName("error-message");
    // while (removeErrors.length > 0) {
    //   removeErrors[0].remove();
    // }
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log("txt", text);

    const addEmpList = async () => {
      const userData = sessionStorage.getItem("userData"); // get user data from session storage
      const parsedData = JSON.parse(userData); // parse the user data
      const Company_Id = parsedData[0].Company_Id;

      let postData = {};
      if (empId === "") {
        postData = {
          FromApi: "EmployeeCreate",
          RefCompany_Id: Company_Id,
          RefDepartment_Id: data.departmentId,
          RefDesignation_Id: data.designationId,
          EmpCode: data.empCode,
          EmpName: data.name,
          EmpLogin: data.username,
          EmpMobileNo: data.mobile,
          EmpType: data.empType,
          IsAdmin: data.manager === true ? 1 : 0,
        };
      } else {
        postData = {
          FromApi: "EmployeeUpdate",
          RefCompany_Id: Company_Id,
          RefDepartment_Id: data.departmentId,
          RefDesignation_Id: data.designationId,
          EmpCode: data.empCode,
          EmpName: data.name,
          EmpLogin: data.username,
          EmpMobileNo: data.mobile,
          EmpType: data.empType,
          IsAdmin: data.manager === true ? 1 : 0,
          Employee_Id: empId,
        };
      }

      try {
        let fetchedData = await postDataAxios("generic", postData);
        setReloadEmpList(reloadEmpList + 1);
        console.log("fetched ", fetchedData);
        resetFields();
      } catch (error) {
        alertField(error, "error");
        console.log("Error fetching designation data:", error);
      }
    };
    addEmpList();
  };

  const RadioBtns = ["Corporate", "Company"];
  // useEffect(() => {
  //   console.log("Errors:", errors);
  // }, [errors]);

  return (
    <div className="mx-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h6 className="mt-4 text-center text-3xl  text-gray-900">
          Manage Profile
        </h6>
      </div>

      <div className="mt-8 mb-5 ">
        <div
          className="bg-white py-6 px-4  sm:rounded-lg sm:px-10"
          style={{ boxShadow: "0px 1px 20px 1px gray" }}
        >
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full">
              <div className="mx-3 ">
                <InputField
                  key={inputFieldKey} // Use key prop to force re-render
                  errors={errors}
                  control={control}
                  name="username"
                  label="Employee ID"
                  {...register("username")}
                  error={!!errors.userName}
                  required={true}
                  defaultValue={userName}
                  disabled={userNameDisabled}
                  pattern={emailRegExp}
                  patternErrMsg={emailErrMsg}
                  reset={reset}
                  reload={reload}
                  InputProps={{
                    inputProps: {
                      maxLength: 50,
                    },
                  }}
                />
              </div>
              <div className="mx-3  ">
                <SelectField
                  register={register} // Pass the register function as a prop
                  errors={errors}
                  control={control}
                  name="department"
                  label="Department"
                  {...register("department")}
                  error={!!errors.department}
                  required={true}
                  watch={watch} // Pass the watch function as a prop
                  dropDown={departList} // Pass the countryList array as a prop
                  // Callback function to update the hidden input field with selected country's ID
                  onSelect={(selectedId, selectedValue) => {
                    setValue("departmentId", selectedId);
                    setValue("department", selectedValue);
                  }}
                  reset={reset}
                />
              </div>
              <div className="mx-3  ">
                <SelectField
                  register={register} // Pass the register function as a prop
                  errors={errors}
                  control={control}
                  name="designation"
                  label="Designation"
                  {...register("designation")}
                  error={!!errors.designation}
                  required={true}
                  watch={watch} // Pass the watch function as a prop
                  dropDown={desigList} // Pass the countryList array as a prop
                  // Callback function to update the hidden input field with selected country's ID
                  onSelect={(selectedId, selectedValue) => {
                    setValue("designationId", selectedId);
                    setValue("designation", selectedValue);
                  }}
                  reset={reset}
                />
              </div>
              <div className="mx-3 ">
                <InputField
                  key={inputFieldKey} // Use key prop to force re-render
                  errors={errors}
                  control={control}
                  name="empCode"
                  label="Employee Code"
                  {...register("empCode")}
                  error={!!errors.empCode}
                  required={true}
                  defaultValue="EMP100"
                  reset={reset}
                  InputProps={{
                    inputProps: {
                      maxLength: 15,
                    },
                  }}
                />
              </div>

              <div className="mx-3 ">
                <InputField
                  key={inputFieldKey} // Use key prop to force re-render
                  errors={errors}
                  control={control}
                  name="name"
                  label="Employee Name"
                  {...register("name")}
                  error={!!errors.name}
                  required={true}
                  reset={reset}
                  InputProps={{
                    inputProps: {
                      maxLength: 50,
                    },
                  }}
                />
              </div>

              <div className="mx-3 ">
                <InputField
                  key={inputFieldKey} // Use key prop to force re-render
                  errors={errors}
                  control={control}
                  name="password"
                  label="Employee Password"
                  {...register("password")}
                  error={!!errors.password}
                  required={true}
                  min={8}
                  // pattern={pawdRegExp}
                  // patternErrMsg={pawdErrMsg}
                  type={showPassword ? "text" : "password"}
                  reset={reset}
                  InputProps={{
                    inputProps: {
                      maxLength: 20,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="mx-3 ">
                <InputField
                  key={inputFieldKey} // Use key prop to force re-render
                  errors={errors}
                  control={control}
                  name="mobile"
                  label="Employee Mobile Phone"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  required={true}
                  length={10} //to validate exactly 10 character
                  pattern={phoneRegExp} // This prop is used to validate pattern
                  patternErrMsg={phoneErrMsg} // This prop is used to display pattern error message
                  reset={reset}
                  InputProps={{
                    inputProps: {
                      maxLength: 10,
                    },
                  }}
                />
              </div>

              <div className="mx-3 ">
                <RadioBtnField
                  key={inputFieldKey} // Use key prop to force re-render
                  {...register("empType")}
                  name="empType"
                  buttons={RadioBtns} // This prop is used to set the radio buttons, need to send as an array
                  errors={errors}
                  control={control}
                  label="Employee Type" // This prop is used to set the label of the radio buttons.
                  reset={reset}
                  defaultValue={empType}
                />
              </div>

              <div className="mx-3 ">
                <CheckboxFields
                  setValue={setValue} // Add setValue function from react-hook-form
                  errors={errors}
                  control={control}
                  name="manager"
                  label="Is Manager" // This prop is used to set the label of the checkbox. Must be a required prop.
                  // required={true} // This prop is used to set the checkbox as required. Not a required prop.
                  // errorMsg="You must agree to the terms"
                  checked={checked} // This prop is used to set the checkbox as checked. Not a required prop.
                  setChecked={setChecked} // This prop is used to set the checkbox as checked. Not a required prop.
                  // disabled={false} // This prop is used to set the checkbox as disabled. Not a required prop.
                  // size={29} // This prop is used to set the size of the checkbox. Not a required prop. must be a number
                  // color="primary" //(secondary, default,success,warning,error, info, dark, light) This prop is used to set the color of the checkbox. Not a required prop.
                  reset={reset}
                />
              </div>

              {/* <div className="mx-3 ">
                <div className="mt-2 mb-3">
                  <div className=" mb-1 flex ">About</div>
                  <TextAreaField
                    // required={true}
                    minRows={1} //This prop is used to set the min rows in the textarea
                    maxRows={1} //This prop is used to set the max rows in the textarea
                    placeholder="" //This prop is used to set the placeholder in the textarea
                    maxLength={500} //This prop is used to set the max length in the textarea
                    callBack={setText} //This prop is used to pass the state update value function or callback function that will get the value from the textarea as a parameter
                    defaultValue={text} //This prop is used to set the default value in the textarea
                  />
                </div>
              </div> */}
            </div>

            <div className="flex justify-between mt-1 mx-3">
              <ButtonField
                label="Reset" // This prop is used to set the label of the button.
                // width="full" //take values full, or any percentage values
                position="start" //take values start, center, end
                type="button" //can add props onClick, position, width
                btnColor="error"
                onClick={resetFields}
              />
              <ButtonField
                label="Submit" // This prop is used to set the label of the button.
                // width="full" //take values full, or any percentage values
                position="end" //take values start, center, end
                type="submit" //can add props onClick, position, width
                btnColor="success"
              />
            </div>
          </form>
        </div>
      </div>
      <div className=" w-full mt-2 mb-6">
        <TableField
          title={"Employee List"}
          sampleColumns={sampleColumns}
          data={empList}
          columnsHide={["Employee_Id", "RefDepartment_Id", "RefDesignation_Id"]}
          // columnsToSort={["name", "age"]}
          allColumnsSort={false} //This prop is used to sort all columns
          // checkBox={true}  //This prop is used to add a checkbox in the table
          // selectableRows="single" //This prop is used to make the table selectable. Use "multiple", "single", or "none"
          showPrint={false} //This prop is used to show the print button
          showDownload={false} //This prop is used to show the download button
          showSearch={false} //This prop is used to show the search bar
          // pagination={true} //This prop is used to show the pagination
          showFilter={false} //This prop is used to show the filter button
          // filterType="dropdown" //This prop is used to show the filter options. Use 'checkbox', 'dropdown', 'multiselect', 'textField', 'custom'
          // elevation={0} //This prop is used to add/remove the shadow. Use 0, 1, 2, 3, 4
          // rowsPerPage={5} //This prop is used to set the number of rows per page
          // rowsPerPageOptions={[5, 10, 15, 20, 25, 30]} //This prop is used to set the options for the number of rows per page
          // fixedHeader={true} //This prop is used to make the table header fixed
          // fixedSelectColumn={true} //This prop is used to make the select column fixed
          // tableBodyHeight="calc(100vh - 220px)" //This prop is used to set the height of the table body
          // tableBodyMaxHeight="500px" //This prop is used to set the maximum height of the table body
          // caseSensitive={false} //This prop is used to make the search case sensitive
          // onRowsDelete={handleDelete} //This prop is used to handle the delete action
          // rowHover={false} //This prop is used to make the row hover
          // addSort={false} //This prop is used to have the sort
          showEditDelBtn="edit-delete" //This prop is used to show the edit and delete button. Use 'edit', 'delete', or 'edit-delete'
          editRowCallBack={handleEditEmp} //This prop is used to handle the edit action
          deleteRowCallBack={handleDeleteEmp} //This prop is used to handle the delete action
          viewColumns={false} //This prop is used to show the view columns button
        />
      </div>
    </div>
  );
};

export default ManageProfile;
