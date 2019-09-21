import React from 'react'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Loading } from '../../components/Loading'
import { Post } from './Post'
const POSTS_QUERY = loader('./graphql/AllPosts.graphql')

export const AllPosts = () => {
  const { data, loading, error } = useQuery(POSTS_QUERY)
  if (loading) return <Loading />
  if (error) return console.log(error)

  return (
    <Grid>
      {data.posts ? (
        data.posts.map(post => <Post id={post.id} post={post} />)
      ) : (
        <Loading />
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Grid>
  )
}
