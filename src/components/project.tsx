import * as React from "react"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../lib/helpers"
import type { SecondHero, IProject } from "../types/project"

import BlockContent from "../components/block-content"
import { GatsbyImage } from "gatsby-plugin-image"

type PreviewListProps = { projects: IProject[] }

type ProjectProps = {
  briefBlocks: PortableTextBlock
  name: string
  slug: string
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
}

type ProjectComponent = React.FunctionComponent<ProjectProps> & {
  PreviewList: PreviewListComponent
}

type PreviewListComponent = React.FunctionComponent<PreviewListProps>

const Project: ProjectComponent = ({
  briefBlocks,
  name,
  slug,
  hero,
  secondHero,
  images,
}) => {
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
        // TODO derive image lists for story/gallery/grid views
        const key = i.asset._id
        const alt = i.alt
        const image = i?.asset?.gatsbyImageData

        return <>{image && <GatsbyImage key={key} alt={alt} image={image} />}</>
      })}
    </div>
  )
}

Project.PreviewList = ({ projects }) => {
  return (
    <>
      {projects.map(p => {
        return (
          <Project
            key={p.id}
            briefBlocks={p._rawBrief}
            name={p.name}
            slug={p?.slug?.current ?? ""}
            hero={p.hero}
            secondHero={p.secondHero}
            images={p.images}
          />
        )
      })}
    </>
  )
}
export default Project
