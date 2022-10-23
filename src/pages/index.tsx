import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { getPageData } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import ProjectList from "../components/project-list"
import HeroFullBleed from "../components/hero-full-bleed"
import Intro from "../components/intro"

type DataProps = SanityGQLData<HomePageData>
type HomePageData = {
  leadBlocks: PortableTextBlock
  hero: SanityImage
  featuredProjects: IProject[]
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  const pageData = getPageData<HomePageData>(data.pageData)
  const { leadBlocks, hero, featuredProjects } = pageData

  return (
    <Layout>
      <HeroFullBleed image={hero} />
      <Intro blocks={leadBlocks} image={hero} />
      <ProjectList projects={featuredProjects} />
    </Layout>
  )
}

const IntroWrapper = styled.div`
  margin-top: 180px;
  padding-inline: 120px; /* TODO find fliud value that maxes at 120px */

  display: flex;
  justify-content: center;
  isolation: isolate;
`

const IntroImageWrapper = styled.div`
  margin-left: -90px;
  width: 750px;
`

export const query = graphql`
  query IndexPageData {
    pageData: allSanityHomePage {
      edges {
        node {
          leadBlocks: _rawLeadParagraph
          hero: heroBanner {
            ...SanityImageCoreFragment
          }
          featuredProjects: featuredWork {
            ...SanityProjectPreview
          }
        }
      }
    }
  }
`
