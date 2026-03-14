import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "@react-google-maps/api";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "14px"
};

const campusCenter = { lat: 0.1284, lng: 34.8466 };

// Campus Gate (Route starting point)
const campusGate = { lat: 0.1276964427303656, lng: 34.84862656799445 };

const campusLocations = [
{
name:"KAFU Library",
description:"Main university library for study and research.",
hours:"Open: 8AM – 9PM",
position:{ lat:0.12828600563406842, lng:34.84731776287294 }
},

{
name:"Admin Office",
description:"Main administration building.",
hours:"Open: 8AM – 5PM",
position:{ lat:0.1278568206940331, lng:34.84778497362738 }
},

{
name:"Cafeteria",
description:"Student dining area.",
hours:"Open: 7AM – 8PM",
position:{ lat:0.1278486673907951, lng:34.848760400753875 }
},

{
name:"Campus Gate",
description:"Main entrance to university",
hours:"Open: 24 Hours",
position:{ lat:0.1276964427303656, lng:34.84862656799445 }
},

{
name:"Tuition Block",
description:"Lecture halls and classrooms",
hours:"Open: 8AM – 6PM",
position:{ lat:0.12952626718556268, lng:34.84603136640912 }
},

{
name:"ICT Labs",
description:"Computer labs for ICT students",
hours:"Open: 8AM – 8PM",
position:{ lat:0.12868149757611938, lng:34.84791759882965 }
},

{
name:"Assembly Hall",
description:"University events hall",
hours:"Open: Events Only",
position:{ lat:0.1282272747087612, lng:34.84806193169177 }
}
];

function CampusMap(){

const navigate = useNavigate();
const mapRef = useRef(null);

const [selectedLocation,setSelectedLocation] = useState(null);
const [destination,setDestination] = useState(null);
const [directions,setDirections] = useState(null);
const [search,setSearch] = useState("");

const { isLoaded } = useJsApiLoader({
googleMapsApiKey:"AIzaSyDhkfpYRDnRaTqflKDV8ClYUYrd-a0qCNk",
libraries:["places"]
});


// ROUTE CALCULATION
useEffect(()=>{

if(!destination || !window.google) return;

const directionsService = new window.google.maps.DirectionsService();

directionsService.route(
{
origin: campusGate,
destination: destination,
travelMode: window.google.maps.TravelMode.WALKING
},
(result,status)=>{

if(status === "OK"){
setDirections(result);
}else{
console.log("Directions request failed:",status);
}

}
);

},[destination]);




// SEARCH FUNCTION
const handleSearch = (e)=>{

const value = e.target.value;
setSearch(value);

const found = campusLocations.find(loc =>
loc.name.toLowerCase().includes(value.toLowerCase())
);

if(found){

setSelectedLocation(found);
setDestination(found.position);

if(mapRef.current){
mapRef.current.panTo(found.position);
mapRef.current.setZoom(18);
}

}

};



// CLICK CARD
const goToLocation = (location)=>{

setSelectedLocation(location);
setDestination(location.position);

if(mapRef.current){
mapRef.current.panTo(location.position);
mapRef.current.setZoom(18);
}

};



return isLoaded ? (

<div
className="main"
style={{
paddingBottom:"40px",
overflowY:"auto",
maxHeight:"100vh"
}}
>

{/* BACK BUTTON */}

<div style={{padding:"20px 30px 0 30px"}}>

<button
onClick={()=>navigate("/home")}
style={{
background:"#16a34a",
border:"none",
color:"white",
padding:"10px 16px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}
>
← Back to Home
</button>

</div>


{/* HEADER */}

<motion.div
style={{
background:"linear-gradient(135deg,#22c55e,#16a34a)",
padding:"40px",
borderRadius:"0 0 20px 20px",
color:"white",
textAlign:"center",
boxShadow:"0 10px 30px rgba(0,0,0,0.15)",
marginBottom:"30px"
}}
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
>

<h1 style={{fontSize:"32px",marginBottom:"10px"}}>
Kaimosi Friends University Map
</h1>

<p style={{opacity:0.9}}>
Navigate campus buildings easily
</p>

</motion.div>



{/* SEARCH */}

<div style={{padding:"0 30px",marginBottom:"30px"}}>

<motion.input
type="text"
value={search}
onChange={handleSearch}
placeholder="Search campus building..."
whileFocus={{scale:1.03}}
style={{
width:"100%",
padding:"15px 20px",
borderRadius:"12px",
border:"2px solid #22c55e",
outline:"none",
fontSize:"16px",
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}}
/>

</div>



{/* CARD SLIDER */}

<div style={{padding:"0 30px",marginBottom:"35px"}}>

<div
style={{
display:"flex",
overflowX:"auto",
gap:"20px",
scrollBehavior:"smooth",
paddingBottom:"10px"
}}
>

{campusLocations.map((loc,idx)=>(

<motion.div
key={idx}
onClick={()=>goToLocation(loc)}
whileHover={{scale:1.1}}
style={{
minWidth:"240px",
padding:"20px",
borderRadius:"16px",
cursor:"pointer",
color:"white",
background:"linear-gradient(135deg,#3b82f6,#6366f1,#9333ea)",
boxShadow:"0 12px 25px rgba(0,0,0,0.2)"
}}
>

<h3>{loc.name}</h3>

<p style={{opacity:0.9}}>
Click to locate
</p>

</motion.div>

))}

</div>

</div>



{/* MAP */}

<div style={{padding:"0 30px"}}>

<GoogleMap
mapContainerStyle={containerStyle}
center={campusCenter}
zoom={16}
onLoad={(map)=>mapRef.current = map}
>

{/* MARKERS */}

{campusLocations.map((loc,idx)=>(

<Marker
key={idx}
position={loc.position}
onClick={()=>setSelectedLocation(loc)}
/>

))}



{/* INFO WINDOW */}

{selectedLocation && (

<InfoWindow
position={selectedLocation.position}
onCloseClick={()=>setSelectedLocation(null)}
>

<div style={{maxWidth:"200px"}}>

<h3>{selectedLocation.name}</h3>
<p>{selectedLocation.description}</p>

<p style={{color:"green",fontWeight:"bold"}}>
{selectedLocation.hours}
</p>

</div>

</InfoWindow>

)}



{/* ROUTE LINE */}

{directions && (

<DirectionsRenderer
directions={directions}
options={{
polylineOptions:{
strokeColor:"#2563eb",
strokeWeight:6
}
}}
/>

)}

</GoogleMap>

</div>

</div>

) : (

<div style={{padding:"40px",textAlign:"center"}}>
Loading Campus Map...
</div>

);

}

export default CampusMap;