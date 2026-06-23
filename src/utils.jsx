export const addErrorIntoField = (errors) =>
  errors ? { error: true } : { error: false };

export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneRegExp = /^[2-9][0-9]*$/;
//   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const pawdRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const minMax18_50 = /^(1[8-9]|[2-4][0-9]|50)$/;

export const _2DecimalsRegExp = /^(0\.\d{1,2}|[1-9]\d*(\.\d{1,2})?)$/;

export const dateRegExp =
  /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/; //For string date validation

export const dateRegExp2 =
  /^(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (?:0[1-9]|[12][0-9]|3[01]) \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(India Standard Time\)$/m; //For date object validation. can use for date with time also

export const dateTimeRegExp =
  /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4}) (0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/; //For string date validation

//Pattern Error Messages
export const emailErrMsg =
  "Email is not valid. Please enter a valid email address";

export const pawdErrMsg =
  "Password must contain at least one number, one uppercase letter, one special character";

export const phoneErrMsg =
  "Phone number is not valid. Cannot start with 0 or 1";

export const minMax18_50ErrMsg = "Age must be an integer and between 18 to 50";

export const _2DecimalsErrMsg =
  "Price must be a valid number and can have at most two decimal places";

export const dateErrMsg = "Date must be in the format DD/MM/YYYY";

//dropdown arrays
export const codeList = [
  {
    id: 0,
    label: "Select Code",
  },
  {
    id: 1,
    label: "Department",
  },
  {
    id: 2,
    label: "Designation",
  },
];

// export const countryList = [
//   {
//     id: 0,
//     label: "Select",
//   },
//   {
//     id: 1,
//     label: "USA",
//   },
//   {
//     id: 2,
//     label: "Canada",
//   },

//   {
//     id: 3,
//     label: "Algeria",
//   },
// ];

export const stateList = [
  { cID: 1, id: 1, label: "California" },

  { cID: 1, id: 2, label: "New York" },

  { cID: 1, id: 3, label: "Texas" },

  { cID: 2, id: 4, label: "California2" },

  { cID: 2, id: 5, label: "New York2" },

  { cID: 2, id: 6, label: "Texas2" },

  { cID: 3, id: 7, label: "California3" },

  { cID: 3, id: 8, label: "New York3" },

  { cID: 3, id: 9, label: "Texas3" },
];

export const countryList = [
  {
    id: 1,
    label: "Select Country",
  },
  {
    id: 2,
    label: "Albania",
  },
  {
    id: 3,
    label: "Algeria",
  },
  {
    id: 4,
    label: "American Samoa",
  },
  {
    id: 5,
    label: "Andorra",
  },
  {
    id: 6,
    label: "Angola",
  },
  {
    id: 7,
    label: "Anguilla",
  },
];
