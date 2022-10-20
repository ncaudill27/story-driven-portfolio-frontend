import * as React from "react"
import { graphql } from "gatsby"
import { getPageData, mapEdgesToNodes } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import BlockContent from "../components/block-content"
import ProjectList from "../components/project-list"
import HeroFullBleed from "../components/hero-full-bleed"

type DataProps = SanityGQLData<IProject> & SanityGQLData<DigitalPageData>
type DigitalPageData = {
  intro: PortableTextBlock
  hero: SanityImage
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function DigitalPage({ data }: PageProps<DataProps>) {
  const { intro, hero } = getPageData<DigitalPageData>(data.pageData)
  const projects = mapEdgesToNodes<IProject>(data.projects)

  return (
    <Layout>
      <h1>Film Page</h1>
      <HeroFullBleed image={hero} />
      <BlockContent blocks={intro} />
      <ProjectList projects={projects} />
    </Layout>
  )
}

export const query = graphql`
  query DigitalIndexPageData {
    pageData: allSanityProject(filter: { mediaType: { eq: "digital" } }) {
      edges {
        node {
          intro: _rawIntro
          hero {
            ...SanityImageCoreFragment
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
