'use server'

import fs from 'fs/promises'
import path from 'path'
import { Project, SkillCategory, Experience } from '../../types'
import { revalidatePath } from 'next/cache'

const getProjectsFilePath = () => path.join(process.cwd(), 'data', 'projects.json')
const getSkillsFilePath = () => path.join(process.cwd(), 'data', 'skills.json')
const getExperienceFilePath = () => path.join(process.cwd(), 'data', 'experience.json')

export async function getProjectsAction(): Promise<Project[]> {
  try {
    const data = await fs.readFile(getProjectsFilePath(), 'utf-8')
    return JSON.parse(data) as Project[]
  } catch (error) {
    return []
  }
}

export async function saveProjectsAction(projects: Project[]) {
  try {
    await fs.writeFile(getProjectsFilePath(), JSON.stringify(projects, null, 2), 'utf-8')
    revalidatePath('/')
    revalidatePath('/portfolio')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save changes.' }
  }
}

export async function getSkillsAction(): Promise<SkillCategory[]> {
  try {
    const data = await fs.readFile(getSkillsFilePath(), 'utf-8')
    return JSON.parse(data) as SkillCategory[]
  } catch (error) {
    return []
  }
}

export async function saveSkillsAction(skills: SkillCategory[]) {
  try {
    await fs.writeFile(getSkillsFilePath(), JSON.stringify(skills, null, 2), 'utf-8')
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save changes.' }
  }
}

export async function getExperienceAction(): Promise<Experience[]> {
  try {
    const data = await fs.readFile(getExperienceFilePath(), 'utf-8')
    return JSON.parse(data) as Experience[]
  } catch (error) {
    return []
  }
}

export async function saveExperienceAction(experience: Experience[]) {
  try {
    await fs.writeFile(getExperienceFilePath(), JSON.stringify(experience, null, 2), 'utf-8')
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/admin/experience')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to save changes.' }
  }
}
