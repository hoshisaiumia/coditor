import { readFile } from 'fs/promises'
import { writeFile } from 'fs/promises'

export async function loadFile(path: string): Promise<string | null> {
  try {
    const file = await readFile(path, 'utf-8')
    return file
  } catch (err) {
    console.error('Error while reading file: ', err)
    return null
  }
}

export async function saveFile(path: string, data: string): Promise<boolean> {
  try {
    await writeFile(path, data, 'utf-8')
    return true
  } catch (err) {
    console.error('Error while saving file: ', err)
    return false
  }
}
