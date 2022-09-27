import * as React from "react"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"
import type { SecondHero, IProject } from "../types/project"

import BlockContent from "./block-content"
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../lib/string-utils"

type PreviewListProps = { projects: IProject[] }

type ProjectProps = {
  name: string
  slug: string
  briefBlocks: PortableTextBlock
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
}

export default function PreviewList({ projects }: PreviewListProps) {
  // TODO generate different components:
  // Fullbleed
  // Double Hero
  return (
    <>
      {projects.map(({ id, name, brief, hero, secondHero, images }) => {
        const slug = slugify(name)

        // TODO determine what flags to generate for differing compositions
        // doubleHero
        // extra images

        return (
          <ProjectPreview
            key={id}
            briefBlocks={brief}
            name={name}
            slug={slug}
            hero={hero}
            secondHero={secondHero}
            images={images}
          />
        )
      })}
    </>
  )
}

function ProjectPreview({
  briefBlocks,
  name,
  slug,
  hero,
  secondHero,
  images,
}: ProjectProps) {
  return (
    <div>
      <div>{name}</div>
      <div>{slug}</div>
      <BlockContent blocks={briefBlocks} />
      <GatsbyImage alt={hero.alt} image={hero?.asset?.gatsbyImageData} />
      {secondHero && (
        <GatsbyImage
          alt={secondHero.secondHeroImage.alt}
          image={secondHero.secondHeroImage.asset?.gatsbyImageData}
        />
      )}
      {images.map(i => {
        const key = i.asset._id
        const alt = i.alt
        const image = i?.asset?.gatsbyImageData

        return <>{image && <GatsbyImage key={key} alt={alt} image={image} />}</>
      })}
    </div>
  )
}
