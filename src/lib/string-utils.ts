export function ucfirst(s: string) {
  return `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
