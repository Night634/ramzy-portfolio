export type Profile = {
  id: string
  name: string
  title: string
  introduction: string
  profileImage: string
  about: string
  education: string
  focus: string
  additionalInfo: string | null
  updatedAt: Date
}

export type Portfolio = {
  id: string
  title: string
  slug: string
  thumbnail: string
  description: string | null
  projectType: string | null
  role: string | null
  year: string | null
  challenges: string | null
  solution: string | null
  keyFeatures: string | null
  result: string | null
  liveUrl: string | null
  githubUrl: string | null
  createdAt: Date
}

export type Stack = {
  id: string
  name: string
  icon: string | null
  category: string | null
  description: string | null
  createdAt: Date
}

export type PortfolioImage = {
  id: string
  portfolioId: string
  imageUrl: string
}

export type PortfolioWithStacks = Portfolio & {
  stacks: {
    stack: Stack
  }[]
  images?: PortfolioImage[]
}
