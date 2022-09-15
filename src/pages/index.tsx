import * as React from "react"
import { graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import { PortableText } from "@portabletext/react"
import { GatsbyImage } from "gatsby-plugin-image"

type IndexPageData = Queries.IndexPageDataQuery["pageData"]["edges"][0]["node"]
// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({
  data,
}: PageProps<Queries.TypegenPageQuery>) {
  const pageData = mapEdgesToNodes<IndexPageData>(data?.pageData)[0]
  const lead = pageData._rawLeadParagraph
  const heroImageData = pageData.heroBanner?.asset?.gatsbyImageData
  const heroImageAlt = pageData.heroBanner?.asset?.alt
  const featuredProjects = pageData.projects
  return (
    <Layout>
      <h1>Home Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <PortableText value={lead} />
      {featuredProjects?.map(p => (
        <>
          <div>{p.name}</div>
          <div>{p?.slug?.current}</div>
          <GatsbyImage
            alt={p.hero.alt}
            image={p?.hero?.asset?.gatsbyImageData}
          />
          <GatsbyImage
            alt={p?.secondHero?.secondHeroImage?.alt}
            image={p?.secondHero?.secondHeroImage?.asset?.gatsbyImageData}
          />
          {p?.images?.map(i => (
            <GatsbyImage alt={i.alt} image={i?.asset?.gatsbyImageData} />
          ))}
        </>
      ))}
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(pageData, null, 2)}</code>
      </pre>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageData {
    pageData: allSanityHomePage {
      edges {
        node {
          _rawLeadParagraph
          heroBanner {
            alt
            title
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
              alt
              title
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
  }
`
