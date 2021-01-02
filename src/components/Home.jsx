import { Grid } from '@material-ui/core';
import React from 'react';
import MediaCard from './MediaCard';

export default function Home(props) {
  const [title, setTitle] = props.title
  const [imageUrl, setImageUrl] = props.image
  const [description, setDescription] = props.description

  let myP = {
    title,
    imageUrl,
    description,
    withDescription: true
  }


  return (
    <div id="container">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={4}  >
          <MediaCard  {...myP} />
        </Grid>
      </Grid>
    </div>
  );
}
