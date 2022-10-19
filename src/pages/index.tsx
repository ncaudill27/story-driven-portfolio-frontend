import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { mapEdgesToNodes } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import BlockContent from "../components/block-content"
import ProjectList from "../components/project-list"
import HeroFullBleed from "../components/hero-full-bleed"
import Image from "../components/image"
import IntroCopyWrapper from "../components/intro-copy-wrapper"

type DataProps = SanityGQLData<HomePageData>
type HomePageData = {
  _rawLeadParagraph: PortableTextBlock
  heroBanner: SanityImage
  projects: IProject[]
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  const { _rawLeadParagraph, heroBanner, projects } =
    mapEdgesToNodes<HomePageData>(data.pageData)[0]
  const leadBlocks = _rawLeadParagraph
  const hero = heroBanner
  const featuredProjects = projects

  return (
    <Layout>
      <HeroFullBleed image={hero} />
      <IntroWrapper>
        <IntroCopyWrapper extraMargin={94}>
          <BlockContent blocks={leadBlocks} />
        </IntroCopyWrapper>
        <IntroImageWrapper>
          <Image image={hero} loading="eager" objectFit="contain" />
        </IntroImageWrapper>
      </IntroWrapper>
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
          _rawLeadParagraph
          heroBanner {
            ...SanityImageCoreFragment
          }
          projects: featuredWork {
            ...SanityProjectPreview
          }
        }
      }
    }
  }
`
