import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import Programs from "./pages/Programs";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";

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

</Routes>

</Router>

)

}

export default App