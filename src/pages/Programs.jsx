import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "../styles/Home.css"

function Programs(){

  const navigate = useNavigate()

  const [programs,setPrograms] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [search,setSearch] = useState("")

  // FETCH PROGRAMS
  const fetchPrograms = async () => {
    setLoading(true)
    setError("")
    try{
      console.log("🚀 Fetching programs...")
      const response = await fetch("http://localhost:5000/api/programs")
      console.log("Response status:",response.status)
      if(!response.ok) throw new Error("Server responded with error")
      const data = await response.json()
      console.log("Programs received:",data)
      if(Array.isArray(data)){
        setPrograms(data)
      } else throw new Error("Invalid data format")
    }catch(err){
      console.error("FETCH ERROR:",err)
      setError("AI could not fetch programs from the university website.")
    }
    setLoading(false)
  }

  // SEARCH FILTER
  const filteredPrograms = programs.filter(program =>
    program.toLowerCase().includes(search.toLowerCase())
  )

  return(
    <div className="main">

      {/* BACK BUTTON */}
      <div style={{padding:"20px 30px"}}>
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
        initial={{opacity:0,y:-40}}
        animate={{opacity:1,y:0}}
        style={{
          background:"linear-gradient(135deg,#22c55e,#16a34a)",
          padding:"40px",
          borderRadius:"0 0 20px 20px",
          color:"white",
          textAlign:"center",
          marginBottom:"30px"
        }}
      >
        <h1 style={{fontSize:"32px",marginBottom:"10px"}}>
          🎓 KAFU Academic Programs
        </h1>
        <p>
          Ask the AI Assistant to discover programs offered at Kaimosi Friends University
        </p>
      </motion.div>

      {/* AI BUTTON */}
      <div style={{padding:"0 30px",marginBottom:"30px"}}>
        <motion.button
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          onClick={fetchPrograms}
          style={{
            width:"100%",
            padding:"16px",
            borderRadius:"14px",
            border:"none",
            background:"linear-gradient(135deg,#3b82f6,#6366f1)",
            color:"white",
            fontSize:"16px",
            cursor:"pointer",
            fontWeight:"bold",
            boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
          }}
        >
          🤖 Ask AI to Fetch Programs
        </motion.button>
      </div>

      {/* SEARCH */}
      <div style={{padding:"0 30px",marginBottom:"30px"}}>
        <input
          type="text"
          placeholder="🔎 Search program..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            width:"100%",
            padding:"15px",
            borderRadius:"12px",
            border:"2px solid #22c55e",
            outline:"none",
            fontSize:"16px"
          }}
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{textAlign:"center",padding:"20px"}}>
          <motion.div
            animate={{rotate:360}}
            transition={{repeat:Infinity,duration:1}}
            style={{
              width:"40px",
              height:"40px",
              border:"4px solid #3b82f6",
              borderTop:"4px solid transparent",
              borderRadius:"50%",
              margin:"auto",
              marginBottom:"10px"
            }}
          />
          <p>🤖 AI is reading the university website...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{
          textAlign:"center",
          color:"red",
          padding:"20px"
        }}>
          {error}
        </div>
      )}

      {/* PROGRAM CARDS SLIDESHOW */}
      {filteredPrograms.length > 0 && (
        <div style={{
          display:"flex",
          overflowX:"auto",
          padding:"0 30px 40px 30px",
          gap:"20px",
          scrollBehavior:"smooth"
        }}>
          {filteredPrograms.map((program,index)=>(
            <motion.div
              key={index}
              initial={{opacity:0,y:30}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.05}}
              whileHover={{scale:1.05}}
              style={{
                minWidth:"250px",
                flex:"0 0 auto",
                padding:"25px",
                borderRadius:"18px",
                background:"linear-gradient(135deg,#3b82f6,#6366f1,#9333ea)",
                color:"white",
                boxShadow:"0 12px 25px rgba(0,0,0,0.2)",
                cursor:"pointer"
              }}
            >
              <h3 style={{marginBottom:"10px"}}>{program}</h3>
              <p style={{opacity:0.9,fontSize:"14px"}}>
                Ask AI for admission requirements and course details.
              </p>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Programs