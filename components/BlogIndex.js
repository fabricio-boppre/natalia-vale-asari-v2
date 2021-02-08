import Image from 'next/image'
import Link from 'next/link'
import PostInfo from '../components/PostInfo.js';
import styles from './BlogIndex.module.css'
import * as translationsLibrary from "../lib/translationsLibrary.js"

export default function BlogIndex(props) {
	return <div id={styles.blog_index}>
            <ul>
              {props.blogData.map(({ id, title, indexImage, date, tags }) => {
                  return <li key={id}>
                            <div className={styles.image}>
                              <Link href={"/blog/" + id} >
                                <a>
                                  <img src={"/img/content/" + indexImage} alt={title} title={title} />
                                </a>
                              </Link>
                            </div>
                            <div className={styles.text}>
                              <h3>
                                    <Link href={"/blog/" + id} >
                                      <a>{title}</a>
                                    </Link>
                              </h3>
                              <PostInfo date={date}
                                           tags={tags} />    
                            </div>
                         </li>
              })}
            </ul>
      	 </div>
}
