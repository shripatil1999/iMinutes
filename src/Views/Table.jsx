import TableField from "../MainReUsables/TableField";
import { useState } from "react";

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
];
export default function Table() {
  const [first, setfirst] = useState(data);

  const handleEditRow = (editdata) => {
    console.log(editdata);
  };

  const handleDeleteRow = (deldata) => {
    console.log(deldata);
    let id = deldata[0];
    let first2 = first.filter((item) => item.id !== id);
    setfirst(first2);
  };

  return (
    // className="px-3 bg-gray-100 flex flex-col  py-12 sm:px-6 lg:px-8 schreenHeightCalc"
    <div className="sm:px-6 lg:px-8 py-2 h-[70%]">
      <TableField
        title={"Employee List"}
        // sampleColumns={sampleColumns}//This prop is used to show the sample columns if data is not available
        data={first}
        columnsHide={["id", "mood", "mood2"]}
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
        editRowCallBack={handleEditRow} //This prop is used to handle the edit action
        deleteRowCallBack={handleDeleteRow} //This prop is used to handle the delete action
        viewColumns={false} //This prop is used to show the view columns button
      />
    </div>
  );
}
