import Layout from "./Components/Layout";
import Login from "./Views/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Views/Register";
import Home from "./Views/Home";
import NewMeeting from "./Views/NewMeeting";
import MeetingHistory from "./Views/MeetingHistory";
import MyTasks from "./Views/MyTasks";
import SubTasks from "./Views/SubTasks";
import ManageProfile from "./Views/ManageProfile";
import ManageCodes from "./Views/ManageCodes";
import MyProfile from "./Views/MyProfile";
import Help from "./Views/Help";
import Table from "./Views/Table";
import AllInputFields from "./Views/AllInputFields";

function App() {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <>
                <Layout />
                {/* <Outlet /> */}
              </>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newMeeting" element={<NewMeeting />} />
            <Route path="/meetingHistory" element={<MeetingHistory />} />
            <Route path="/myTasks" element={<MyTasks />} />
            <Route path="/subTasks" element={<SubTasks />} />
            <Route path="/manageProfile" element={<ManageProfile />} />
            <Route path="/manageCodes" element={<ManageCodes />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/help" element={<Help />} />
            <Route path="/table" element={<Table />} />
            <Route path="/all" element={<AllInputFields />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
