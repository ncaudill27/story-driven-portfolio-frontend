import { graphql, useStaticQuery } from "gatsby"

export type SEOMetadata = {
  title: string
  description: string
  pathname: string
  imagePath: string
  imageAlt: string
  siteUrl: string
}

export function useSiteMetadata(): SEOMetadata {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          imagePath
          imageAlt
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}
