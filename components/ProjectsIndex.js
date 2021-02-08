import Image from 'next/image'
import Link from 'next/link'
import styles from './ProjectsIndex.module.css'

export default function ProjectsIndex(props) {
	return <div id={styles.projects_index}>
            <ul>
              {props.projectsData.map(({ id, title, indexImage, summary, click }) => {
                
                if (click == 'default') 
                  return <li key={id}>
                            <Link href={"/projects/" + id} >
                              <a>
                                <img src={"/img/content/" + indexImage} alt={title} title={title} />
                                <div className={styles.text}>
                                  <h3>{title}</h3>
                                  {summary}
                                </div>
                              </a>
                            </Link>
                         </li>
              
                else if (click == 'none')
                    return <li key={id}>
                              <img src={"/img/" + indexImage} alt={title} title={title} />
                              <div className={styles.text}>
                                <h3>{title}</h3>
                                {summary}
                              </div>
                           </li>

                else 
                  return <li key={id}>
                            <Link href={click} >
                              <a>
                                <img src={"/img/" + indexImage} alt={title} title={title} />
                                <div className={styles.text}>
                                  <h3>{title}</h3>
                                  {summary}
                                </div>
                              </a>
                            </Link>
                         </li>
              
              })}
            </ul>
      	 </div>
}
