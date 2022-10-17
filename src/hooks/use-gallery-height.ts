export function useGalleryHeight(heights: number[]) {
  console.log("HEIGHTS ARRAY: ", heights)
  let col1Height = 0,
    col2Height = 0,
    col3Height = 0

  for (let i = 0; i < heights.length; i++) {
    const imageHeight = heights[0]
    const columnKey = i % 3

    switch (columnKey) {
      case 0:
        col1Height += imageHeight
        break
      case 1:
        col2Height += imageHeight
        break
      case 2:
        col3Height += imageHeight
        break
      default:
        break
    }
  }

  const tallestColumn = Math.max(col1Height, col2Height, col3Height)
  const marginCoefficient = heights.length / 3 / 100 + 1

  return tallestColumn * marginCoefficient
}
