import * as React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlockContent from "../components/block-content"
import { GatsbyImage } from "gatsby-plugin-image"
import Image from "../components/image"
import { useImages } from "../hooks/use-images"

type DataProps = {
  pageData: IProject
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, images, brief } = data.pageData
  const { hero } = useImages(images)
  const description = toPlainText(brief)
  const seoImage = hero.asset.publicUrl
  const seoAlt = hero.asset?.altText ?? ""

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
  console.log(data.pageData)
  const { name, intro, subject, elements, images } = data.pageData
  const { hero, subjectImage, elementImages } = useImages(images)

  return (
    <Layout>
      <HeroSectionWrapper>
        <HeroCopyWrapper>
          <Title>{name}</Title>
          <BlockContent blocks={intro} />
        </HeroCopyWrapper>
        <HeroImageWrapper>
          <Image image={hero} />
        </HeroImageWrapper>
      </HeroSectionWrapper>
      <BlockContent blocks={subject} />

      <>
        {elements.map((e, i) => {
          const name = e.name
          const description = e.description
          const {
            altText: imageAltText,
            gatsbyImageData: imageGatsbyImageData,
          } = elementImages[i].asset

          return (
            <>
              <h2>{name}</h2>
              <BlockContent blocks={description} />
              <GatsbyImage
                alt={imageAltText ?? ""}
                image={imageGatsbyImageData}
              />
            </>
          )
        })}
      </>
    </Layout>
  )
}

const HeroSectionWrapper = styled.div`
  margin-top: 180px;
  padding-left: 120px;
  padding-right: 132px;
  display: flex;
  justify-content: space-between;
`

const HeroCopyWrapper = styled.div`
  margin-top: 80px;
  max-width: 583px;
`

const Title = styled.h1`
  font-size: ${92 / 16}rem;
`

const HeroImageWrapper = styled.div`
  width: 720px;
  height: 810px;
`

export const query = graphql`
  query ProjectTemplateData($id: String!) {
    pageData: sanityProject(id: { eq: $id }) {
      name
      mediaType
      brief: _rawBrief
      intro: _rawIntro
      subject: _rawSubject
      elements {
        name
        description: _rawDescription
      }
      images {
        ...SanityImageCoreFragment
      }
    }
  }
`
