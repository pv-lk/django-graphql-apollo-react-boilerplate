import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  }
}))

export const Post = post => {
  const { id, text, author } = post.post
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {text}
        </Typography>{' '}
        <Typography color="textSecondary">
          { author.username }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
