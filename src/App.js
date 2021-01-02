import React, { useEffect, useState } from 'react';
import './App.css'
import { Tabs, AppBar, Tab, Toolbar, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CustomizedSnackbars from './components/snackbars';
import Home from './components/Home';
import Search from './components/Search';
import apiManager from './api-manager'
import Favourites from './components/Favourites';
import Favourite from './components/Favourite';



export default function App() {
  //snackBar 
  const [toShow, setToShow] = useState(false)
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState("")

  const alert = (s, t, ts) => {
    setSeverity(s)
    setMessage(t)
    setToShow(ts)
  }

  const alertSuccess = msg => alert("success", msg, true)
  const alertError = msg => alert("error", msg, true)

  const handleClose = () => setToShow(false)
  //snackBar 


  //tracker for liked posts
  const [ifLiked, setIfLiked] = useState({})

  //functions 
  const like = async post => {
    const response = await apiManager.addPost(post)
    if (response) {
      alertSuccess("Succesfuly liked")
      fetchFavourites()
    }
    else alertError("Failure in saving post")

  }
  const dislike = async id => {
    const response = await apiManager.deletePost(id)
    if (response) {
      alertSuccess("Succesfuly disliked...")
      fetchFavourites()
    }
    else alertError("Failure in disliking post")
  }
  //functions 

  //search
  const [results, setResults] = useState([])
  const searchProps = {
    results: [results, setResults],
    like,
    dislike,
    ifLiked
  }
  //search

  //home
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")

  const homeProps = {
    title: [title, setTitle],
    image: [imageUrl, setImageUrl],
    description: [description, setDescription],

  }
  //home


  //Favourites
  const [favourites, setFavourites] = useState([])
  const [favShow, setFavShow] = useState([])
  const favHandler = post => setFavShow(post)
  const favouritesProps = {
    favourites,
    like,
    dislike,
    ifLiked,
    favHandler
  }
  async function fetchFavourites() {
    const favs = await apiManager.getPosts()
    setFavourites(favs)
  }
  //Favourites


  useEffect(() => {
    const populateHomeData = async () => {
      const data = await apiManager.APOD()
      setTitle(data.data.title)
      setImageUrl(data.data.url)
      setDescription(data.data.explanation)
    }

    populateHomeData()
    fetchFavourites()
  }, [])

  useEffect(() => {
    const favs = {}
    favourites.forEach(f => favs[f.id] = true)
    setIfLiked(favs)
  }, [favourites])


  const [tab, setTab] = useState(1);
  const handleChange = (event, newValue) => setTab(newValue)

  return (
    <div >
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <img id="logo" src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" />
              <Tabs value={tab} onChange={handleChange} >
                <Tab component={Link} to={'/'} label="Home" />
                <Tab component={Link} to={'/search'} label="Search" />
                <Tab component={Link} to={'/favourites'} label="Favourites" />
              </Tabs>
            </Toolbar>
          </AppBar>
          <Route path="/" exact render={() => <Home {...homeProps} />} />
          <Route path="/search" exact render={() => <Search {...searchProps} />} />
          <Route path="/favourites" exact render={() => <Favourites {...favouritesProps} />} />
          <Route path="/favourites/:id" exact render={() => <Favourite favShow={favShow} />} />
        </div>
      </Router>
      <CustomizedSnackbars severity={severity} toShow={toShow} message={message} handleClose={handleClose} />
    </div>
  );
}
