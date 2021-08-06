import {useRouter} from 'next/router'
import Head from 'next/head'
import {getAllPostIds, getPostData} from '../../lib/blog'
import SingleContent from '../../components/SingleContent.js';
import PostInfo from '../../components/PostInfo.js';
import * as translationsLibrary from "../../lib/translationsLibrary.js"

export default function Post({postData}) {
  const router = useRouter()
  const {locale} = router
	const metaTitle = translationsLibrary[locale].header.Title	
	
  return (
    <>

      <Head>
        <title>{postData.title} | {metaTitle}</title>
      </Head>
      
      <h2>{postData.title}</h2>

      <PostInfo date={postData.date}
                   tags={postData.tags} />    

      <SingleContent ContentHtml={postData.contentHtml} />    
    
    </>  
  )
}

// Define a list of paths (the posts) that have to be rendered to HTML at build time:
// - If a page has dynamic routes and uses getStaticProps it needs to define this list of paths.
// - "fallback: false" means any paths not returned by getStaticPaths will result in a 404 page.
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// This function gets called at build time on server-side and fetches the post data using the library function getPostData, which gets data from the file system:
export async function getStaticProps(context) {
  const postData = await getPostData(context.locale + '/' + context.params.id)
  return {
    props: {
      postData
    }
  }
}