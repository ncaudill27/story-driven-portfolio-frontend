import * as React from "react"
import styled from "styled-components"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"
import type { IProject } from "../types/project"
import type { IGatsbyImageData } from "gatsby-plugin-image"

import BlockContent from "./block-content"
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../lib/string-utils"
import { Link } from "gatsby"

type PreviewListProps = { projects: IProject[] }

type ProjectPreviewProps = {
  name: string
  slug: string
  section: string
  briefBlocks: PortableTextBlock
  heroAltText: string
  heroImageData: IGatsbyImageData
  images: SanityImage[]
}

export default function PreviewList({ projects }: PreviewListProps) {
  // TODO generate different components:
  // Fullbleed
  // Double Hero
  return (
    <>
      {projects.map(({ id, name, brief, mediaType, images }) => {
        const slug = slugify(name)
        const hero = images[0]
        const heroAltText = hero.asset?.altText ?? ""
        const heroImageData = hero.asset?.gatsbyImageData ?? ""

        // TODO determine what flags to generate for differing compositions
        // doubleHero
        // extra images

        return (
          <ProjectPreview
            key={id}
            briefBlocks={brief}
            name={name}
            section={mediaType}
            slug={slug}
            heroAltText={heroAltText}
            heroImageData={heroImageData}
            images={images}
          />
        )
      })}
    </>
  )
}

function ProjectPreview({
  name,
  slug,
  section,
  images,
  briefBlocks,
  heroAltText,
  heroImageData,
}: ProjectPreviewProps) {
  const path = `/${section}/${slug}/`

  return (
    <PreviewWrapper to={path}>
      <Title>{name}</Title>
      <GatsbyImage alt={heroAltText} image={heroImageData} />
      {images.map(({ asset }) => {
        const key = asset._id
        const alt = asset?.altText ?? ""
        const image = asset?.gatsbyImageData

        return <GatsbyImage key={key} alt={alt} image={image} />
      })}
      <PreviewBriefWrapper>
        <BlockContent blocks={briefBlocks} />
      </PreviewBriefWrapper>
    </PreviewWrapper>
  )
}

const PreviewWrapper = styled(Link)`
  margin-top: 180px;
  color: inherit;
  text-decoration: none;
`

const Title = styled.h2`
  font-size: ${92 / 16}rem;
  text-align: center;
  margin-bottom: 80px;
`

const PreviewBriefWrapper = styled.div`
  margin-top: 120px;
  padding-inline: 120px; /* TODO find fliud value that maxes at 120px */
  font-size: ${32 / 16}rem;
`
