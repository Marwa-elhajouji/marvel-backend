const express = require("express")
const cors = require("cors")
const app = express()
const axios = require("axios")

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

//comics ---------------------------
// Route 1------------List of comics

app.get("/comics", async (req, res) => {
  try {
    const apiKey = req.query.apiKey
    const limit = req.query.limit || 100
    const skip = req.query.skip || 0
    const name = req.query.name || ""

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&name=${name}`
    )

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error server" })
  }
})

// /Route 2----------List of comics with a specific character

app.get("/char-comics/:characterID", async (req, res) => {
  try {
    const characterID = req.params.characterID

    const apiKey = "ftXt3gE751FciBxj"
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${apiKey}`
    )
    const comics = response.data.comics.map((comic) => {
      return comic.title
    })
    res.status(200).json(comics)
  } catch (error) {
    res.status(500).json({ message: "Error Server" })
  }
})

// Route 3------------Info about a  specific comic
app.get("/comics/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId

    const apiKey = "ftXt3gE751FciBxj"
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
    )

    const comics = response.data.results.filter((comic) => {
      return comic._id === comicId
    })
    console.log("comics", comics)
    res.json(comics)
    //    console.log(req.params);
    // res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error Server" })
  }
})

// Characters--------------------

// Route 1----List of characters

app.get("/characters", async (req, res) => {
  try {
    const apiKey = "ftXt3gE751FciBxj"
    const limit = req.query.limit || 100
    const skip = req.query.skip || 0
    const name = req.query.name || ""

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}&name=${name}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error Server" })
  }
})

// Route 2-------------Infos about a specific character

app.get("/character/:characterId", async (req, res) => {
  try {
    const characterID = req.params.characterId

    const apiKey = "ftXt3gE751FciBxj"
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterID}?apiKey=${apiKey}`
    )
    // console.log(response.data);
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error Server" })
  }
})

app.all("*", (req, res) => {
  try {
    return res.status(404).json({ message: "Page not found" })
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

app.listen(3000, () => {
  console.log("Server has Started")
})
