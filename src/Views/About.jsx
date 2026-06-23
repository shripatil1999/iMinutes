import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField from "../MainReUsables/InputField";
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
  stateList,
} from "../utils";
import ButtonField from "../MainReUsables/ButtonField";
import SelectField from "../MainReUsables/SelectField";
import DateInputField from "../MainReUsables/DateInputField";
import CheckboxFields from "../MainReUsables/CheckboxFields";
import MultiSelectField from "../MainReUsables/MultiSelectField";

const schema = yup.object().shape({
  country: yup
    .string()
    .required("Country is required")
    .oneOf(
      countryList.map((item) => item.country),
      "Invalid country selected"
    ),
});

export default function Register() {
  const [states, setStates] = useState([]);
  const [multiCountry, setMultiCountry] = useState([]);
  // console.log("multiCountry--", multiCountry);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch, // This is the watch function
    setValue, // Add setValue function from react-hook-form
  } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("country", countryList[0].label); // Set default country value
    setValue("countryId", countryList[0].id); // Set default country ID value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (states.length > 0) {
      setValue("state", states[0].label); // Set default country value
      setValue("stateId", states[0].id); // Set default country ID value
    }
  }, [states]);

  const handleChangeCountry = (selectedCountryId) => {
    let state = stateList.filter((item) => item.cID == selectedCountryId);
    // console.log("state--", state);
    setStates(state);
  };

  const onSubmit = (data) => {
    console.log(data);
    const ids = multiCountry.map((item) => item.id);
    const labels = multiCountry.map((item) => item.label);
    console.log(ids); // Output: [1, 2, 3]
    console.log(labels); // Output: [1, 2, 3]
  };

  return (
    <div className="px-3 bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 schreenHeightCalc">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
            <MultiSelectField
              name="country2" //This prop is used to set the name of the multidselect input
              label="Country2" //This prop is used to set the label of the input
              placeholder="Select countries" //
              required={true}
              callBack={setMultiCountry}
              optionsList={countryList}
            />
            <SelectField
              register={register} // Pass the register function as a prop
              errors={errors}
              control={control}
              name="country"
              label="Country"
              {...register("country")}
              error={!!errors.country}
              required={true}
              watch={watch} // Pass the watch function as a prop
              dropDown={countryList}
              // Callback function to update the hidden input field with selected country's ID
              onSelect={(selectedCountryId, selectedCountry) => {
                setValue("country", selectedCountry);
                setValue("countryId", selectedCountryId);
                // console.log("selectedCountry", selectedCountry);
                // console.log("selectedCountryId1", selectedCountryId);
                handleChangeCountry(selectedCountryId);
              }}
            />

            <SelectField
              register={register}
              errors={errors}
              control={control}
              name="state"
              label="State"
              error={!!errors.state}
              required={true}
              watch={watch}
              dropDown={states}
              onSelect={(selectedStateId, selectedState) => {
                setValue("state", selectedState);
                setValue("stateId", selectedStateId);
                // console.log("selectedStateId1", selectedStateId);
              }}
            />

            <ButtonField
              label="Sign in"
              width="full" //take values full, or any percentage values
              // position="center" //take values start, center, end
              type="submit" //can add props onClick, position, width
            />
          </form>
        </div>
      </div>
    </div>
  );
}
