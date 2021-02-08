import {useRouter} from 'next/router'
import {getAllTagIds,getSortedBlogData} from '../../../lib/blog'
import BlogIndex from '../../../components/BlogIndex.js';
import * as translationsLibrary from "../../../lib/translationsLibrary.js"

export default function BlogByTag({blogDataByTag, tag}) {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].blogIndex
  // Check if there are blog posts (if so, then show the blog index component) or if we should show a message of no posts:
  let content
  if (blogDataByTag.length > 0) {
    content = <BlogIndex blogData={blogDataByTag} />
  } else {
    content = <p>{translations.noPosts}</p>
  }

  return (
    <>

      <h2>{translations.Title} / {tag}</h2>
      
      {content}
      
    </>  
  )
}

// Define a list of paths (the tags) that have to be rendered to HTML at build time:
// - If a page has dynamic routes and uses getStaticProps it needs to define this list of paths.
// - "fallback: false" means any paths not returned by getStaticPaths will result in a 404 page.
export async function getStaticPaths() {
  const paths = getAllTagIds()
  return {
    paths,
    fallback: false
  }
}

// This function gets called at build time on server-side and fetches the blog posts associated with this tag, to be shown on the tag index using the library function getSortedBlogData, which gets data from the file system:
export async function getStaticProps(context) {
  const blogDataByTag = getSortedBlogData(context.locale, context.params.id).sortedBlogData
  const tag = getSortedBlogData(context.locale, context.params.id).tag
  return {
    props: {
      blogDataByTag,
      tag
    }
  }
}
