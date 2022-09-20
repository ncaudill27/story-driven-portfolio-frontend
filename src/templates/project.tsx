import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { toPlainText } from "@portabletext/react"
import { mapEdgesToNodes } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import type { PortableTextBlock } from "@portabletext/types"
import type { PageDataProps } from "../lib/helpers"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlockContent from "../components/block-content"

type DataProps = PageDataProps<ProjectPageData>
type ProjectPageData = {
  _rawBrief: PortableTextBlock
  _rawIntro?: PortableTextBlock
  name: string
  hero: {
    alt: string
    title: string
    asset: {
      gatsbyImageData: IGatsbyImageData
      publicUrl: string
    }
  }
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, hero, _rawBrief } = mapEdgesToNodes<ProjectPageData>(
    data.pageData
  )[0]
  const description = toPlainText(_rawBrief)
  const seoImage = hero.asset.publicUrl
  const seoAlt = hero.alt
  console.log(description)

  return (
    <SEO
      title={name}
      description={description}
      imageAlt={seoAlt}
      imagePath={seoImage}
    />
  )
}

export default function ProjectTemplate({ data }: PageProps<DataProps>) {
  const { name, hero, _rawBrief } = mapEdgesToNodes<ProjectPageData>(
    data.pageData
  )[0]
  const heroImage = hero.asset.gatsbyImageData
  const heroAlt = hero.alt

  return (
    <Layout>
      <h1>{name}</h1>
      <GatsbyImage image={heroImage} alt={heroAlt} />
      <BlockContent blocks={_rawBrief} />
    </Layout>
  )
}
export const query = graphql`
  query ProjectTemplateData($id: String) {
    pageData: sanityProject(id: { eq: $id }) {
      _rawBrief
      _rawIntro
      name
      hero {
        alt
        title
        asset {
          gatsbyImageData
          publicUrl
        }
      }
    }
  }
`
