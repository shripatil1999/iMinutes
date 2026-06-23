import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField from "../MainReUsables/InputField";
import ButtonField from "../MainReUsables/ButtonField";
import SelectField from "../MainReUsables/SelectField";
import DateInputField from "../MainReUsables/DateInputField";
import CheckboxFields from "../MainReUsables/CheckboxFields";
import RadioBtnField from "../MainReUsables/RadioBtnField";
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
} from "../utils";
import TextAreaField from "../MainReUsables/TextAreaField";
import MultiSelectField from "../MainReUsables/MultiSelectField";
import ComboBoxField from "../MainReUsables/ComboBoxField";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    // .max(20, "Username must not exceed 20 characters")
    .required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(pawdRegExp, pawdErrMsg)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Confirm Password must match the password"
    ),
  mobile: yup
    .string()
    .required("Mobile Phone is required")
    .matches(phoneRegExp, phoneErrMsg)
    .length(10, "Phone number must be exactly 10 characters"),
  age: yup
    .number()
    .required("Age is required")
    // .typeError("Age is required")
    .typeError("Age must be a number")
    .integer("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(50, "Age must be at most 50")
    .nullable(),
  price: yup
    .string()
    .required("Price is required")
    .matches(_2DecimalsRegExp, _2DecimalsErrMsg)
    .nullable(),
  country: yup.string().required("Country is required"),
  date: yup
    .string()
    .matches(dateRegExp2, dateErrMsg)
    .required("Date is required"),
  gender: yup.string().required("Gender is required"),
  privacy: yup.boolean().oneOf([true, false], "You must agree to the terms"), // Remove false in case user must select privacy
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState(undefined);
  const [multiCountry, setMultiCountry] = useState([]);
  const [input, setInput] = useState("");

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
    setValue("country", countryList[0].country); // Set default country value
    setValue("countryId", countryList[0].id); // Set default country ID value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // const selectedCountryId = watch("countryId");
    console.log("textarea:", text);
    const ids = multiCountry.map((item) => item.id);
    const labels = multiCountry.map((item) => item.label);
    console.log(ids); // Output: [1, 2, 3]
    console.log(labels); // Output: [1, 2, 3]
    console.log("input:", input);
  };

  const RadioBtns = ["Male", "Female", "Other"];

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
            <InputField
              errors={errors}
              control={control}
              name="username"
              label="Username"
              {...register("username")}
              error={!!errors.username}
              required={true}
              min={3} //This prop is used to validate minimum length
              // disabled={true}// This prop is used to disable input field
              // helperText="Username must be at least 3 characters" //This prop is used to display helper text
              defaultValue="nivin" //This prop is used to set default value
              // reset={reset} //This prop is used to reset input field using state as reset
              InputProps={{
                inputProps: {
                  maxLength: 20, //used to validate maximum length inside InputProps props
                },
              }}
            />

            <InputField
              errors={errors}
              control={control}
              name="mobile"
              label="Mobile Phone"
              {...register("mobile")}
              error={!!errors.mobile}
              required={true}
              length={10} //to validate exactly 10 character
              pattern={phoneRegExp} // This prop is used to validate pattern
              patternErrMsg={phoneErrMsg} // This prop is used to display pattern error message
              InputProps={{
                inputProps: {
                  maxLength: 10,
                },
              }}
            />
            <InputField
              errors={errors}
              control={control}
              name="age"
              label="Age"
              {...register("age")}
              error={!!errors.age}
              required={true}
              minVal={18} //to validate minimum number
              maxVal={50} //to validate maximum number
              pattern={minMax18_50}
              patternErrMsg={minMax18_50ErrMsg}
              InputProps={{
                inputProps: {
                  maxLength: 2,
                },
              }}
            />
            <InputField
              errors={errors}
              control={control}
              name="price"
              label="price"
              {...register("price")}
              error={!!errors.age}
              required={true}
              pattern={_2DecimalsRegExp}
              patternErrMsg={_2DecimalsErrMsg}
            />
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
              dropDown={countryList} // Pass the countryList array as a prop
              // Callback function to update the hidden input field with selected country's ID
              onSelect={(selectedId, selectedValue) => {
                setValue("countryId", selectedId);
                setValue("country", selectedValue);
              }}
            />
            <InputField
              errors={errors}
              control={control}
              name="password"
              label="Password"
              {...register("password")}
              error={!!errors.password}
              required={true}
              min={8}
              pattern={pawdRegExp}
              patternErrMsg={pawdErrMsg}
              type={showPassword ? "text" : "password"}
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
            <InputField
              errors={errors}
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              watch={watch} // Pass the watch function as a prop
              {...register("confirmPassword")}
              error={!!errors.password}
              required={true}
              match={true} //to check match value pass this prop
              InputProps={{
                inputProps: {
                  maxLength: 20,
                },
              }}
            />

            <DateInputField
              setValue={setValue} // Add setValue function from react-hook-form
              errors={errors}
              control={control}
              name="date"
              label="Date"
              {...register("date")}
              error={!!errors.date}
              required={true}
              pattern={dateRegExp}
              patternErrMsg={dateErrMsg}
              // dateFormat="dd/MM/yyyy h:mm aa" //This prop defalt takes "dd/MM/yyyy", if u want change date format. Not a required prop.   //"MM/dd/yyyy h:mm aa"
              // timeInputLabel="Time:" // This prop is used to show the time label. Not a required prop.
              // showTimeInput={true} // This prop is used to show the time input, default its false. to work on the time u need to change dateFormat to "MM/dd/yyyy h:mm aa". Not a required prop.
              selected="02/04/2024" // This prop is used to show the first date, default it wll take the today's date. Not a required prop.
              // minDate="02/04/2024" //This prop is used to select minimum date range, below this dates are disabled. Not a required prop.
              // maxDate="29/04/2024" //This prop is used to select maximum date range, above this dates are disabled. Not a required prop.
              // openToDate="02/02/2024" // This prop is used to open the calendar with the given date. Not a required prop.
              LabelText="Select Date" // This prop is used to pass he Label value. Not a required prop.
              placeholderText="Select a date" // This prop is used to pass he placeholder value. Not a required prop.
              // showMonYear={true} // This prop is used to show the month and year extra options, default its false. Not a required prop.
              // closeOnScroll={true} // This prop is used to close the calendar when scrolling. Not a required prop.
              // startDate="02/04/2024" // you can use selectsStart prop with this prop. This prop is used to highlight till the start date for a Range of 2 dates fields. this is first date value. Not a required prop.
              // endDate="20/04/2024" // you can use selectsEnd prop with this prop. This prop is used to highlight  till the end date for a Range of 2 dates fields. this is second date value. Not a required prop.
              // selectsStart={true} // This prop is used to highlight on mouseover, when change another start date for a Range of 2 dates fields. this is for the first date field. Not a required prop.
              // selectsEnd={true} // This prop is used to highlight on mouseover, when change another end date for a Range of 2 dates fields. this is for the second date field. Not a required prop.
              // disabled={false} // This prop is used to disable the date full selection field. Not a required prop.
              // shouldCloseOnSelect={true} // This prop is used to not close the calendar when date selected (false). if u click outside the calendar, calendar will be closed. Not a required prop.
            />

            <RadioBtnField
              {...register("gender")}
              name="gender"
              buttons={RadioBtns} // This prop is used to set the radio buttons, need to send as an array
              errors={errors}
              control={control}
              label="Gender" // This prop is used to set the label of the radio buttons.
              // reset={reset} // This prop is used to reset the radio buttons.
              // defaultValue={empType} // This prop is used to set the default value of the radio buttons.
            />

            <div className="mt-4">
              <TextAreaField
                required={true}
                minRows={1} //This prop is used to set the min rows in the textarea
                maxRows={1} //This prop is used to set the max rows in the textarea
                placeholder="Description" //This prop is used to set the placeholder in the textarea
                maxLength={500} //This prop is used to set the max length in the textarea
                callBack={setText} //This prop is used to pass the state update value function or callback function that will get the value from the textarea as a parameter
                defaultValue={text} //This prop is used to set the default value in the textarea
              />
            </div>

            <CheckboxFields
              setValue={setValue} // Add setValue function from react-hook-form
              errors={errors}
              control={control}
              name="privacy"
              label="Agree" // This prop is used to set the label of the checkbox. Must be a required prop.
              required={true} // This prop is used to set the checkbox as required. Not a required prop.
              errorMsg="You must agree to the terms"
              // checked={false} // This prop is used to set the checkbox as checked. Not a required prop.
              // disabled={false} // This prop is used to set the checkbox as disabled. Not a required prop.
              // size={29} // This prop is used to set the size of the checkbox. Not a required prop. must be a number
              // color="primary" //(secondary, default,success,warning,error, info, dark, light) This prop is used to set the color of the checkbox. Not a required prop.
            />

            <ComboBoxField
              label="New Country"
              options={countryList}
              onChange={(e) => setInput(e.target.textContent)}
              onSelect={(e) => setInput(e.target.value)}
            />

            <ButtonField
              // id="submit" //This prop is used to set the id of the button text
              label="Sign in" // This prop is used to set the label of the button.
              width="full" //take values full, or any percentage values
              // position="center" //take values start, center, end
              type="submit" //can add props onClick, position, width
              // btnColor="secondary" //(secondary, default, success, warning, error, info
              // btnRef={btnRef} //This prop is used to set the button ref (as UseRef) to set the focus. Not a required prop.
            />
          </form>
        </div>
      </div>
    </div>
  );
}
