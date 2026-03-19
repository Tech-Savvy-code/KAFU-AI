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
  console.log(`📍 Local: http://localhost:${PORT}`)
  console.log(`🌐 Visit: www.kafu.ac.ke for university information`)
})

/* ---------------- DOCUMENTS page ---------------- */

app.get("/api/documents", async (req, res) => {
  let browser;

  try {
    console.log("🚀 Launching browser to fetch documents");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://kafu.ac.ke/academic-programmes/", {
      waitUntil: "networkidle2"
    });

    // Grab all links that look like documents (PDF, DOCX)
    const docs = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      const docLinks = links
        .filter(a => a.href.endsWith(".pdf") || a.href.endsWith(".docx") || a.href.endsWith(".doc"))
        .map(a => a.innerText || a.href.split("/").pop());
      return [...new Set(docLinks)];
    });

    await browser.close();

    if (docs.length === 0) throw new Error("No documents found");

    console.log("✅ Documents found:", docs.length);
    res.json(docs);

  } catch (error) {
    console.log("🔥 DOCUMENTS SCRAPE ERROR:", error.message);
    if (browser) await browser.close();
    res.status(500).json([]);
  }
});

/* ---------------- CHAT WITH AI ---------------- */

app.post("/api/chat", async (req, res) => {
  const { message, context } = req.body;

  try {
    console.log("💬 Chat request:", message);

    // Scrape KAFU website for context
    const kafuContext = await scrapeKAFUInfo();

    // Use OpenRouter AI to generate response
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content: `You are KAFU AI, the official smart campus assistant for Kaimosi Friends University.
          
          Your role:
          - Answer questions about KAFU programs, admissions, fees, campus life
          - Provide accurate information from the university
          - Be friendly, helpful, and professional
          - If unsure, direct students to official channels
          
          Key Information:
          - Website: www.kafu.ac.ke
          - Email: info@kafu.ac.ke
          - Location: Kaimosi, Vihiga County, Kenya
          - Phone: +254 700 123 456
          
          ${kafuContext ? "Current info from website: " + kafuContext : ""}
          
          Keep responses concise but informative. Use bullet points and emojis for clarity.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("✅ AI Response:", aiResponse);

    res.json({
      response: aiResponse,
      timestamp: new Date(),
      source: "ai"
    });

  } catch (error) {
    console.error("❌ Chat error:", error.message);
    
    // Fallback response
    res.json({
      response: getFallbackResponse(message),
      timestamp: new Date(),
      source: "fallback"
    });
  }
});

// Scrape KAFU website for information
async function scrapeKAFUInfo() {
  try {
    const browser = await puppeteer.launch({ 
      headless: true, 
      args: ["--no-sandbox", "--disable-setuid-sandbox"] 
    });
    const page = await browser.newPage();
    await page.goto("https://kafu.ac.ke", { 
      waitUntil: "networkidle2",
      timeout: 10000 
    });

    const info = await page.evaluate(() => {
      const title = document.querySelector('h1')?.innerText || '';
      const desc = document.querySelector('meta[name="description"]')?.content || '';
      const links = Array.from(document.querySelectorAll('a')).slice(0, 10).map(a => a.innerText).filter(t => t.length > 0);
      return { title, desc, links };
    });

    await browser.close();
    return `${info.title}. ${info.desc}`;
  } catch (error) {
    console.log("⚠️ Scrape error:", error.message);
    return "";
  }
}

// Fallback response function
function getFallbackResponse(question) {
  const q = question.toLowerCase();
  
  if (q.includes("program") || q.includes("course")) {
    return "📚 KAFU offers various programs including Education, Business, Science, and Arts. Visit www.kafu.ac.ke for detailed information.";
  }
  if (q.includes("admission") || q.includes("apply")) {
    return "🎓 For admissions, visit www.kafu.ac.ke or contact admissions@kafu.ac.ke. Requirements vary by program.";
  }
  if (q.includes("fee") || q.includes("payment")) {
    return "💰 For fee structure, contact the finance office or visit www.kafu.ac.ke. Payment plans are available.";
  }
  if (q.includes("location") || q.includes("where") || q.includes("campus")) {
    return "📍 KAFU is located in Kaimosi, Vihiga County. Use the Campus Map feature for navigation.";
  }
  if (q.includes("exam") || q.includes("test")) {
    return "📝 Exam timetables are available on the student portal. Check with your department for specific dates.";
  }
  if (q.includes("library") || q.includes("book")) {
    return "📖 The library is open Mon-Fri 8AM-9PM, Sat 9AM-5PM, Sun 2PM-9PM. 24/7 during exams.";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("email")) {
    return "📞 Contact: info@kafu.ac.ke | +254 700 123 456 | www.kafu.ac.ke";
  }
  
  return "Thank you for your question! For detailed information, please visit www.kafu.ac.ke or contact the relevant department. How else can I help you?";
}