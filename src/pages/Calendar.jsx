import "../styles/Home.css"

function Calendar(){

const events = [

{date:"Jan 10", event:"Semester Begins"},
{date:"Mar 20", event:"Mid Semester Exams"},
{date:"May 15", event:"End Semester Exams"},
{date:"June 5", event:"Graduation Ceremony"}

]

return(

<div className="main">

<div className="welcome">

<h1>Academic Calendar</h1>

<p>Important academic events</p>

</div>

<div className="cards">

{events.map((item,index)=>(

<div key={index} className="card">

<h3>{item.date}</h3>

<p>{item.event}</p>

</div>

))}

</div>

</div>

)

}

export default Calendar