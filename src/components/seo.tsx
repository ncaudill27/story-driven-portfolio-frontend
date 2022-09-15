import * as React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import type { SEOMetadata } from "../hooks/use-site-metadata"

interface SEOProps extends Partial<SEOMetadata> {
  children?: React.ReactElement | React.ReactElement[]
}

export default function SEO({
  title,
  description,
  pathname,
  imagePath,
  children,
}: SEOProps) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    imagePath: defaultImage,
    siteUrl,
  } = useSiteMetadata()

  const seo = {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    image: `${siteUrl}${imagePath ?? defaultImage}`,
    url: `${siteUrl}${pathname ?? ``}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:description" content={seo.description} />
      <meta name="og:url" content={seo.url} />
      <meta name="og:site_name" content="Brett Davis Photography" />
      {/* TODO fill out info for image tag and og:image:width og:image:height og:image:alt og:image:type */}
      <meta name="og: image" content="Brett Davis Photography" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      {/* A URL to a unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for this Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. */}
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.image} />
      <meta name="twitter:creator" content="TODO twitterhandle" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </>
  )
}
