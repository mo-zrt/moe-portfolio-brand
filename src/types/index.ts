export interface CollabRow {
  type: string
  tag: string
}

export interface DisciplineCard {
  index: string
  icon: string
  title: string
  body: string
  tags: string[]
  cta: string
  ctaHref: string
  cardClass: string
}

export interface StatItem {
  number: string
  label: string
  sub: string
  countTo?: number
  prefix?: string
  suffix?: string
}
