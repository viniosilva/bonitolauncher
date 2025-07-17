export interface GalleryItem {
  id: string
  name: string
  imageSrc: string
  backgroundSrc?: string
  musicSrc?: string
  category?: string
  isFavorite?: boolean
  lastPlayed?: Date
}
