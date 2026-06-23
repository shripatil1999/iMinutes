import HtmlTableField from "../MainReUsables/HtmlTableField";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";
import facebook from "/assets/facebook.png";
import DownloadIcon from "@mui/icons-material/Download";
import { Tooltip } from "@mui/material";
import BootstrapTooltip from "../MainReUsables/BootstrapTooltip";

const data = [
  {
    id: 1,
    name: "Chikwa Eligson",
    age: 24,
    location: "Lagos",
    level: "stage-1",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 2,
    name: "Bamidele Johnson",
    age: 18,
    location: "Anambra",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 3,
    name: "John Lee",
    age: 20,
    location: "Abuja",
    level: "stage-2",
    mood: "indifferent",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 4,
    name: "Binta Pelumi",
    age: 22,
    location: "Jos",
    level: "stage-3",
    mood: "sad",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 5,
    name: "Cassidy Ferangamo",
    age: 30,
    location: "Lagos",
    level: "stage-4",
    mood: "angry",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 6,
    name: "Damian Swaggbag",
    age: 35,
    location: "PortHarcourt",
    level: "stage-1",
    mood: "bitter",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 7,
    name: "Loveth Sweetstick",
    age: 20,
    location: "Imo",
    level: "stage-3",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 8,
    name: "Zzaz Zuzzi",
    age: 19,
    location: "Bayelsa",
    level: "stage-2",
    mood: "party-mood",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 9,
    name: "Ian Sweetmouth",
    age: 18,
    location: "Enugu",
    level: "stage-4",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 10,
    name: "Elekun Bayo",
    age: 21,
    location: "Zamfara",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 11,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 12,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 13,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 14,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 1,
    name: "Chikwa Eligson",
    age: 24,
    location: "Lagos",
    level: "stage-1",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 2,
    name: "Bamidele Johnson",
    age: 18,
    location: "Anambra",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 3,
    name: "John Lee",
    age: 20,
    location: "Abuja",
    level: "stage-2",
    mood: "indifferent",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 4,
    name: "Binta Pelumi",
    age: 22,
    location: "Jos",
    level: "stage-3",
    mood: "sad",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 5,
    name: "Cassidy Ferangamo",
    age: 30,
    location: "Lagos",
    level: "stage-4",
    mood: "angry",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 6,
    name: "Damian Swaggbag",
    age: 35,
    location: "PortHarcourt",
    level: "stage-1",
    mood: "bitter",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 7,
    name: "Loveth Sweetstick",
    age: 20,
    location: "Imo",
    level: "stage-3",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 8,
    name: "Zzaz Zuzzi",
    age: 19,
    location: "Bayelsa",
    level: "stage-2",
    mood: "party-mood",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 9,
    name: "Ian Sweetmouth",
    age: 18,
    location: "Enugu",
    level: "stage-4",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 10,
    name: "Elekun Bayo",
    age: 21,
    location: "Zamfara",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 11,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 12,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 13,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 14,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 1,
    name: "Chikwa Eligson",
    age: 24,
    location: "Lagos",
    level: "stage-1",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 2,
    name: "Bamidele Johnson",
    age: 18,
    location: "Anambra",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 3,
    name: "John Lee",
    age: 20,
    location: "Abuja",
    level: "stage-2",
    mood: "indifferent",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 4,
    name: "Binta Pelumi",
    age: 22,
    location: "Jos",
    level: "stage-3",
    mood: "sad",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 5,
    name: "Cassidy Ferangamo",
    age: 30,
    location: "Lagos",
    level: "stage-4",
    mood: "angry",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 6,
    name: "Damian Swaggbag",
    age: 35,
    location: "PortHarcourt",
    level: "stage-1",
    mood: "bitter",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 7,
    name: "Loveth Sweetstick",
    age: 20,
    location: "Imo",
    level: "stage-3",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 8,
    name: "Zzaz Zuzzi",
    age: 19,
    location: "Bayelsa",
    level: "stage-2",
    mood: "party-mood",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 9,
    name: "Ian Sweetmouth",
    age: 18,
    location: "Enugu",
    level: "stage-4",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 10,
    name: "Elekun Bayo",
    age: 21,
    location: "Zamfara",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 11,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 12,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 13,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 14,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 1,
    name: "Chikwa Eligson",
    age: 24,
    location: "Lagos",
    level: "stage-1",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 2,
    name: "Bamidele Johnson",
    age: 18,
    location: "Anambra",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 3,
    name: "John Lee",
    age: 20,
    location: "Abuja",
    level: "stage-2",
    mood: "indifferent",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 4,
    name: "Binta Pelumi",
    age: 22,
    location: "Jos",
    level: "stage-3",
    mood: "sad",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 5,
    name: "Cassidy Ferangamo",
    age: 30,
    location: "Lagos",
    level: "stage-4",
    mood: "angry",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 6,
    name: "Damian Swaggbag",
    age: 35,
    location: "PortHarcourt",
    level: "stage-1",
    mood: "bitter",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 7,
    name: "Loveth Sweetstick",
    age: 20,
    location: "Imo",
    level: "stage-3",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 8,
    name: "Zzaz Zuzzi",
    age: 19,
    location: "Bayelsa",
    level: "stage-2",
    mood: "party-mood",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 9,
    name: "Ian Sweetmouth",
    age: 18,
    location: "Enugu",
    level: "stage-4",
    mood: "happy",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 10,
    name: "Elekun Bayo",
    age: 21,
    location: "Zamfara",
    level: "stage-4",
    mood: "anxious",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 11,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 12,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 13,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
  {
    id: 14,
    name: "Elekun Bayo1",
    age: 21,
    location: "Zamfara1",
    level: "stage-41",
    mood: "anxious1",
    mood2: "happy",
    mood3: "happy",
    mood4: "happy",
    mood5: "happy",
  },
];

export default function HtmlTable() {
  const handlePrint = () => {
    const printContent = document.getElementById("printArea");
    const WindowPrt = window.open(
      " ",
      "PrintWindow",
      "left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0"
    );
    WindowPrt.document.write("<html><head><title>&nbsp;</title>");
    WindowPrt.document.write("<style>");
    // WindowPrt.document.write(
    //   "#report-table { border: 1px solid black} td { border-bottom:1px solid black; font-size: 16px;} th { border-bottom: 1px solid black; }"
    // );
    WindowPrt.document.write("</style>");
    // WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="../windowprint.css"/>');
    WindowPrt.document.write("</head><body>");
    // WindowPrt.document.write("<h4>" + this.reportTitle + "</h4>");
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write("</body></html>");

    // console.log(printContent);
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  };

  const handleDownloadPDF = (title, grouping = []) => {
    // Assuming 'data' variable contains your table data
    const columnHeadings = Object.keys(data[0]);
    const printContent = document.getElementById("printArea");
    const doc = new jsPDF({
      orientation: columnHeadings.length > 6 ? "landscape" : "portrait",
    });

    const tableRows = printContent.querySelectorAll("tr");
    let startRowIndex = 0;

    // Find the index of the first non-empty row
    for (let i = 0; i < tableRows.length; i++) {
      const columns = tableRows[i].querySelectorAll("td");
      if (columns.length > 0) {
        startRowIndex = i;
        break;
      }
    }

    const tableData = Array.from(tableRows)
      .slice(startRowIndex)
      .map((row) => {
        const rowData = [];
        const columns = row.querySelectorAll("td");
        columns.forEach((column) => {
          rowData.push(column.innerText);
        });
        return rowData;
      });

    // Extract only the all columns
    const truncatedTableData = tableData.map((row) =>
      row.slice(0, columnHeadings.length)
    );

    // Capitalize the first letter of each header
    const capitalizedHeadings = columnHeadings.map(
      (heading) => heading.charAt(0).toUpperCase() + heading.slice(1)
    );

    // Generate grouped headers based on the 'grouping' object
    let groupedHeaders = [];
    if (grouping.length > 0) {
      groupedHeaders = grouping.map(({ header, colspan }) => ({
        content: header,
        colSpan: colspan,
        styles: {
          halign: "center",
          background: "transparent",
          cellPadding: 2.5, // Adjust cell padding as needed
          lineWidth: {
            top: 0.5,
            right: 0.1,
            bottom: 0,
            left: 0.1,
          },

          lineColor: [0, 0, 0], // Border color, black in this example
        },
      }));
    }

    // Add grouped headers manually
    let headers = [capitalizedHeadings];
    if (grouping.length > 0) {
      headers = [groupedHeaders, capitalizedHeadings];
    }

    doc.autoTable({
      willDrawPage: (hookData) => {
        const pageWidth = doc.internal.pageSize.width;
        const textWidth =
          (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        const xOffset = pageWidth / 2;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold"); // Set font family to helvetica and font weight to bold
        // Add image
        doc.addImage(facebook, "PNG", 14, 6, 5, 5); // Adjust coordinates and dimensions as needed
        doc.text(title, xOffset, 10, {
          align: "center",
        });
      },
      head: headers,
      headStyles: {
        // halign: "center",
        cellPadding: 2.5, // Adjust cell padding as needed
        lineWidth: {
          top: 0.1,
          right: 0.1,
          bottom: 0.5,
          left: 0.1,
        },
        lineColor: [0, 0, 0], // Border color, black in this example
      },
      body: truncatedTableData,
      // startY: 20,
      theme: "striped", // striped, grid, plain
    });

    let totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        "Page " + i + " of " + totalPages,
        doc.internal.pageSize.getWidth() - 35,
        doc.internal.pageSize.getHeight() - 8
      );
    }

    doc.save("table.pdf");
  };

  // const handleDownloadPDF = (title, grouping) => {
  //   //https://www.npmjs.com/package/jspdf-autotable
  //   const columnHeadings = Object.keys(data[0]);

  //   const printContent = document.getElementById("printArea");

  //   const doc = new jsPDF({
  //     orientation: columnHeadings.length > 6 ? "landscape" : "portrait",
  //   });

  //   const tableRows = printContent.querySelectorAll("tr");
  //   let startRowIndex = 0;

  //   // Find the index of the first non-empty row
  //   for (let i = 0; i < tableRows.length; i++) {
  //     const columns = tableRows[i].querySelectorAll("td");
  //     if (columns.length > 0) {
  //       startRowIndex = i;
  //       break;
  //     }
  //   }

  //   const tableData = Array.from(tableRows)
  //     .slice(startRowIndex)
  //     .map((row) => {
  //       const rowData = [];
  //       const columns = row.querySelectorAll("td");
  //       columns.forEach((column) => {
  //         rowData.push(column.innerText);
  //       });
  //       return rowData;
  //     });

  //   // Extract only the all columns
  //   const truncatedTableData = tableData.map((row) =>
  //     row.slice(0, columnHeadings.length)
  //   );

  //   // Capitalize the first letter of each header
  //   const capitalizedHeadings = columnHeadings.map(
  //     (heading) => heading.charAt(0).toUpperCase() + heading.slice(1)
  //   );

  //   doc.autoTable({
  //     willDrawPage: (hookData) => {
  //       const pageWidth = doc.internal.pageSize.width;
  //       const textWidth =
  //         (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
  //         doc.internal.scaleFactor;
  //       const xOffset = pageWidth / 2;
  //       doc.setFontSize(12);
  //       doc.setTextColor(0);
  //       doc.setFont("helvetica", "bold"); // Set font family to helvetica and font weight to bold
  //       // Add image
  //       doc.addImage(facebook, "PNG", 14, 6, 5, 5); // Adjust coordinates and dimensions as needed
  //       doc.text(title, xOffset, 10, {
  //         align: "center",
  //       });
  //     },
  //     head: [capitalizedHeadings.slice(0, columnHeadings.length - 1)],
  //     body: truncatedTableData,
  //     // startY: 20,
  //     theme: "striped",
  //   });

  //   let totalPages = doc.internal.pages.length - 1;
  //   for (let i = 1; i <= totalPages; i++) {
  //     doc.setPage(i);
  //     doc.setFontSize(10);
  //     doc.text(
  //       "Page " + i + " of " + totalPages,
  //       doc.internal.pageSize.getWidth() - 35,
  //       doc.internal.pageSize.getHeight() - 8
  //     );
  //   }

  //   doc.save("table.pdf");
  // };

  const handleDownloadCSV = (data, filename = "List") => {
    const columnHeadings = Object.keys(data[0]);

    let csvData = ConvertToCSV(data, columnHeadings);
    let blob = new Blob(["\ufeff" + csvData], {
      type: "text/csv;charset=utf-8;",
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  };

  function ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";

    for (let index in headerList) {
      row +=
        headerList[index].charAt(0).toUpperCase() +
        headerList[index].slice(1) +
        ",";
    }
    row = row.slice(0, -1);
    str += row + "\r\n";
    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in headerList) {
        let head = headerList[index];
        line +=
          String(array[i][head])
            .replace(", ", " ")
            .replace(" ,", " ")
            .replace(",", " ") + ",";
      }
      str += line + "\r\n";
    }
    // this.homeService.hide();
    return str;
  }

  const grouping = [
    {
      header: "Group A",
      colspan: "2",
    },
    {
      header: "Group B",
      colspan: "2",
    },
    {
      header: "Group C",
      colspan: "3",
    },
    {
      header: "Group D",
      colspan: "3",
    },
  ];

  return (
    // className="px-3 bg-gray-100 flex flex-col  py-12 sm:px-6 lg:px-8 schreenHeightCalc"
    <div className="sm:px-6 lg:px-8 py-2">
      <div className="flex justify-end">
        <BootstrapTooltip title="Print">
          <PrintIcon
            aria-label="Print"
            className="cursor-pointer mx-2"
            onClick={handlePrint}
          />
        </BootstrapTooltip>
        <BootstrapTooltip
          title={
            <span>
              Download <br /> PDF
            </span>
          }
          placement="bottom"
        >
          <CloudDownloadIcon
            className="cursor-pointer mx-2"
            onClick={() => handleDownloadPDF("Employee List", grouping)}
          />
        </BootstrapTooltip>
        <BootstrapTooltip
          title={
            <span>
              Download <br /> CSV
            </span>
          }
          placement=""
        >
          <DownloadIcon
            className="cursor-pointer mx-2"
            onClick={() => handleDownloadCSV(data, "Employee List")}
          />
        </BootstrapTooltip>
      </div>
      <HtmlTableField title={"Employee List"} data={data} grouping={grouping} />
    </div>
  );
}
