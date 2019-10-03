import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Loading } from '../../components/Loading'
import { Post } from './Post'
const POSTS_QUERY = loader('./graphql/AllPosts.graphql')

const useStyles = makeStyles(theme => ({
  grid: {
    paddingTop: 15
  }
}))

export const AllPosts = () => {
  const classes = useStyles()
  const { data, loading, error } = useQuery(POSTS_QUERY)
  if (loading) return <Loading />
  if (error) return console.log(error)

  return (
    <Grid className={ classes.grid }>
      {data.posts ? (
        data.posts.map(post => <Post id={post.id} post={post} />)
      ) : (
        <Loading />
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Grid>
  )
}
