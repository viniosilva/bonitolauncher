export interface App {
  id: string
  name: string
  path: string
  imageSrc: string
  backgroundSrc: string
  musicSrc: string
  isFavorite: boolean
  lastPlayed: Date | null
  tags: string[]
}
