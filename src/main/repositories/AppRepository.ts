import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { EventEmitter } from 'events'
import { App } from '../entities/App'
import { IPC_CHANNELS } from '../../common/types/IpcChannels'

export class AppRepository extends EventEmitter {
  private apps: App[] = []

  constructor(private readonly launcherFolder: string) {
    super()
  }

  async loadApps(): Promise<void> {
    this.loadAppsFromFiles(this.launcherFolder)
  }

  private async loadAppsFromFiles(folder: string): Promise<void> {
    const files = await readdir(folder)
    for (const file of files) {
      const filePath = join(folder, file)

      const stats = await stat(filePath)
      if (stats.isDirectory()) {
        await this.loadAppsFromFiles(filePath)
        continue
      }

      if (!this.fileIsValid(file)) continue

      try {
        const app = await this.readInfo(filePath)
        this.apps.push(app)
        this.emit(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, app)
        
        console.log('Loaded app from sh file: ', app.path)
      } catch (error) {
        console.error('Error reading info file: ', error)
      }
    }
  }

  private fileIsValid(file: string): boolean {
    return !file.startsWith('init') &&
      !file.startsWith('_') &&
      file.endsWith('.sh')
  }

  private async readInfo(file: string): Promise<App> {
    const getShInfo = () => new Promise<string>((resolve, reject) => {
      exec(`"${file}" info`, (err, stdout) => {
        if (err) return reject(err)
        resolve(stdout)
      })
    })

    const shInfo = await getShInfo()
    const infoLines = shInfo.split('\n')

    const fileName = file.split('/').pop()?.split('.')[0]
    const id = `${fileName}_${file.split('/').slice(-2)[0]}`

    const app = {
      id: id,
      name: infoLines[0].split('=')[1].trim(),
      path: file,
      tags: infoLines[1].split('=')[1].trim().split(','),
      imageSrc: infoLines[2].split('=')[1].trim(),
      backgroundSrc: infoLines[3].split('=')[1].trim(),
      musicSrc: infoLines[4].split('=')[1].trim(),
      isFavorite: false,
      lastPlayed: null,
    }

    return app
  }

  async findAll(): Promise<App[]> {
    return this.apps.slice(0, 10)
  }

  async findById(id: string): Promise<App> {
    const app = this.apps.find(app => app.id === id)
    if (!app) throw new Error(`App with id ${id} not found`)

    return app
  }
}
