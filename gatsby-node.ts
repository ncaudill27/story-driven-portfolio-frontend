import { GatsbyNode } from "gatsby"

async function createProjectPages(graphql, actions): GatsbyNode["createPages"] {
  const { createPage } = actions
  const result = await graphql(`
    query AllProjects {
      projects: allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            name
            mediaType
            _rawBrief
            _rawIntro
            _rawSubject
            slug {
              current
            }
            hero {
              alt
              title
              asset {
                _id
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
            elements {
              name
              _rawDescription
            }
            images {
              alt
              title
              asset {
                _id
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
  `)

  if (result.errors) throw result.errors

  // TODO check optimize
  const projectEdges = result?.data?.projects?.edges

  projectEdges.forEach(({ node }) => {
    const id = node.id
    const slug = node?.slug?.current
    const section = node.mediaType
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
