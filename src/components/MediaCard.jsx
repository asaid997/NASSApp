import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, CardActionArea, Button, makeStyles, Grid } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";


export default function MediaCard(props) {
    const { id, title, imageUrl, description, height } = props
    const { withDescription, ifLiked, dislike, like } = props
    const { favHandler, backButton } = props

    const history = useHistory();

    const likeHandler = () => like({ id, title, imageUrl, description })
    const disLikeHandler = () => dislike(id)

    const [withD, setWithD] = useState(false)

    useEffect(() => {
        setWithD(withDescription)

    }, [])

    const isYoutubeLink = () => imageUrl.match("www.youtube.com/embed/.*")

    const clickHandler = () => {
        if (favHandler) {
            history.push(`/favourites/${id}`)
            favHandler({ id, title, imageUrl, description, withDescription: true, backButton: true })
        }
        else
            setWithD(!withD)
    }
    const back = () => history.goBack()

    //(if its a like/dislike-able post then we can show and hide the description except in the favourites route, else description is always shown )
    const shouldRenderDescription = () => (!withDescription && withD) || withDescription

    return (
        <div>
            {backButton ?
                <Button size="large" color="primary">
                    <ArrowBackIcon fontSize="large" onClick={back} />
                </Button> :
                null}
            <Card >
                <CardActionArea onClick={clickHandler}>
                    <CardContent>
                        <CardMedia height={height} component={isYoutubeLink() ? "iframe" : "img"} src={imageUrl} />
                        <Typography gutterBottom variant="h6">
                            {title}
                        </Typography>
                        {shouldRenderDescription() ?
                            <Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                            :
                            null}
                    </CardContent>
                </CardActionArea>
                {withDescription ? null :
                    <CardActions>
                        <Grid
                            container
                            direction="row"
                            justify="center">
                            <Button size="large" color="primary">
                                {ifLiked ?
                                    <ThumbDownIcon fontSize="large" onClick={disLikeHandler} /> :
                                    <ThumbUpAltIcon fontSize="large" onClick={likeHandler} />}
                            </Button>
                        </Grid>
                    </CardActions>
                }
            </Card>
        </div>
    );
}

