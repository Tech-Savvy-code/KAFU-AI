require("dotenv").config()

const express = require("express")
const cors = require("cors")
const puppeteer = require("puppeteer")
const OpenAI = require("openai")

const app = express()

app.use(cors({
  origin:["http://localhost:5173","http://localhost:3000"]
}))

app.use(express.json())

/* ---------------- OPENROUTER ---------------- */

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY,
  baseURL:"https://openrouter.ai/api/v1"
})

/* ---------------- TEST ROUTE ---------------- */

app.get("/",(req,res)=>{
  res.send("🤖 KAFU AI Server Running")
})

/* ---------------- SCRAPE PROGRAMS WITH PUPPETEER ---------------- */

app.get("/api/programs", async(req,res)=>{

  let browser

  try{

    console.log("🚀 Launching browser to scrape KAFU")

    browser = await puppeteer.launch({
      headless:true,
      args:["--no-sandbox","--disable-setuid-sandbox"]
    })

    const page = await browser.newPage()

    await page.goto("https://kafu.ac.ke/academic-programmes/",{
      waitUntil:"networkidle2"
    })

    const programs = await page.evaluate(()=>{

      const items = Array.from(document.querySelectorAll("h1,h2,h3,h4,li,p"))

      const programs = []

      items.forEach(el=>{

        const text = el.innerText.trim()

        if(
          text.includes("Bachelor") ||
          text.includes("Master") ||
          text.includes("Diploma") ||
          text.includes("PhD")
        ){
          programs.push(text)
        }

      })

      return [...new Set(programs)]

    })

    console.log("✅ Programs found:",programs.length)

    await browser.close()

    res.json(programs)

  }catch(error){

    console.log("🔥 SCRAPE ERROR:",error.message)

    if(browser) await browser.close()

    res.status(500).json({
      error:"Failed to fetch programs"
    })

  }

})

/* ---------------- PROGRAM DETAILS ---------------- */

app.get("/api/programs/:name", async (req, res) => {
  let browser;
  try {
    const programName = req.params.name;
    console.log("📘 Fetching details for:", programName);

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // Step 1: Go to programs list page
    await page.goto("https://kafu.ac.ke/academic-programmes/", { waitUntil: "networkidle2" });

    // Step 2: Find the program URL dynamically
    const programURL = await page.evaluate((name) => {
      const links = Array.from(document.querySelectorAll("a"));
      const match = links.find(a => a.innerText.toLowerCase().includes(name.toLowerCase()));
      return match ? match.href : null;
    }, programName);

    if (!programURL) {
      await browser.close();
      return res.json({ details: "Could not find the program page on the university site." });
    }

    console.log("🔗 Program page found:", programURL);

    // Step 3: Visit program-specific page
    await page.goto(programURL, { waitUntil: "networkidle2" });
    const pageText = await page.evaluate(() => document.body.innerText);

    await browser.close();

    // Step 4: Send text to AI
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Kenyan university assistant. Provide structured info: Program Overview, Admission Requirements, Course Content, Career Opportunities."
        },
        {
          role: "user",
          content: `Program: ${programName}\n\nWebsite content:\n${pageText.slice(0, 9000)}`
        }
      ],
      temperature: 0.3
    });

    const details = completion.choices?.[0]?.message?.content || "Details not available.";

    res.json({ details });

  } catch (error) {
    console.log("🔥 DETAILS ERROR:", error.message);
    if (browser) await browser.close();
    res.json({ details: "AI could not fetch detailed information for this program." });
  }
});
/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`🤖 KAFU AI Server running on port ${PORT}`)
})