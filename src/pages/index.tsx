import * as React from "react"
import { graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../lib/helpers"
import { mapEdgesToNodes } from "../lib/helpers"

import SEO from "../components/seo"
import Layout from "../containers/layout"

import { GatsbyImage } from "gatsby-plugin-image"
import BlockContent from "../components/block-content"

type DataProps = {
  pageData: {
    edges: {
      node: HomePageData
    }[]
  }
}

type ProjectProps = {
  briefBlocks: PortableTextBlock
  name: string
  slug: string
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
}

type SecondHero = {
  secondHeroImage: SanityImage
} | null

type Project = {
  _rawBrief: PortableTextBlock
  name: string
  slug: {
    current: string
  }
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
}

type HomePageData = {
  _rawLeadParagraph: PortableTextBlock
  heroBanner: SanityImage
  projects: Project[]
}

function Project({
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
      <GatsbyImage alt={hero.alt} image={hero.asset.gatsbyImageData} />
      {secondHero && (
        <GatsbyImage
          alt={secondHero.secondHeroImage.alt}
          image={secondHero.secondHeroImage.asset?.gatsbyImageData}
        />
      )}
      {images.map(i => (
        <GatsbyImage alt={i.alt} image={i?.asset?.gatsbyImageData} />
      ))}
    </div>
  )
}

type PPLProps = { projects: Project[] }
function ProjectPreviewList({ projects }: PPLProps) {
  return (
    <>
      {projects.map(p => {
        return (
          <Project
            briefBlocks={p._rawBrief}
            name={p.name}
            slug={p.slug.current}
            hero={p.hero}
            secondHero={p.secondHero}
            images={p.images}
          />
        )
      })}
    </>
  )
}
// eslint-disable-next-line
export const Head: HeadFC = () => <SEO />
export default function IndexPage({ data }: PageProps<DataProps>) {
  console.log(data)

  const pageData = mapEdgesToNodes<HomePageData>(data.pageData)[0]
  const leadBlocks = pageData._rawLeadParagraph
  const heroImageData = pageData.heroBanner?.asset?.gatsbyImageData
  const heroImageAlt = pageData.heroBanner?.alt
  const featuredProjects = pageData.projects
  return (
    <Layout>
      <h1>Home Page</h1>
      <GatsbyImage alt={heroImageAlt} image={heroImageData} />
      <BlockContent blocks={leadBlocks} />
      <ProjectPreviewList projects={featuredProjects} />
      <p>Query Result:</p>
      <pre>
        <code>{JSON.stringify(pageData, null, 2)}</code>
      </pre>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageData {
    pageData: allSanityHomePage {
      edges {
        node {
          _rawLeadParagraph
          heroBanner {
            alt
            title
            asset {
              gatsbyImageData
            }
            crop {
              _key
              _type
              bottom
              left
              right
              top
            }
            hotspot {
              _key
              _type
              height
              width
              x
              y
            }
          }
          projects: featuredWork {
            _rawBrief
            name
            slug {
              current
            }
            hero {
              alt
              title
              asset {
                gatsbyImageData
              }
              crop {
                _key
                _type
                bottom
                left
                right
                top
              }
              hotspot {
                _key
                _type
                height
                width
                x
                y
              }
            }
            secondHero {
              secondHeroImage {
                title
                alt
                asset {
                  gatsbyImageData
                }
                crop {
                  _key
                  _type
                  bottom
                  left
                  right
                  top
                }
                hotspot {
                  _key
                  _type
                  height
                  width
                  x
                  y
                }
              }
            }
            images {
              title
              alt
              asset {
                gatsbyImageData
              }
              crop {
                _key
                _type
                bottom
                left
                right
                top
              }
              hotspot {
                _key
                _type
                height
                width
                x
                y
              }
            }
          }
        }
      }
    }
  }
`
