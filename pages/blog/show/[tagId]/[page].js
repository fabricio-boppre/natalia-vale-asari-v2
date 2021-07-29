import fs from 'fs'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {getTagsAndLocalesAndPagesNumbers,getBlogData} from '../../../../lib/blog'
import BlogHeader from '../../../../components/BlogHeader.js';
import BlogIndex from '../../../../components/BlogIndex.js'
import BlogPagination from '../../../../components/BlogPagination.js'
import * as translationsLibrary from "../../../../lib/translationsLibrary.js"

export default function Blog({sortedBlogDataPerPage, indexTag, pagination, currentPage}) {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].blogIndex
  // Check if we are filtering the posts by tag (if so, then show the tag on the title):
  let title
  if (indexTag.tag == 'all') {
    title = translations.Title
  } else {
    title = translations.Title + " / " + indexTag.tag
  }
  // Check if there are blog posts: if so, then we show the blog index component; if not, we show a message of no posts:
  let content
  if (sortedBlogDataPerPage != null) {
    content = <BlogIndex blogData={sortedBlogDataPerPage} />
  } else {
    content = <p>{translations.noPosts}</p>
  }
  // Check if we have more than one page; if so, create the pagination component:
  let paginationLinks
  if (pagination.pagesCount > 1) {
    paginationLinks =  <BlogPagination pagination={pagination}
                                       indexTag={indexTag.id}
                                       currentPage={currentPage} />
  }

  return (
    <>
      <Head>
        <title>Blog | Dr Natalia Vale Asari</title>
      </Head>
      <BlogHeader title={title} />
      {content}
      {paginationLinks}
    </>  
  )
}

// Define a list of paths (the tags and pages, and also the locales) that have to be rendered to HTML at build time:
// - If a page has dynamic routes and uses getStaticProps it needs to define this list of paths.
// - "fallback: false" means any paths not returned by getStaticPaths will result in a 404 page.
// - The format should be like this:
// - [
// -   { params: { tagId: 'tagId', page: 'page' }, locale: 'lang' },
// -   { params: { tagId: 'tagId', page: 'page' }, locale: 'lang' },
// - ]
export async function getStaticPaths(context) {
  const paths = getTagsAndLocalesAndPagesNumbers()
  return {
    paths,
    fallback: false
  }
}

// This function gets called at build time on server-side and fetches the posts for this page, locale and tag, to be shown on the blog index using the library function getBlogData, which gets data from the file system:
export async function getStaticProps(context) {
  const data = getBlogData(context.locale, context.params.tagId, context.params.page)
  return {
    props: {
      sortedBlogDataPerPage: data.sortedBlogDataPerPage,
      indexTag: data.indexTag,
      pagination: data.pagination,
      currentPage: data.currentPage
    }
  }
}