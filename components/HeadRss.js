import React, {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router'

// This component adds the RSS feeds links to the head, as I was unable to do it directly in the next/head component:
// - It uses the Effect Hook, which allow us to run some additional code after React has updated the DOM (https://reactjs.org/docs/hooks-effect.html).
export default function HeadRss(props) {
  const router = useRouter()
  const {locales} = router
  
  // Generate the RSS feed links recursively from the locales: 
  const rssList = locales.reduce((list, locale) => list += `<link rel="alternate" type="application/rss+xml" title="Blog - RSS feed (${locale})" href="/rss/blog-${locale}.xml"/>`, '')
  
  // Add the list do the head of the document:
  useEffect(() => {
    document.head.innerHTML += rssList;
  }, [])
  
  return null

}