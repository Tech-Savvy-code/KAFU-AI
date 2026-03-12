import "../styles/Home.css"

function Programs(){

const programs = [

"Computer Science",
"Information Technology",
"Business Administration",
"Education",
"Agriculture",
"Environmental Science"

]

return(

<div className="main">

<div className="welcome">

<h1>Academic Programs</h1>

<p>Programs offered at Kaimosi Friends University</p>

</div>

<div className="cards">

{programs.map((program,index)=>(

<div key={index} className="card">

<h3>{program}</h3>

<p>Learn more about this program and its requirements.</p>

</div>

))}

</div>

</div>

)

}

export default Programs