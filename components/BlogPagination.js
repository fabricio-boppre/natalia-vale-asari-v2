import Link from 'next/link'
import styles from './BlogPagination.module.css'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function BlogPagination(props) {
  // Create the links for the previous and the next page, when they are necessary:
  var showPrevious
	if (props.currentPage > 1) {
    showPrevious = <Link href={"/blog/show/" + props.indexTag + "/" + (+props.currentPage-1)} >&#60;&#60;</Link>
  } 
  var showNext
	if (props.currentPage < props.pagination.pagesCount) {
    showNext = <Link href={"/blog/show/" + props.indexTag + "/" + (+props.currentPage+1)} >&#62;&#62;</Link>
  } 
  // Some information:
  const info = props.currentPage + " / " + props.pagination.pagesCount

  return <div id={styles.blog_pagination}> 
            <div id="previous">{showPrevious}</div>
            <div id="info">{info}</div>
            <div id="next">{showNext}</div>
         </div>
}
