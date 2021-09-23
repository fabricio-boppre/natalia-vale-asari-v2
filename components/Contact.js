import {useRouter} from 'next/router'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function Contact() {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].contact

	return <div id="contact">
				<p className="title">{translations.Title}</p>
				<p>Natalia Vale Asari</p>
				<p>Departamento de Física, CFM, UFSC</p>
				<p>Caixa Postal 476</p>
				<p>Florianópolis (SC)</p>
				<p>88040-900</p>
				<p>{translations.Country}</p>
				<p>Tel: +55 48 3721 3703</p>
				<p>{translations.Office}: 232</p>
				<p>natalia[@]astro.ufsc.br</p>	
		   </div>

}