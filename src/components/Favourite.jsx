import { Grid } from '@material-ui/core'
import React from 'react'
import MediaCard from './MediaCard'

export default function Favourite(props) {
    const { favShow } = props
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12} md={6} lg={4}  >
                <MediaCard {...favShow} />
            </Grid>
        </Grid>
    )
}
