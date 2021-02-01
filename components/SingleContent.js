import styles from './SingleContent.module.css'

export default function SingleContent(props) {
	return <div id={styles.single_content}>
           <div dangerouslySetInnerHTML={{ __html: props.ContentHtml }} />
      	 </div>
}
