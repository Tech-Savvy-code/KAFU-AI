import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import Programs from "./pages/Programs";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";

function App() {

return (

<Router>

<Routes>

<Route path="/" element={<Splash />} />

<Route path="/home" element={<Home />} />

<Route path="/map" element={<CampusMap />} />

<Route path="/programs" element={<Programs />} />

<Route path="/documents" element={<Documents />} />

<Route path="/calendar" element={<Calendar />} />

<Route path="/profile" element={<Profile />} />

<Route path="/settings" element={<Settings />} />

<Route path="/notifications" element={<Notifications />} />

<Route path="/help" element={<Help />} />

</Routes>

</Router>

)

}

export default App