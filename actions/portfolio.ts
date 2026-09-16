'use server'

import { prisma } from '@/lib/prisma'
import { PortfolioWithStacks } from '@/types'

export async function getProfile() {
  try {
    return await prisma.profile.findFirst()
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    return null
  }
}

export async function getPortfolios(): Promise<PortfolioWithStacks[]> {
  try {
    return await prisma.portfolio.findMany({
      include: {
        stacks: {
          include: {
            stack: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('Failed to fetch portfolios:', error)
    return []
  }
}

export async function getStacks() {
  try {
    return await prisma.stack.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  } catch (error) {
    console.error('Failed to fetch stacks:', error)
    return []
  }
}

export async function getPortfolioById(id: string): Promise<PortfolioWithStacks | null> {
  try {
    return await prisma.portfolio.findUnique({
      where: { id },
      include: {
        stacks: {
          include: {
            stack: true
          }
        },
        images: true
      }
    })
  } catch (error) {
    console.error('Failed to fetch portfolio detail by id:', error)
    return null
  }
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioWithStacks | null> {
  try {
    return await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        stacks: {
          include: {
            stack: true
          }
        },
        images: true
      }
    })
  } catch (error) {
    console.error('Failed to fetch portfolio detail:', error)
    return null
  }
}