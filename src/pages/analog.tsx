import * as React from "react"
import { graphql } from "gatsby"
import { getPageData, mapEdgesToNodes } from "../lib/helpers"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage, SanityGQLData } from "../types/sanity"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import CollectionPage from "../components/collection"

type DataProps = SanityGQLData<IProject> & SanityGQLData<AnalogPageData>
type AnalogPageData = {
  intro: PortableTextBlock
  hero: SanityImage
}

// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function AnalogPage({ data }: PageProps<DataProps>) {
  const { intro, hero } = getPageData<AnalogPageData>(data.pageData)
  const projects = mapEdgesToNodes<IProject>(data.projects)

  return <CollectionPage hero={hero} intro={intro} projects={projects} />
}

export const query = graphql`
  query AnalogIndexPageData {
    pageData: allSanityAnalogPage {
      edges {
        node {
          intro: _rawIntro
          hero {
            ...SanityImageCoreFragment
          }
        }
      }
    }
    projects: allSanityProject(filter: { mediaType: { eq: "analog" } }) {
      edges {
        node {
          ...SanityProjectPreview
        }
      }
    }
  }
`
