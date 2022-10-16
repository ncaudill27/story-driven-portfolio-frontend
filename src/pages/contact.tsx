import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { mapEdgesToNodes } from "../lib/helpers"
import { ucfirst } from "../lib/string-utils"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import BlockContent from "../components/block-content"

type DataProps = SanityGQLData<ContactPageData>
type ContactPageData = {
  _rawBio: PortableTextBlock
  brettPortrait: SanityImage
  contactPoints: {
    [index: string]: string
    email: string
    facebook: string
    instagram: string
    phone: string
    twitter: string
  }
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { brettPortrait } = mapEdgesToNodes(data.pageData)[0]
  const seoImage = brettPortrait.asset.publicUrl
  const seoalt = brettPortrait.asset?.altText ?? ""
  console.log(seoImage)

  return <SEO title="Contact" imagePath={seoImage} imageAlt={seoalt} />
}
export default function ContactPage({ data }: PageProps<DataProps>) {
  const pageData = mapEdgesToNodes<ContactPageData>(data.pageData)[0]
  const leadBlocks = pageData._rawBio
  const heroImageData = pageData.brettPortrait.asset?.gatsbyImageData
  const heroImageAlt = pageData.brettPortrait.asset?.altText ?? ""
  const contactPoints = pageData.contactPoints

  return (
    <Layout>
      <h1>Contact Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <BlockContent blocks={leadBlocks} />
      <>
        {Object.keys(contactPoints).map(key => {
          return (
            <div>
              {ucfirst(key)}: {contactPoints[key]}
            </div>
          )
        })}
      </>
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(pageData, null, 2)}</code>
      </pre>
    </Layout>
  )
}

export const query = graphql`
  query ContactPageData {
    pageData: allSanityContactPage {
      edges {
        node {
          _rawBio
          brettPortrait {
            ...SanityImageCoreFragment
          }
          contactPoints {
            email
            facebook
            instagram
            phone
            twitter
          }
        }
      }
    }
  }
`
