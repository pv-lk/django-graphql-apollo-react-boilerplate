import Head from 'next/head'
import cookies from 'lib/cookies'
import styles from 'styles/Home.module.css'
import { initApollo } from 'lib/apollo'
import { usePostsQuery } from 'lib/posts/posts'
import ALL_POSTS from '../lib/posts/queries/AllPosts.graphql'

const Home = ({ ...props }) => {
  const [getAllPosts] = usePostsQuery()
  console.log(props)

  const { loading, data, error } = getAllPosts()

  if (error) return 'Error...'

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        { loading ? loading : data.posts.map((post, i) => <p key={i}>{ post.text }</p>)}

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const client = initApollo()

  // await client.query({
  //   query: ALL_POSTS
  // })

  return {
    props: {
      initialState: client.cache.extract()
    }
  }

}

export default Home
