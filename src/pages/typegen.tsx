import * as React from "react"
import { graphql, PageProps } from "gatsby"

const TypegenPage = ({ data }: PageProps<Queries.TypegenPageQuery>) => {
  const d = data.projects.edges.map(({ node }) => node)

  return (
    <main>
      <p>Site title: TODO</p>
      <hr />
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(d, null, 2)}</code>
      </pre>
    </main>
  )
}

export default TypegenPage

export const query = graphql`
  query TypegenPage {
    site {
      siteMetadata {
        title
      }
    }
    pageData: allSanityHomePage {
      edges {
        node {
          _rawLeadParagraph
          heroBanner {
            asset {
              gatsbyImageData
            }
            crop {
              _key
              _type
              bottom
              left
              right
              top
            }
            hotspot {
              _key
              _type
              height
              width
              x
              y
            }
          }
          projects: featuredWork {
            _rawBrief
            name
            slug {
              current
            }
            hero {
              asset {
                gatsbyImageData
              }
              crop {
                _key
                _type
                bottom
                left
                right
                top
              }
              hotspot {
                _key
                _type
                height
                width
                x
                y
              }
              title
              alt
            }
            secondHero {
              secondHeroImage {
                title
                alt
                asset {
                  gatsbyImageData
                }
                crop {
                  _key
                  _type
                  bottom
                  left
                  right
                  top
                }
                hotspot {
                  _key
                  _type
                  height
                  width
                  x
                  y
                }
              }
            }
            images {
              asset {
                gatsbyImageData
              }
              crop {
                _key
                _type
                bottom
                left
                right
                top
              }
              hotspot {
                _key
                _type
                height
                width
                x
                y
              }
            }
          }
        }
      }
    }

    projects: allSanityProject(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          id
          name
          mediaType
          _rawBrief
          _rawIntro
          _rawSubject
          slug {
            current
          }
          hero {
            alt
            title
            asset {
              _id
              gatsbyImageData
            }
            crop {
              _key
              _type
              bottom
              left
              right
              top
            }
            hotspot {
              _key
              _type
              height
              width
              x
              y
            }
          }
          elements {
            name
            _rawDescription
          }
          images {
            alt
            title
            asset {
              _id
              gatsbyImageData
            }
            crop {
              _key
              _type
              bottom
              left
              right
              top
            }
            hotspot {
              _key
              _type
              height
              width
              x
              y
            }
          }
        }
      }
    }
  }
`
