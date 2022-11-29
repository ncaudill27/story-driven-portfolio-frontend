import * as React from "react"
import { graphql } from "gatsby"
import { getPageData } from "../lib/helpers"
import { ucfirst } from "../lib/string-utils"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"

import SEO from "../components/seo"
import Layout from "../containers/layout"
import BlockContent from "../components/block-content"
import Image from "../components/image"

type DataProps = SanityGQLData<ContactPageData>
type ContactPageData = {
  bio: PortableTextBlock
  contactImage: SanityImage
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
  const { contactImage } = getPageData(data.pageData)
  const seoImage = contactImage.asset.publicUrl
  const seoalt = contactImage.asset?.altText ?? ""
  console.log(seoImage)

  return <SEO title="Contact" imagePath={seoImage} imageAlt={seoalt} />
}
export default function ContactPage({ data }: PageProps<DataProps>) {
  const pageData = getPageData<ContactPageData>(data.pageData)
  const { bio, contactImage, contactPoints } = pageData

  return (
    <Layout>
      <h1>Contact Page</h1>
      <Image image={contactImage} />
      <BlockContent blocks={bio} />
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
          bio: _rawBio
          contactImage {
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
