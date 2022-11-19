import * as React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { toPlainText } from "@portabletext/react"
import { NumberParam, useQueryParam } from "use-query-params"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"
import type { ImageProps } from "../components/image"

import SEO from "../components/seo"
import Image from "../components/image"
import { useImages } from "../hooks/use-images"
import LayoutContainer from "../containers/layout"

import "swiper/css"
import "swiper/css/pagination"

type DataProps = {
  pageData: IProject
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, images, brief } = data.pageData
  const { hero } = useImages(images)
  const description = toPlainText(brief)
  const seoImage = hero.asset.publicUrl
  const seoAlt = hero.asset.altText ?? ""

  return (
    <SEO
      title={name}
      description={description}
      imageAlt={seoAlt}
      imagePath={seoImage}
    />
  )
}

export default function CarouselTemplate({
  data,
  location,
}: PageProps<DataProps>) {
  const { images: rawImages } = data.pageData
  const { images } = useImages(rawImages)
  const [currentImage, setCurrentImage] = useQueryParam<number | undefined>("0")
  const height = typeof window !== "undefined" ? window.innerHeight : 0

  return (
    <LayoutContainer location={location}>
      <StyledSwiper
        modules={[Pagination]}
        pagination={{ dynamicBullets: true, type: "bullets" }}
        onSwiper={swiper => console.log(swiper)}
        centeredSlides
        loop
        initialSlide={currentImage}
        height={height}
        style={{
          "--height": height,
        }}
      >
        {images.map(i => (
          <SwiperSlide>
            <Image image={i} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </LayoutContainer>
  )
}

interface ISwiper {
  style: {
    "--height": number
  }
}
const StyledSwiper = styled(Swiper)<ISwiper>`
  height: var(--height);

  .swiper-wrapper {
    align-items: center;
  }
`

export const query = graphql`
  query ProjectCarouselData($id: String!) {
    pageData: sanityProject(id: { eq: $id }) {
      name
      brief: _rawBrief
      images {
        ...SanityImageCoreFragment
      }
    }
  }
`
