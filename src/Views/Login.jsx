import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField from "../MainReUsables/InputField";
import { emailRegExp, emailErrMsg, pawdRegExp, pawdErrMsg } from "../utils";
import { fetchDataAxios, postDataAxios } from "../Utilities/httpApi";
import ButtonField from "../MainReUsables/ButtonField";
import { useNavigate } from "react-router-dom";
import pumpLogo from "/images/pump_logo_hd2.png";
import iMinutesLogo from "/images/iMinutes_logo_removebg.png";
import { alertField } from "../MainReUsables/AlertField";

const schema = yup.object({
  username: yup
    .string()
    // .min(3, "Username must be at least 3 characters")
    // .max(20, "Username must not exceed 20 characters")
    .matches(emailRegExp, emailErrMsg)
    .required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    // .max(20, "Password must not exceed 20 characters")
    // .matches(pawdRegExp, pawdErrMsg)
    .required(),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    postApiData(data);
    // navigate("/home");
  };

  const getApiData = async () => {
    setModalOpen(true);

    try {
      let endpoint = "ErrorSimulate"; // Replace with your actual API endpoint
      let fetchedData = await fetchDataAxios(endpoint);
      // alert(JSON.stringify(fetchedData));
      // console.log('fetchedData - getApiData', fetchedData);
    } catch (error) {
      alert(error.message); // Access error message using error.message
      // console.error('Error fetching example data:', error);
    }
  };

  const postApiData = async (data) => {
    let endpoint = "ValidateLogin";
    let postData = {
      EmpLogin: data.username,
      Password: data.password,
      // EmpLogin: "sadmin@pumpacademy.in",
      // Password: "minutes",
    };
    try {
      let fetchedData = await postDataAxios(endpoint, postData);
      // console.log("fetched ", fetchedData);
      // Store fetchedData in sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(fetchedData));
      // const employeeValid = await isEmployeeIdPresent(fetchedData);
      if (fetchedData[0].Employee_Id > 0) {
        navigate("/home");
      }
      // let obj = fetchedData[0]
      // alert(JSON.stringify(fetchedData));
      // console.log('fetchedData - getApiData' ,fetchedData);
    } catch (error) {
      alertField(error, "error");
      // alert(error.Error);
      console.log("Error fetching example data:", error);
    }
  };

  return (
    <div className="px-3  flex flex-col h-full   sm:px-6 lg:px-8 loginGradient">
      <div className="flex justify-between mt-3">
        <img
          className="w-[30%] md:w-[25%] lg:w-[20%] h-15 self-start"
          src={pumpLogo}
          alt="logo"
        />
        <img
          className="w-[30%] md:w-[25%] lg:w-[20%] h-15 self-start"
          src={iMinutesLogo}
          alt="logo"
        />
      </div>
      <div className="flex flex-col justify-center h-full mb-[14%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <InputField
                errors={errors}
                control={control}
                name="username"
                label="Username"
                {...register("username")}
                error={!!errors.username}
                required={true}
                pattern={emailRegExp}
                patternErrMsg={emailErrMsg}
                InputProps={{
                  inputProps: {
                    maxLength: 30,
                  },
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
                // pattern={pawdRegExp}
                // patternErrMsg={pawdErrMsg}
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

              <ButtonField
                label="Sign in" // This prop is used to set the label of the button.
                width="full" //take values full, or any percentage values
                // position="center" //take values start, center, end
                type="submit" //can add props onClick, position, width
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
