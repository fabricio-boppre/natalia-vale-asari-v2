import {useRouter} from 'next/router'
import Head from 'next/head'
import {getAllProjectIds, getProjectData} from '../../lib/projects'
import SingleContent from '../../components/SingleContent.js';
import * as translationsLibrary from "../../lib/translationsLibrary.js"

export default function Project({projectData}) {
  const router = useRouter()
  const {locale} = router
	const metaTitle = translationsLibrary[locale].header.Title	

  return (
    <>

      <Head>
        <title>{projectData.title} | {metaTitle}</title>
      </Head>
      
      <h2>{projectData.title}</h2>
      
      <SingleContent ContentHtml={projectData.contentHtml} />    
    
    </>  
  )
}

// Define a list of paths that have to be rendered to HTML at build time:
// - If a page has dynamic routes and uses getStaticProps it needs to define this list of paths.
// - "fallback: false" means any paths not returned by getStaticPaths will result in a 404 page.
export async function getStaticPaths() {
  const paths = getAllProjectIds()
  return {
    paths,
    fallback: false
  }
}

// This function gets called at build time on server-side and fetches the project data using the library function getProjectData, which gets data from the file system:
export async function getStaticProps(context) {
  const projectData = await getProjectData(context.locale + '/' + context.params.id)
  return {
    props: {
      projectData
    }
  }
}