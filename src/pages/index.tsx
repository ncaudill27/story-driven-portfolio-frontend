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
import { GatsbyImage } from "gatsby-plugin-image"
import BlockContent from "../components/block-content"
import ProjectList from "../components/project-list"
import HeroFullBleed from "../components/hero-full-bleed"

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
  const { asset: heroAsset } = pageData.heroBanner
  const {
    altText: heroAlt,
    gatsbyImageData: heroImageData,
    metadata: { dimensions },
  } = heroAsset
  const featuredProjects = pageData.projects

  return (
    <Layout>
      <HeroFullBleed
        alt={heroAlt ?? ""}
        imageData={heroImageData}
        dimensions={dimensions}
      />
      <IntroWrapper>
        <IntroCopyWrapper>
          <BlockContent blocks={leadBlocks} />
        </IntroCopyWrapper>
        <IntroImageWrapper>
          <GatsbyImage
            alt={heroAlt ?? ""}
            image={heroImageData}
            loading="eager"
            objectFit="contain"
          />
        </IntroImageWrapper>
      </IntroWrapper>
      <ProjectList projects={featuredProjects} />
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(pageData, null, 2)}</code>
      </pre>
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

const IntroCopyWrapper = styled.div`
  max-width: 705px;
  margin-top: 94px;

  font-size: 32px;
  z-index: 1;
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
