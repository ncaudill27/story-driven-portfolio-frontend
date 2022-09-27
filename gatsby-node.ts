import { Actions, GatsbyNode } from "gatsby"
import * as pathUtil from "path"
import { mapEdgesToNodes } from "./src/lib/helpers"
import { slugify } from "./src/lib/string-utils"
import type { IProject } from "./src/types/project"
import type { SanityGQLData } from "./src/types/sanity"

type GatsbyNodeGQLFuncion<T, V = {}> = (
  query: string,
  variables?: V
) => Promise<{
  errors?: any
  data?: T | undefined
}>

type CreatePagesFunction<T> = (
  g: GatsbyNodeGQLFuncion<SanityGQLData<T>>,
  a: Actions["createPage"]
) => void

const createProjectPages: CreatePagesFunction<IProject> = async (
  graphql,
  createPage
) => {
  const result = await graphql(`
    query AllProjects {
      projects: allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            name
            mediaType
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const projects = result.data?.projects

  const projectEdges = mapEdgesToNodes<IProject>(projects)

  projectEdges.forEach(p => {
    const id = p.id
    const slug = slugify(p.name)
    const section = p.mediaType
    const path = `/${section}/${slug}/`

    if (slug) {
      createPage({
        path,
        component: pathUtil.resolve("./src/templates/project.tsx"),
        context: { id },
      })
    }
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  // createSectionPages(graphql, createPage)
  await createProjectPages(graphql, createPage)
}
