import React from "react";
import "./HtmlTableField.css";
import PropTypes from "prop-types"; // Import PropTypes
import Logo from "/assets/Logo.svg";

const HtmlTableField = ({ title, data, grouping }) => {
  // Extract column headings from the first data entry
  const columnHeadings = Object.keys(data[0]);
  // Styles for the table
  const tableStyle = {
    minWidth: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
  };

  // Styles for table headings
  const thStyle = {
    padding: "0.75rem",
    textAlign: "left",
    fontWeight: "700",
    color: "#4A5568",
    borderBottom: "1px solid black",
    fontSize: "12px",
    BorderTop: "1px solid black",
    borderRight: "1px solid black",
  };

  const thGroupStyle = {
    borderTop: "1px solid black",
    textAlign: "center !important",
  };

  // Styles for table cells
  const tdStyle = {
    padding: "0.75rem",
    fontSize: "0.875rem",
    color: "#4A5568",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  };

  return (
    <div
      id="printArea"
      className="overflow-x-auto"
      style={{ display: "block" }}
    >
      {/* <div className="flex items-center">
        <img src={Logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
      </div> */}
      <table id="styledTable" style={tableStyle}>
        <thead>
          <tr>
            <th
              colSpan={columnHeadings.length}
              style={{ padding: "0.75rem", borderRight: "1px solid black" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ width: "36px", height: "36px", float: "left" }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {title}
                </div>
              </div>
            </th>
          </tr>
          {grouping && (
            <tr>
              {grouping.map((group, index) => (
                <th
                  key={index}
                  style={{ ...thStyle, ...thGroupStyle }}
                  // style={thStyle || thGroupStyle}
                  colSpan={group.colspan}
                >
                  {group.header}
                </th>
              ))}
            </tr>
          )}
          <tr style={{ borderTop: "1px solid black" }}>
            {columnHeadings.map((heading, index) => (
              <th key={index} scope="col" style={thStyle}>
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr className="bg-white odd:bg-gray-100" key={rowIndex}>
              {columnHeadings.map((heading, index) => (
                <td key={index} style={tdStyle}>
                  {row[heading]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define PropTypes
HtmlTableField.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Adjust this according to your data types
    )
  ).isRequired,
  grouping: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Adjust this according to your data types
    )
  ),
};

// Define default values
HtmlTableField.defaultProps = {
  title: "Default Title",
  data: [],
  grouping: [],
};

export default HtmlTableField;
