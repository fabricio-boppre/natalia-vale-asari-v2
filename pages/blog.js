import {useRouter} from 'next/router'
import {getSortedBlogData} from '../lib/blog'
import BlogIndex from '../components/BlogIndex.js';
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function Blog({blogData}) {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].blogIndex
  // Check if there are blog posts (if so, then show the blog index component) or if we should show a message of no posts:
  let content
  if (blogData.length > 0) {
    content = <BlogIndex blogData={blogData} />
  } else {
    content = <p>{translations.noPosts}</p>
  }

  return (
    <>

      <h2>{translations.Title}</h2>
      
      {content}
      
    </>  
  )
}

// This function gets called at build time on server-side and fetches the blog posts data to be shown on the index using the library function getSortedBlogData, which gets data from the file system:
export async function getStaticProps(context) {
  const blogData = getSortedBlogData(context.locale, null).sortedBlogData
  return {
    props: {
      blogData
    }
  }
}


