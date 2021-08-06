const fs = require('fs')
const path = require('path')

async function generateSiteMap() {

	// The languages we want to include in the sitemap:
	const locales = ['en', 'pt']

	// The array where we will accumulate the URNs to be included in the sitemap:
	var locations

	// First let's add the home URN (which is also the projects index) for each language:
	locations = locales 

	// Then we add the blog index URN for each language:
	const blogIndex = locales.map(locale => {
		return locale + '/blog'
	}) 
	locations = locations.concat(blogIndex)
	
	// Now let's create the posts URNs for each language and add them to our locations.
	// First we create a function to get all the posts URNs for a given language: 
	function getAllPostURNs(locale) {
		const blogDirectory = path.join(process.cwd(), 'content/blog')
	  var files = fs.readdirSync(blogDirectory + "/" + locale)
		ids = files.filter((file) => file.includes(".md"))
		urns = ids.map((id) => locale + "/blog/" + id.replace(/\.md$/, ""))
		return urns
	}
	// Then we map this functions with our locales: 
	const blogPosts = locales.map((locale) => getAllPostURNs(locale)).flat()
	locations = locations.concat(blogPosts)

	// Now let's create the projects URNs for each language and add them to our locations.
	// First we create a function to get all the projects URNs for a given language: 
	function getAllProjectURNs(locale) {
		const projectsDirectory = path.join(process.cwd(), 'content/projects')
	  var files = fs.readdirSync(projectsDirectory + "/" + locale)
		ids = files.filter((file) => file.includes(".md"))
		urns = ids.map((id) => locale + "/projects/" + id.replace(/\.md$/, ""))
		return urns
	}
	// Then we map this functions with our locales: 
	const projects = locales.map((locale) => getAllProjectURNs(locale)).flat()
	locations = locations.concat(projects)
	
	// Finally, we generate the sitemap file:
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
							      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
							          ${locations
							            .map(location => {
							              return `
							                      <url>
							                          <loc>${`https://www.nataliavaleasari.net/${location}`}</loc>
							                      </url>
							                  `
							            })
							            .join('')}
							      </urlset>`
  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()