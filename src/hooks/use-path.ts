import type { IProject } from "../types/project"

export function usePath(mediaType: IProject["mediaType"], slug: string) {
  return `/${mediaType}/${slug}/`
}
