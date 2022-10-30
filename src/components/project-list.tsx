import * as React from "react"
import styled from "styled-components"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"
import type { IProject } from "../types/project"

import { slugify } from "../lib/string-utils"
import { useImages } from "../hooks/use-images"
import { usePath } from "../hooks/use-path"
import Image from "./image"
import IntroCopy from "./intro-copy-wrapper"
import HeroFullBleed from "./hero-full-bleed"
import CTALink from "./call-to-action"
import Right from "../images/svg/chevron-right.svg"
import Title from "./heading"
import { ModalContext } from "../containers/layout"

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
        const { hero, previewImages } = useImages(images)

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
            images={previewImages}
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
  const [firstPreview, secondPreview] = images
  const { setModal } = React.useContext(ModalContext)

  return (
    <PreviewWrapper>
      <Title view="preview">{name}</Title>
      <HeroFullBleed image={hero} />
      <PreviewBriefWrapper>
        <IntroCopy blocks={briefBlocks} />
        <IntroLinkWrapper>
          <CTALink to={path} variant="ghost">
            <Flex>
              See shoot
              <Right style={{ marginTop: 3.5 }} />
            </Flex>
          </CTALink>
          <button onClick={() => setModal(name)}>View as gallery</button>
        </IntroLinkWrapper>
      </PreviewBriefWrapper>
      <BriefImageWrapper>
        <FirstPreviewImageWrapper>
          <Image image={firstPreview} />
        </FirstPreviewImageWrapper>
        <SecondPreviewImageWrapper>
          <Image image={secondPreview} />
        </SecondPreviewImageWrapper>
      </BriefImageWrapper>
    </PreviewWrapper>
  )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const BriefImageWrapper = styled.div`
  --padding-inline: 120px;
  padding-left: calc(var(--padding-inline) + 56px);
  padding-right: calc(var(--padding-inline) - 80px);

  display: flex;
  justify-content: space-between;
  gap: 185px;
`

const FirstPreviewImageWrapper = styled.div`
  margin-top: -24px;
  width: 504px;
`
const SecondPreviewImageWrapper = styled.div`
  margin-top: 152px;
  width: 472px;
  height: 609px;
`

const PreviewWrapper = styled.div`
  margin-top: 180px;
  color: inherit;
  text-decoration: none;
`

const PreviewBriefWrapper = styled.div`
  margin-top: 120px;
  padding-left: 120px;
  padding-right: max(16px, 33vw - 954px / 3);

  display: flex;
  justify-content: space-between;
  gap: 40px;

  font-size: ${32 / 16}rem;
`

const IntroLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`
