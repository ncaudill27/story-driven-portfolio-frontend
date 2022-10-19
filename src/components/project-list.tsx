import * as React from "react"
import styled from "styled-components"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"
import type { IProject } from "../types/project"

import BlockContent from "./block-content"
import { slugify } from "../lib/string-utils"
import { Link } from "gatsby"
import { useImages } from "../hooks/use-images"
import { usePath } from "../hooks/use-path"
import Image from "./image"

type PreviewListProps = { projects: IProject[] }

type ProjectPreviewProps = {
  name: string
  path: string
  section: string
  briefBlocks: PortableTextBlock
  hero: SanityImage
  images: SanityImage[]
}

export default function PreviewList({ projects }: PreviewListProps) {
  // TODO generate different components:
  // Fullbleed
  // Double Hero
  return (
    <>
      {projects.map(({ id, name, brief, mediaType, images = [] }) => {
        const slug = slugify(name)
        const path = usePath(mediaType, slug)
        const { hero, briefImages } = useImages(images)

        // TODO determine what flags to generate for differing compositions
        // doubleHero
        // extra images

        return (
          <ProjectPreview
            key={id}
            briefBlocks={brief}
            name={name}
            section={mediaType}
            path={path}
            hero={hero}
            images={briefImages}
          />
        )
      })}
    </>
  )
}

function ProjectPreview({
  name,
  hero,
  path,
  images,
  briefBlocks,
}: ProjectPreviewProps) {
  return (
    <PreviewWrapper to={path}>
      <Title>{name}</Title>
      <Image image={hero} />
      <PreviewBriefWrapper>
        <BlockContent blocks={briefBlocks} />
      </PreviewBriefWrapper>
      {images.map(i => {
        const key = i.asset?._id

        return <Image key={key} image={i} />
      })}
    </PreviewWrapper>
  )
}

const PreviewWrapper = styled(Link)`
  display: block;
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
