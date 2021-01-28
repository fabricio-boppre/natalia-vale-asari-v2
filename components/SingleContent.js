import styles from './SingleContent.module.css'

export default function SingleContent(props) {
	return <div id={styles.single_content}>

            <h2>{props.projectTitle}</h2>
            
            <div dangerouslySetInnerHTML={{ __html: props.projectContentHtml }} />

      	 </div>
}
