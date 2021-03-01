import Link from 'next/link'
import styles from './PostInfo.module.css'

export default function PostInfo(props) {
	return <span id={styles.project_info}>
               {props.date}
               &nbsp;|&nbsp; 
               {props.tags.map(({ id, tag }) => {
                 return <Link href={"/blog/show/" + id} key={id} >
                          <a>{tag}</a>
                        </Link>
                 }).reduce((prev, curr) => [prev, ', ', curr])}
             </span>

}
