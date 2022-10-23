import * as React from "react"

import Layout from "../containers/layout"
import ProjectList from "../components/project-list"
import HeroFullBleed from "../components/hero-full-bleed"
import Intro from "./intro"
import { SanityImage } from "../types/sanity"
import { PortableTextBlock } from "@portabletext/types"
import { IProject } from "../types/project"

type CollectionPageProps = {
  hero: SanityImage
  intro: PortableTextBlock
  projects: IProject[]
}

export default function CollectionPage({
  hero,
  intro,
  projects,
}: CollectionPageProps) {
  return (
    <Layout>
      {hero && <HeroFullBleed image={hero} />}
      <Intro heading="Analog Page" blocks={intro} image={hero} />
      <ProjectList projects={projects} />
    </Layout>
  )
}
