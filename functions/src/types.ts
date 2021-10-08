export interface CHARACTER {
  id: number
  name: string
  kana: string
  school: string
  grade: number
  role: string
  height: number
  date_of_birth: string
}

export interface SCHOOL {
  id: number
  name: string
  location: string
  sempo: string
  jiho: string
  chuken: string
  fukusho: string
  taisho: string
}
