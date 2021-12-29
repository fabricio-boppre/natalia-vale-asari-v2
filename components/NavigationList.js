import Link from 'next/link'
import {useRouter} from 'next/router'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function NavigationList() {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].navigationList
	
	return  <nav id="nav_list">
						  <ul>
							  <li>
									<Link href="/">
										<a>{translations.CurrentProjects}</a>
									</Link>
							  </li>
							  <li>
							  	<a href="http://minerva.ufsc.br/~natalia/teaching/">{translations.Teaching}</a>
							  </li>
							  <li>
							  	<a href="https://ui.adsabs.harvard.edu/search/p_=0&q=orcid%3A0000-0003-0842-8688">{translations.Publications}</a>
							  </li>
							  <li>
							  	<a href={translations.CvUrl}>{translations.CvName}</a>
							  </li>
							  <li>
							  	<a href="http://minerva.ufsc.br/~natalia/phd_thesis/Natalia2010_thesis_finalversion.pdf">{translations.Thesis}</a>
							  </li>
							  <li>
							  	<a href="https://orcid.org/0000-0003-0842-8688">ORCID</a>
							  </li>
							  <li>
							  	<Link href="/blog/show/all/1">
									  <a>Blog</a>
									</Link>
							  </li>
						  </ul>
					</nav>
}
