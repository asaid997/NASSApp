import React, { useState, useEffect } from 'react'
import { Input, Grid } from '@material-ui/core';
import apiManager from '../api-manager'
import MediaCard from './MediaCard'


export default function Search(props) {
    const [search, setSearch] = useState("")
    const [results, setResults] = props.results
    const [timer, setTimer] = useState(0)

    const { like, dislike, ifLiked } = props
    const functions = {
        like,
        dislike
    }


    const searchHandler = e => setSearch(e.target.value)

    useEffect(() => {
        clearTimeout(timer)
        if (search !== "") {
            setTimer(setTimeout(async () => {
                const data = await apiManager.search(search)
                setResults(data.data.collection.items)
            }, 500))
        }
    }, [search])



    const extractProps = result => {
        const data = result.data[0]
        const links = result.links[0]

        const { nasa_id, title, description } = data
        const { href } = links

        return {
            imageUrl: href,
            id: nasa_id,
            title,
            description,
            ifLiked: ifLiked[nasa_id]
        }
    }


    return (
        <div>
            <Input id="search" fullWidth={true} placeholder="Search space things" onChange={searchHandler} />
            <div id="container">
                <Grid container spacing={2}>
                    {results.map(r =>
                        <Grid key={r.nasa_id} item xs={12} md={4} lg={3}>
                            <MediaCard height={400} {...extractProps(r)} {...functions} />
                        </Grid>)}
                </Grid>
            </div>
        </div>
    )
}
