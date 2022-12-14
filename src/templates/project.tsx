import * as React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlockContent from "../components/block-content"
import Image from "../components/image"
import { useImages } from "../hooks/use-images"
import ElementSection from "../components/element"
import CTALink from "../components/call-to-action"
import Title from "../components/heading"

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
  const { name, intro, subject, elements, images } = data.pageData
  const { hero, subjectImage, elementImages } = useImages(images)

  console.log(elements)

  return (
    <Layout>
      <HeroSectionWrapper>
        <HeroCopyWrapper>
          <Title view="project">{name}</Title>
          <BlockContent blocks={intro} />
        </HeroCopyWrapper>
        <HeroImageWrapper>
          <Image image={hero} />
        </HeroImageWrapper>
      </HeroSectionWrapper>
      <SubjectSectionWrapper>
        <SubjectImageWrapper>
          <Image image={subjectImage} />
        </SubjectImageWrapper>
        <SubjectCopyWrapper>
          <BlockContent blocks={subject} />
          <div>
            <CTALink to="contact" variant="fill">
              Book your next shoot
            </CTALink>
            <CTALink to="contact" variant="ghost">
              View as gallery
            </CTALink>
          </div>
        </SubjectCopyWrapper>
      </SubjectSectionWrapper>
      <>
        {elements.map((e, i) => (
          <ElementSection element={e} index={i} image={elementImages[i]} />
        ))}
      </>
    </Layout>
  )
}

const HeroSectionWrapper = styled.div`
  margin-top: 180px;
  padding-left: 120px;
  padding-right: 132px;
  display: flex;
  justify-content: center;

  isolation: isolate;
`

const HeroCopyWrapper = styled.div`
  margin-top: 80px;
  max-width: 583px;
  margin-right: -5vw;

  z-index: 1;
`

const HeroImageWrapper = styled.div`
  max-width: 720px;
`

const SubjectSectionWrapper = styled.div`
  margin-top: 180px;
  padding-left: 40px;
  padding-right: 120px;

  display: flex;
  justify-content: space-between;
  gap: 66px;
`

const SubjectImageWrapper = styled.div`
  margin-top: 32px;
`

const SubjectCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
