import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import PropTypes from "prop-types";
import ErrorMessage from "./ErrorMessage";
import { Controller } from "react-hook-form";

//this function is useed to convert string of date to date format
function parseDateFromString(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${month}/${day}/${year}`);
}

const DateInputField = forwardRef(
  (
    {
      setValue,
      errors,
      control,
      name,
      label,
      error,
      required,
      pattern,
      patternErrMsg,
      dateFormat,
      timeInputLabel,
      showTimeInput,
      selected,
      minDate,
      maxDate,
      openToDate,
      LabelText,
      placeholderText,
      showMonYear,
      closeOnScroll,
      startDate,
      endDate,
      selectsStart,
      selectsEnd,
      disabled,
      shouldCloseOnSelect,
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState(
      selected ? parseDateFromString(selected) : new Date()
    );

    useEffect(() => {
      if (setValue) {
        if (selected) {
          // setSelectedDate(parseDateFromString(selected));
          setValue(name, parseDateFromString(selected));
        } else {
          setValue(name, new Date());
        }
      }
    }, []);

    const [errMsg, setErrMsg] = useState(errors[name]?.message || "");

    openToDate = openToDate ? parseDateFromString(openToDate) : openToDate;
    minDate = minDate ? parseDateFromString(minDate) : minDate;
    maxDate = maxDate ? parseDateFromString(maxDate) : maxDate;
    startDate = startDate ? parseDateFromString(startDate) : startDate;
    endDate = endDate ? parseDateFromString(endDate) : endDate;
    shouldCloseOnSelect = showTimeInput ? false : shouldCloseOnSelect;

    // useImperativeHandle(ref, () => ({
    //   // Expose a method to set the selected date from parent Components/MainReUseFields
    //   setSelectedDateFromParent: (date) => {
    //     setSelectedDate(date);
    //   },
    // }));
    const range = (start, end, step) => {
      const len = Math.floor((end - start) / step) + 1;
      return Array(len)
        .fill()
        .map((_, idx) => start + idx * step);
    };

    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const onBlurFun = (e) => {
      setTimeout(function () {
        let text = e.target.value.trim();
        console.log("text--", text);
        if (!required && text == "") {
          delete errors[name]; // Clear the error if text is within min and max
          setErrMsg([]);
        } else if (required && text == "") {
          errors[name] = {
            message: `${label} is required`,
          };
          setErrMsg(errors[name]);
        } else if (pattern && !pattern.test(text)) {
          errors[name] = {
            message: patternErrMsg,
          };
          setErrMsg(errors[name]);
        } else {
          delete errors[name]; // Clear the error if text is within min and max
          setErrMsg([]);
        }
      }, 100);
    };

    // console.log("selectedDate--", selectedDate);
    return (
      <div className="w-full my-2 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {LabelText}
        </label>
        <div className="relative">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                sx={{ height: "52px" }}
                className="w-full datepicker red-border border-1 border-gray-700 pl-2 py-2 cursor-pointer border-b-gray-700"
                label={label}
                onBlur={onBlurFun}
                error={error}
                dateFormat={dateFormat} //"MM/dd/yyyy h:mm aa"
                timeInputLabel={timeInputLabel}
                showTimeInput={showTimeInput}
                selected={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                openToDate={openToDate}
                onChange={(date) => {
                  // console.log("date--", date);
                  setSelectedDate(date);
                  field.onChange(date);
                }}
                // onChange={(date) => {
                //   setSelectedDate(date);
                // }}
                LabelText={LabelText}
                placeholderText={placeholderText}
                closeOnScroll={closeOnScroll}
                startDate={startDate}
                endDate={endDate}
                selectsStart={selectsStart}
                selectsEnd={selectsEnd}
                disabled={disabled}
                shouldCloseOnSelect={shouldCloseOnSelect}
                ref={ref} // Forwarding the ref
                //showWeekNumbers//Display Week Numbers
                //filterDate={isWeekday}//filter week days
                //showMonthDropdown//Month dropdown
                // useShortMonthInDropdown//Month dropdown short month
                //fixedHeight//Fixed height of Calendar
                //   includeDateIntervals={[  //Include date intervals
                //   { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
                // ]}
                // calendarClassName="rasta-stripes"
                // showTimeSelect//for Time field
                // timeClassName={handleColor}//for Time field

                // Conditionally include renderCustomHeader based on disabled prop
                {...(showMonYear
                  ? {
                      renderCustomHeader: ({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div
                          className="m-2.5 flex justify-center text-sm"
                          // style={{
                          //   margin: 10,
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   fontSize: "14px",
                          // }}
                        >
                          <button
                            className="cursor-pointer border-solid border-2 border-slate-400 py-1 px-2"
                            // style={{
                            //   cursor: "pointer",
                            //   border: "1px solid black",
                            // }}
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                          >
                            {"<"}
                          </button>
                          <select
                            className="cursor-pointer border-solid border-2 border-slate-400 p-1"
                            value={getYear(date)}
                            onChange={({ target: { value } }) =>
                              changeYear(value)
                            }
                          >
                            {years.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <select
                            className="cursor-pointer border-solid border-2 border-slate-400 p-1"
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <button
                            className="cursor-pointer border-solid border-2 border-slate-400 py-1 px-2"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                          >
                            {">"}
                          </button>
                        </div>
                      ),
                    }
                  : {})}
              />
            )}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          </div>
        </div>
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
      </div>
    );
  }
);

DateInputField.propTypes = {
  setValue: PropTypes.func,
  dateFormat: PropTypes.string,
  timeInputLabel: PropTypes.string,
  showTimeInput: PropTypes.bool,
  selected: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  openToDate: PropTypes.string,
  LabelText: PropTypes.string,
  placeholderText: PropTypes.string,
  closeOnScroll: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  disabled: PropTypes.bool,
  shouldCloseOnSelect: PropTypes.bool,
  showMonYear: PropTypes.bool,
};

DateInputField.defaultProps = {
  setValue: undefined,
  dateFormat: "dd/MM/yyyy",
  timeInputLabel: "Time:",
  showTimeInput: false,
  selected: undefined,
  minDate: undefined,
  maxDate: undefined,
  openToDate: undefined,
  LabelText: "Select Date",
  placeholderText: "Select a date",
  closeOnScroll: true,
  startDate: undefined,
  endDate: undefined,
  selectsStart: false,
  selectsEnd: false,
  disabled: false,
  shouldCloseOnSelect: true,
  showMonYear: false,
};

export default DateInputField;
