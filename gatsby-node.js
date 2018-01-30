const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
      graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                  slug
                }
              frontmatter {
                title
                template
                path
              }
            }
          }
        }
      }
      `
  ).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if(node.frontmatter.template != null ){
            template = node.frontmatter.template;
          } else {
            template = "page";
          }

          const title = node.frontmatter.title.toLowerCase().replace(" ", "_");

          if(node.id.includes("blog")){
            if(node.frontmatter.path) {
              urlPath = "blog/" + node.frontmatter.path;
            } else {
              urlPath = "blog/" + title
            }
          } else {
            if(node.frontmatter.path) {
              urlPath = node.frontmatter.path;
            } else {
              urlpath = title;
            }
          }

          createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/' + template + '.js'),
          context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug,
            },
          })
        })
        resolve()
      })
    })
  }