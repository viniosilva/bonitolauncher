import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import { AppRepository } from '../repositories/AppRepository'
import { App } from '../entities/App'
import { IPC_CHANNELS } from '../../common/types/IpcChannels'

export class AppService extends EventEmitter {
  constructor(private readonly appRepository: AppRepository) {
    super()
    
    this.appRepository.on(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, (app: App) => {
      this.emit(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, app)
    })
  }

  async getAllApps(): Promise<App[]> {
    await this.appRepository.loadApps()
    return this.appRepository.findAll()
  }

  async runApp(appId: string): Promise<void> {
    const app = await this.appRepository.findById(appId)
    const child = spawn(app.path, [], { cwd: app.path.substring(0, app.path.lastIndexOf('/')) })

    child.stdout?.on('data', (data) => { this.emit('runApp:output', data.toString()) })
    child.stderr?.on('data', (data) => { this.emit('runApp:output', data.toString()) })

    child.on('close', (code) => {
      console.log(`App ${app.name} process closed with code ${code}`)
    })

    child.on('error', (error) => { throw error })
  }
}
