import * as React from "react"
import { graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../lib/helpers"
import { mapEdgesToNodes } from "../lib/helpers"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import BlockContent from "../components/block-content"
import Project from "../components/project"

type DataProps = {
  pageData: {
    edges: {
      node: HomePageData
    }[]
  }
}

type HomePageData = {
  _rawLeadParagraph: PortableTextBlock
  heroBanner: SanityImage
  projects: Project[]
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  const pageData = mapEdgesToNodes<HomePageData>(data.pageData)[0]
  const leadBlocks = pageData._rawLeadParagraph
  const heroImageData = pageData.heroBanner?.asset?.gatsbyImageData
  const heroImageAlt = pageData.heroBanner?.alt
  const featuredProjects = pageData.projects

  return (
    <Layout>
      <h1>Home Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <BlockContent blocks={leadBlocks} />
      <Project.PreviewList projects={featuredProjects} />
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
            ...SanityMainImageCoreFragment
          }
          projects: featuredWork {
            id
            _rawBrief
            name
            slug {
              current
            }
            hero {
              title
              ...SanityMainImageCoreFragment
            }
            secondHero {
              secondHeroImage {
                title
                ...SanityMainImageCoreFragment
              }
            }
            images {
              alt
              title
              asset {
                _id
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
