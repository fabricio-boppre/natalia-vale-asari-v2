import {useRouter} from 'next/router'
import {getSortedProjectsData} from '../lib/projects'
import ProjectsIndex from '../components/ProjectsIndex.js';
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function Home({projectsData}) {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].projectsIndex
  // Check if there are projects (if so, then show the projects index component) or if we should show a message of no projects:
  let content
  if (projectsData.length > 0) {
    content = <ProjectsIndex projectsData={projectsData} />
  } else {
    content = <p>{translations.noProjects}</p>
  }

  return (
    <>

      <h2>{translations.Title}</h2>
      
      {content}
      
    </>  
  )
}

// This function gets called at build time on server-side and fetches the projects data to be shown on the index using the library function getSortedProjectsData, which gets data from the file system:
export async function getStaticProps(context) {
  const projectsData = getSortedProjectsData(context.locale)
  return {
    props: {
      projectsData
    }
  }
}


