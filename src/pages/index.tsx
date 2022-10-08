import * as React from "react"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import BlockContent from "../components/block-content"
import ProjectList from "../components/project-list"

type DataProps = SanityGQLData<HomePageData>
type HomePageData = {
  _rawLeadParagraph: PortableTextBlock
  heroBanner: SanityImage
  projects: IProject[]
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  const pageData = mapEdgesToNodes<HomePageData>(data.pageData)[0]
  const leadBlocks = pageData._rawLeadParagraph
  const heroImageData = pageData.heroBanner?.asset?.gatsbyImageData
  const heroImageAlt = pageData.heroBanner?.asset?.altText
  const featuredProjects = pageData.projects

  return (
    <Layout>
      <h1>Home Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <BlockContent blocks={leadBlocks} />
      <ProjectList projects={featuredProjects} />
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
            ...SanityProjectPreview
          }
        }
      }
    }
  }
`
