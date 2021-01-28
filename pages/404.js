import {useRouter} from 'next/router'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function Custom404() {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].pageNotFound

  return <section>
	
				   <h2>Oops.</h2>
					 
					 <p>{translations.Message}</p>
				 
				 </section>
}