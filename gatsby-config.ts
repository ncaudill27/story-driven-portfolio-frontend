require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Brett Davis Photography",
    description: "TODO",
    // When defining the image like above, make sure that you have an image
    // with the same name and file extension in the static folder.
    imagePath: "TODO", // relative path to image in static folder
    imageAlt: "TODO",
    siteUrl: "https://brett-davis-gatsby.netlify.app/",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "af3a1wel",
        dataset: "production",
        token: process.env.SANITY_READ_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
}

export default config
