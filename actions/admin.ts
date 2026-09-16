'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Interface disesuaikan dengan State dari Form Admin Home & About
export async function updateProfile(data: {
  fullName?: string;
  title?: string;
  introduction?: string;
  profileImage?: string;
  aboutDescription?: string;
  education?: string;
  currentFocus?: string[] | string;
  additionalInfo?: string;
}) {
  try {
    const existing = await prisma.profile.findFirst();

    const profileData = {
      name: data.fullName || '',
      title: data.title || '',
      introduction: data.introduction || '',
      profileImage: data.profileImage || '',
      about: data.aboutDescription || '',
      education: data.education || '',
      focus: Array.isArray(data.currentFocus)
        ? data.currentFocus.join(', ')
        : data.currentFocus || '',
      additionalInfo: data.additionalInfo,
    };

    if (existing) {
      await prisma.profile.update({
        where: { id: existing.id },
        data: profileData,
      });
    } else {
      await prisma.profile.create({ 
        data: profileData 
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/home-about');
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function createPortfolio(data: {
  title: string;
  thumbnail: string;
  description?: string;
  projectType?: string;
  role?: string;
  year?: string;
  challenges?: string;
  solution?: string;
  keyFeatures?: string;
  result?: string;
  liveUrl?: string;
  githubUrl?: string;
  stackIds?: string[];
}) {
  try {
    const { stackIds = [], ...portfolioData } = data;
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    await prisma.portfolio.create({
      data: {
        ...portfolioData,
        slug,
        stacks: {
          create: stackIds.map((stackId) => ({ stackId })),
        },
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true };
  } catch (error) {
    console.error('Create portfolio error:', error);
    return { success: false, error: 'Failed to create portfolio' };
  }
}

export async function getStacks() {
  try {
    return await prisma.stack.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    console.error('Failed to fetch stacks:', error);
    return [];
  }
}

export async function updatePortfolio(
  id: string,
  data: {
    title?: string;
    projectType?: string;
    description?: string;
    thumbnail?: string;
    githubUrl?: string;
    liveUrl?: string;
    selectedStacks?: string[];
    stackIds?: string[];
  }
) {
  try {
    const { selectedStacks, stackIds, ...portfolioData } = data;
    const finalStackIds = stackIds ?? selectedStacks ?? [];

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        ...portfolioData,
        stacks: {
          deleteMany: {},
          create: finalStackIds.map((stackId) => ({ stackId })),
        },
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update portfolio error:', error);
    return { success: false, error: 'Failed to update portfolio' };
  }
}

export async function deletePortfolio(id: string) {
  try {
    await prisma.portfolio.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete portfolio' };
  }
}

export async function createStack(data: { name: string; icon?: string; category?: string; description?: string }) {
  try {
    await prisma.stack.create({ data });
    revalidatePath('/');
    revalidatePath('/admin/stack');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create stack' };
  }
}

export async function deleteStack(id: string) {
  try {
    await prisma.stack.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/stack');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete stack' };
  }
}

export async function updateStack(id: string, data: { name: string; icon?: string; category?: string; description?: string }) {
  try {
    const updated = await prisma.stack.update({
      where: { id },
      data,
    });
    return { success: true, data: updated };
  } catch (error) {
    console.error('Error updating stack:', error);
    return { success: false };
  }
}