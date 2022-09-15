import clientConfig from "../../client-config"
import imageUrlBuilder from "@sanity/image-url"
import { buildImageObj } from "./helpers"

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(buildImageObj(source))
}
