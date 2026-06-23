import React from "react";
import SelectField from "../MainReUsables/SelectField";
import ButtonField from "../MainReUsables/ButtonField";
import InputField from "../MainReUsables/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { codeList } from "../utils";
import { useState } from "react";
import { postDataAxios } from "../Utilities/httpApi";
import { alertField } from "../MainReUsables/AlertField";

const schema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .test("is-valid-code", "Invalid code selected", function (value) {
      // Find the selected code from the codeList
      const selectedCode = codeList.find((code) => code.label === value);
      // Ensure the selected code is not the one with id = 0
      return selectedCode && selectedCode.id !== 0;
    }),
  addCode: yup
    .string()
    // .min(3, "Username must be at least 3 characters")
    // .max(20, "Username must not exceed 20 characters")
    .required(),
});

const ManageCodes = () => {
  const [selectedCode, setSelectedCode] = useState("Add Select Code");
  const [departList, setDepartList] = useState([]);
  const [desigList, setDesigList] = useState([]);
  const [reloadDept, setReloadDept] = useState(0);
  const [reloadDesig, setReloadDesig] = useState(0);
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
    setValue("code", codeList[0].label); // Set default country value
    setValue("codeId", codeList[0].id); // Set default country ID value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDepartList = async () => {
      let postData = {
        FromApi: "CodeList",
        Code: "Department",
      };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        // console.log("fetched ", fetchedData);
        setDepartList(fetchedData);
      } catch (error) {
        // alertField(error, "error");
        console.log("Error fetching department data:", error);
      }
    };
    fetchDepartList();
  }, [reloadDept]);

  useEffect(() => {
    const fetchDesigList = async () => {
      let postData = {
        FromApi: "CodeList",
        Code: "Designation",
      };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        setDesigList(fetchedData);
      } catch (error) {
        // alertField(error, "error");
        console.log("Error fetching designation data:", error);
      }
    };
    fetchDesigList();
  }, [reloadDesig]);

  const onSubmit = (data) => {
    // console.log(data);
    const fetchAllList = async () => {
      let postData = {
        FromApi: "CodeCreate",
        Code: data.code,
        CodeToAdd: data.addCode,
      };
      try {
        let fetchedData = await postDataAxios("generic", postData);
        data.code === "Department"
          ? setReloadDept(reloadDept + 1)
          : setReloadDesig(reloadDesig + 1);
        setValue("code", codeList[0].label); // Set default country value
        setValue("codeId", codeList[0].id); // Set default country ID value
        setValue("addCode", "");
      } catch (error) {
        alertField(error, "error");
        console.log("Error Adding data:", error);
      }
    };
    fetchAllList();
  };

  return (
    <div className="mx-3">
      <div className="flex justify-start  font-bold text-2xl mt-3 mb-2">
        Add Codes
      </div>
      <div className="flex items-center mt-4">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row flex-wrap gap-3 w-full"
        >
          <div className="flex w-full mb-6 md:mb-0 md:w-1/3 xl:w-1/4 h-14">
            <SelectField
              register={register} // Pass the register function as a prop
              errors={errors}
              control={control}
              name="code"
              label="Select Code"
              {...register("code")}
              error={!!errors.code}
              required={true}
              watch={watch} // Pass the watch function as a prop
              dropDown={codeList} // Pass the countryList array as a prop
              // Callback function to update the hidden input field with selected code's ID
              onSelect={(selectedCountryId, selectedCountry) => {
                setValue("codeId", selectedCountryId);
                setValue("code", selectedCountry);
                if (selectedCountryId === 0) {
                  setSelectedCode("Add Select Code");
                } else if (selectedCountryId === 1) {
                  setSelectedCode("Add Department");
                } else if (selectedCountryId === 2) {
                  setSelectedCode("Add Designation");
                }
              }}
            />
          </div>
          <div className="flex  w-full mb-5 md:mb-0 md:w-1/3 xl:w-1/4 h-14">
            <InputField
              errors={errors}
              control={control}
              name="addCode"
              label={selectedCode}
              {...register("addCode")}
              error={!!errors.addCode}
              required={true}
              InputProps={{
                inputProps: {
                  maxLength: 30, //used to validate maximum length inside InputProps props
                },
              }}
            />
          </div>
          <div className="flex   ">
            <ButtonField
              // id="submit" //This prop is used to set the id of the button text
              label="Confirm" // This prop is used to set the label of the button.
              width="33" //take values full, or any percentage values
              position="start" //take values start, center, end
              type="submit" //can add props onClick, position, width
              // btnColor="secondary" //(secondary, default, success, warning, error, info
              // btnRef={btnRef} //This prop is used to set the button ref (as UseRef) to set the focus. Not a required prop.
            />
          </div>
        </form>
      </div>
      <div className="mt-10 w-full">
        <div className="flex flex-wrap  gap-2 mb-3">
          <div className="w-full md:w-[49.5%]  border border-gray-400 min-h-32">
            <div className="mx-3 my-3">
              <div
                className="flex justify-start items-center font-bold  pb-2"
                style={{ borderBottom: "1px solid gray" }}
              >
                Departments
              </div>
              <ul className="list-disc ml-5">
                {departList.length > 0 ? (
                  departList.map((item) => (
                    <li key={item.Department_Id} className="my-1">
                      {item.Department}
                    </li>
                  ))
                ) : (
                  <div className="my-1">No Data</div>
                )}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-[49.5%]  border border-gray-400 min-h-32">
            <div className="mx-3 my-3">
              <div
                className="flex justify-start items-center font-bold  pb-2"
                style={{ borderBottom: "1px solid gray" }}
              >
                Designation
              </div>
              <ul className="list-disc ml-5">
                {desigList.length > 0 ? (
                  desigList.map((item) => (
                    <li key={item.Designation_Id} className="my-1">
                      {item.Designation}
                    </li>
                  ))
                ) : (
                  <div className="my-1">No Data</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCodes;
