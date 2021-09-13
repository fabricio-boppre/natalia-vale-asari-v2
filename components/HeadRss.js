import React, {useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

// This component adds the RSS feeds links to the head:
// - We do this in a separate component because at _app.js we don't have access to the `router` object, which is convenient to generate our different feeds (one for each language);
// - It uses the Effect Hook, which allow us to run some additional code after React has updated the DOM (https://reactjs.org/docs/hooks-effect.html).
export default function HeadRss(props) {
  const router = useRouter()
  const {locales} = router
  
  // Generate the RSS feed links recursively from the locales: 
  const rssList = locales.reduce((list, locale) => list += `<link rel="alternate" type="application/rss+xml" title="Dr Natalia Vale Asari - Blog (${locale})" href="https://www.nataliavaleasari.net/rss/blog-${locale}.xml"/>`, '')
  
  // Add the list do the head of the document:
  useEffect(() => {
    document.head.innerHTML += rssList
  }, [])
  
  return null

}