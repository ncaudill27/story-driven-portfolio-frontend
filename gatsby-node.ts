import { GatsbyNode } from "gatsby"
import { mapEdgesToNodes } from "./src/lib/helpers"

type ProjectNodeData = {
  id: string
  name: string
  mediaType?: string
  slug: {
    current: string
  } | null
}

type SanityGraphQLResponse<T> = {
  data: {
    projects: {
      edges: {
        node: T
      }[]
    }
  }
  errors: {
    [i: string]: string
  }
}

async function createProjectPages(graphql, actions): GatsbyNode["createPages"] {
  const { createPage } = actions
  const result: SanityGraphQLResponse<ProjectNodeData> = await graphql(`
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

  // TODO check optimize

  const projectEdges = mapEdgesToNodes<ProjectNodeData>(result?.data?.projects)

  projectEdges.forEach(p => {
    const id = p.id
    const slug = p?.slug?.current
    const section = p.mediaType
    const path = `/${section}/${slug}/`

    if (slug) {
      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id },
      })
    }
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createProjectPages(graphql, actions)
}
