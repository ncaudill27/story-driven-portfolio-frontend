import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlockContent from "../components/block-content"

type DataProps = {
  pageData: IProject
  projects: IProject[]
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, hero, _rawBrief } = data.pageData
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

export default function ProjectTemplate({
  data,
  pageContext,
}: PageProps<DataProps, { section: string }>) {
  console.log(pageContext)

  const { section } = pageContext
  return (
    <Layout>
      <h1>{section ?? "Fuck"}</h1>
    </Layout>
  )
}
export const query = graphql`
  query SectionTemplateData($id: String!) {
    pageData: sanityProject(id: { eq: $id }) {
      name
      mediaType
      _rawBrief
      _rawIntro
      _rawSubject
      elements {
        name
        _rawDescription
      }
      hero {
        alt
        asset {
          gatsbyImageData
        }
      }
      secondHero {
        secondHeroImage {
          ...SanityMainImageCoreFragment
        }
      }
      images {
        ...SanityMainImageCoreFragment
      }
    }
  }
`
