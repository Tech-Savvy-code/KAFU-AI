import "../styles/Home.css"

function CampusMap(){

return(

<div className="main">

<div className="welcome">

<h1>Campus Map</h1>

<p>Explore locations around Kaimosi Friends University</p>

</div>

<div style={{padding:"30px"}}>

<img
src="https://maps.googleapis.com/maps/api/staticmap?center=Kaimosi+Friends+University&zoom=16&size=900x400"
alt="Campus Map"
style={{width:"100%",borderRadius:"12px"}}
/>

</div>

</div>

)

}

export default CampusMap