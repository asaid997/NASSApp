import React, { useEffect, useState } from 'react'
import { Grid, Divider } from '@material-ui/core';
import MediaCard from './MediaCard'

export default function Favourites(props) {
    const { like, dislike, ifLiked, favourites, favHandler } = props
    const [localFavs, setLocalFavs] = useState([])
    const functions = {
        like,
        dislike
    }

    useEffect(() => {
        setLocalFavs([...favourites].reverse())
    }, [])


    return (
        <div id="container">
            <Divider />
            <Grid container spacing={2}>
                {localFavs.map(f =>
                    <Grid key={f.id} item xs={12} md={4} lg={3}>
                        <MediaCard height={400} {...f} {...functions} ifLiked={ifLiked[f.id]} favHandler={favHandler} />
                    </Grid>)}
            </Grid>
        </div>

    )
}
