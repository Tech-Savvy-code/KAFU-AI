import "../styles/Home.css"

function Documents(){

const docs = [

"Admission Form.pdf",
"Student Handbook.pdf",
"Fee Structure.pdf",
"University Policies.pdf"

]

return(

<div className="main">

<div className="welcome">

<h1>University Documents</h1>

<p>Access important university files</p>

</div>

<div className="cards">

{docs.map((doc,index)=>(

<div key={index} className="card">

<h3>{doc}</h3>

<p>Download or view this document</p>

</div>

))}

</div>

</div>

)

}

export default Documents