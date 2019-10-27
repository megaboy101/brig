interface Option {
  text: string
  selected: boolean
}

export interface Question {
  id: number
  question: string
  type: 'single' | 'multi'
  options: Option[]
}