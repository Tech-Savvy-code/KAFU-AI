import React, { useState } from "react";
import "../styles/Home.css";

import { motion } from "framer-motion";

import ParticlesBackground from "../components/ParticlesBackground";
import AITyping from "../components/AITyping";
import { Link } from "react-router-dom";

import {
FaRobot,
FaMicrophone,
FaMoon,
FaSun
} from "react-icons/fa";

import { FiSend } from "react-icons/fi";

import { MdSchool } from "react-icons/md";

import { IoLocationSharp } from "react-icons/io5";

import { HiDocumentText } from "react-icons/hi";

import { BsCalendarEvent } from "react-icons/bs";


function Home(){

const [messages,setMessages] = useState([
{
text:"Hello 👋 I am KAFU AI. Ask me anything about Kaimosi Friends University.",
sender:"ai"
}
])

const [input,setInput] = useState("")
const [typing,setTyping] = useState(false)
const [darkMode,setDarkMode] = useState(false)


/* SEND MESSAGE */

const sendMessage = ()=>{

if(input.trim()==="") return

const userMessage = {text:input,sender:"user"}

setMessages(prev => [...prev,userMessage])

setInput("")
setTyping(true)

setTimeout(()=>{

const aiMessage = {
text:"This is a demo AI response. Later it will connect to university knowledge sources.",
sender:"ai"
}

setMessages(prev => [...prev,aiMessage])

setTyping(false)

},1500)

}


/* QUICK QUESTIONS */

const quickQuestion = (question)=>{
setInput(question)
}


/* UI */

return(

<div className={darkMode ? "app dark" : "app"}>

{/* PARTICLE BACKGROUND */}

<ParticlesBackground/>

{/* SIDEBAR */}

<div className="sidebar">

<div className="logo">

<FaRobot size={28}/>
<h2>KAFU AI</h2>

</div>

<button className="newChat">
+ New Chat
</button>

<div className="menu">

<Link to="/map" className="menuItem">
<IoLocationSharp/>
Campus Map
</Link>

<Link to="/programs" className="menuItem">
<MdSchool/>
Programs
</Link>

<Link to="/documents" className="menuItem">
<HiDocumentText/>
Documents
</Link>

<Link to="/calendar" className="menuItem">
<BsCalendarEvent/>
Academic Calendar
</Link>

</div>

</div>


{/* MAIN AREA */}

<div className="main">


{/* TOP BAR */}

<div className="topbar">

<input
className="search"
placeholder="Search university information..."
/>

<div className="controls">

<button
onClick={()=>setDarkMode(!darkMode)}
className="iconBtn"
>

{darkMode ? <FaSun/> : <FaMoon/>}

</button>

</div>

</div>


{/* WELCOME */}

<div className="welcome">

<h1>Welcome to KAFU AI</h1>

<p>
Smart Campus Assistant for Kaimosi Friends University
</p>

</div>


{/* FEATURE CARDS */}

<div className="cards">

<div
className="card"
onClick={()=>quickQuestion("Where is the university library?")}
>

<IoLocationSharp size={28}/>

<h3>Campus Map</h3>

<p>Find locations on campus</p>

</div>


<div
className="card"
onClick={()=>quickQuestion("What programs are offered at KAFU?")}
>

<MdSchool size={28}/>

<h3>Programs</h3>

<p>Explore academic programs</p>

</div>


<div
className="card"
onClick={()=>quickQuestion("Show university documents")}
>

<HiDocumentText size={28}/>

<h3>Documents</h3>

<p>University files & resources</p>

</div>


<div
className="card"
onClick={()=>quickQuestion("Show academic calendar")}
>

<BsCalendarEvent size={28}/>

<h3>Calendar</h3>

<p>Important academic dates</p>

</div>

</div>


{/* CHAT AREA */}

<div className="chat">

{/* MESSAGES */}

<div className="messages">

{messages.map((msg,index)=>(

<motion.div
key={index}
className={msg.sender==="user" ? "message user" : "message ai"}
initial={{opacity:0,y:15}}
animate={{opacity:1,y:0}}
transition={{duration:0.3}}
>

{msg.text}

</motion.div>

))}

{/* AI TYPING ANIMATION */}

{typing && <AITyping/>}

</div>


{/* QUICK SUGGESTIONS */}

<div className="suggestions">

<button
onClick={()=>quickQuestion("Where is the library?")}
>
Library location
</button>

<button
onClick={()=>quickQuestion("Admission requirements")}
>
Admissions
</button>

<button
onClick={()=>quickQuestion("Programs offered")}
>
Programs
</button>

<button
onClick={()=>quickQuestion("Campus map")}
>
Campus Map
</button>

</div>


{/* INPUT AREA */}

<div className="inputArea">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Ask anything about the university..."
/>


<button className="iconBtn">

<FaMicrophone/>

</button>


<button
onClick={sendMessage}
className="sendBtn"
>

<FiSend/>

</button>

</div>

</div>

</div>

</div>

)

}

export default Home