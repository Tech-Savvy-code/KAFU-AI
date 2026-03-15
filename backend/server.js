require("dotenv").config()

const express = require("express")
const cors = require("cors")
const axios = require("axios")
const cheerio = require("cheerio")
const OpenAI = require("openai")

const app = express()

// FIX CORS FOR VITE + LOCALHOST
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000"],
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

// OPENROUTER
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "KAFU AI Assistant"
  }
})


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🤖 KAFU AI Server is running")
})



// SCRAPE FUNCTION
async function scrapePage(url){

  try{

    console.log("📡 Scraping:",url)

    const response = await axios.get(url,{
      timeout:15000,
      headers:{
        "User-Agent":"Mozilla/5.0"
      }
    })

    const $ = cheerio.load(response.data)

    let text = $("body").text()

    text = text.replace(/\s+/g," ")

    return text

  }catch(error){

    console.log("❌ Scrape error:",url)

    return ""

  }

}



// MAIN API
app.get("/api/programs", async (req,res)=>{

  try{

    console.log("🚀 Fetching KAFU pages...")

    const pages=[

      "https://kafu.ac.ke/programmes",
      "https://kafu.ac.ke/admissions",
      "https://kafu.ac.ke/schools"

    ]

    let combinedText=""

    for(const page of pages){

      const text = await scrapePage(page)

      combinedText += text + " "

    }

    combinedText = combinedText.substring(0,9000)

    console.log("📄 Text length:",combinedText.length)



    console.log("🤖 Sending to AI...")

    const completion = await openai.chat.completions.create({

      model:"openai/gpt-4o-mini",

      messages:[
        {
          role:"system",
          content:"Extract all academic programs offered by the university. Return ONLY a JSON array of program names."
        },
        {
          role:"user",
          content:combinedText
        }
      ],

      temperature:0.2

    })



    let aiResponse = completion.choices[0].message.content

    console.log("🧠 AI RAW:",aiResponse)



    // CLEAN RESPONSE
    aiResponse = aiResponse
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim()



    try{

      const programs = JSON.parse(aiResponse)

      console.log("✅ Programs parsed:",programs.length)

      return res.json(programs)

    }catch(parseError){

      console.log("⚠ JSON parse failed, fixing format")

      const programs = aiResponse
        .replace(/\[/g,"")
        .replace(/\]/g,"")
        .replace(/'/g,"")
        .split(",")
        .map(p=>p.trim())
        .filter(p=>p.length>5)

      console.log("✅ Programs recovered:",programs.length)

      return res.json(programs)

    }

  }catch(error){

    console.log("🔥 SERVER ERROR:",error.message)

    return res.status(500).json({
      error:"AI could not fetch programs"
    })

  }

})



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{

  console.log(`🤖 AI Server running on port ${PORT}`)

})