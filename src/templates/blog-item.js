import React from "react";

export default ({data}) => {
  const post = data.markdownRemark;
  return (
    <div>
      <span>this is using the blog item template</span>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const postQuery = graphql`
  query BlogPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      frontmatter {
        path
        title
        template
      }
    }
  }
`