import LanguagesList from '../components/LanguagesList.js';
import {useRouter} from 'next/router'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function Header(props) {
  const router = useRouter()
  const {locale} = router
	// Translations for the current language and the current set of string:
	const translations = translationsLibrary[locale].header

	return <header>

            <noscript>
              <div id="no-js-message">
                {translations.noJsMessage}
              </div>
            </noscript>
          
            <div id="title_and_buttons">

              <div id="languages" className="header_button">
                <LanguagesList />
              </div>
  
              <h1>{translations.Title}</h1>
    
              <button id="show_menu" 
                      className="header_button" 
                      onClick={props.openFullScreenMenu}>
                <svg viewBox="0 0 100 75" width="30" height="30">
                  <rect width="100" height="15"></rect>
                  <rect y="30" width="100" height="15"></rect>
                  <rect y="60" width="100" height="15"></rect>
                </svg>
              </button>

            </div>
  
            <p>{translations.Local}</p>
  
            <p>{translations.Job}</p>
            
          </header>

}