const express = require("express")
const cors = require("cors")
require("dotenv").config()
const axios = require("axios")
const app = express()
app.use(cors())
app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// Route 1 : Liste personnages

app.get("/characters", async (req, res) => {
  try {
    let filters = ""

    if (req.query.name) {
      filters += `&name=${req.query.name}`
    }
    if (req.query.page) {
      const skip = (req.query.page - 1) * 100
      filters += `&skip=${skip}`
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}${filters}`
    )
    return res.status(200).json(response.data)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

// Route 2 : Rec comics avec id personnage

app.get("/comics/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    )
    return res.status(200).json(response.data)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

//Route 3 : liste comics +filtres

app.get("/comics", async (req, res) => {
  try {
    let filters = ""

    if (req.query.title) {
      filters += `&title=${req.query.title}`
    }
    if (req.query.page) {
      const skip = (req.query.page - 1) * 100
      filters += `&skip=${skip}`
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}${filters}`
    )
    return res.status(200).json(response.data)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
app.all("*", (req, res) => {
  try {
    return res.status(404).json({ message: "Page not found" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("Server has Started" + PORT)
})
