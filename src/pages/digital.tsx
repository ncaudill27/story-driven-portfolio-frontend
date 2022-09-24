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

type DataProps = SanityGQLData<IProject> & SanityGQLData<DigitlePageData>
type DigitlePageData = {
  intro: PortableTextBlock
  digitalHero: SanityImage
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  const projects = mapEdgesToNodes<IProject>(data.projects)
  const pageData = mapEdgesToNodes<DigitlePageData>(data.pageData)[0]
  const heroImageAlt = pageData.digitalHero.alt
  const heroImageData = pageData.digitalHero.asset.gatsbyImageData
  const intro = pageData.intro

  console.log(projects)

  return (
    <Layout>
      <h1>Digital Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <BlockContent blocks={intro} />
      <ProjectList projects={projects} />
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(pageData, null, 2)}</code>
      </pre>
    </Layout>
  )
}

export const query = graphql`
  query DigitalIndexPageData {
    pageData: allSanityCollectionPages {
      edges {
        node {
          intro: _rawDigitalIntro
          digitalHero {
            alt
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
    projects: allSanityProject(filter: { mediaType: { eq: "digital" } }) {
      edges {
        node {
          ...SanityProjectPreview
        }
      }
    }
  }
`
