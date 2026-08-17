'use server'

import fs from 'fs/promises'
import path from 'path'

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure the public/projects directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'projects')
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.name)
    const filename = `img-${uniqueSuffix}${ext}`
    
    // Write the file to public/projects/
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    // Return the public URL path
    return { success: true, url: `/projects/${filename}` }
  } catch (error) {
    console.error('Failed to upload image', error)
    return { success: false, error: 'Failed to upload image' }
  }
}
