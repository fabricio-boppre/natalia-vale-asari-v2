import Link from 'next/link'
import {useRouter} from 'next/router'

export default function LanguagesList() {
  const router = useRouter()
  const {locales, locale} = router
  const localesList = 
          locales.map((localeMapped,key) => 
                <li key={key}>
                  <Link href="/" 
                        locale={localeMapped}>
                     <a className={locale === localeMapped ? 'active' : ''}>{localeMapped}</a>
                  </Link>
                </li>
              )
                
  return <ul id="lang_list">
           {localesList}
         </ul>
}