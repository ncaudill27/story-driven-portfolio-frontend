import * as React from "react"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"
import type { IProject } from "../types/project"
import type { IGatsbyImageData } from "gatsby-plugin-image"

import BlockContent from "./block-content"
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../lib/string-utils"

type PreviewListProps = { projects: IProject[] }

type ProjectPreviewProps = {
  name: string
  slug: string
  briefBlocks: PortableTextBlock
  heroAltText: string
  heroImageData: IGatsbyImageData
  secondHeroAltText: string
  secondHeroImageData: IGatsbyImageData
  images: SanityImage[]
}

export default function PreviewList({ projects }: PreviewListProps) {
  // TODO generate different components:
  // Fullbleed
  // Double Hero
  return (
    <>
      {projects.map(({ id, name, brief, images }) => {
        const slug = slugify(name)
        const hero = images[0]
        const secondHero = images[1]
        const heroAltText = hero.asset?.altText ?? ""
        const heroImageData = hero.asset?.gatsbyImageData ?? ""
        const secondHeroAltText = secondHero.asset?.altText ?? ""
        const secondHeroImageData = secondHero.asset?.gatsbyImageData ?? ""

        // TODO determine what flags to generate for differing compositions
        // doubleHero
        // extra images

        return (
          <ProjectPreview
            key={id}
            briefBlocks={brief}
            name={name}
            slug={slug}
            heroAltText={heroAltText}
            heroImageData={heroImageData}
            secondHeroAltText={secondHeroAltText}
            secondHeroImageData={secondHeroImageData}
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
  images,
  briefBlocks,
  heroAltText,
  heroImageData,
  secondHeroAltText,
  secondHeroImageData,
}: ProjectPreviewProps) {
  return (
    <div>
      <div>{name}</div>
      <div>{slug}</div>
      <BlockContent blocks={briefBlocks} />
      <GatsbyImage alt={heroAltText} image={heroImageData} />
      <GatsbyImage alt={secondHeroAltText} image={secondHeroImageData} />
      {images.map(i => {
        const key = i.asset._id
        const alt = i.asset?.altText ?? ""
        const image = i?.asset?.gatsbyImageData

        return <GatsbyImage key={key} alt={alt} image={image} />
      })}
    </div>
  )
}
