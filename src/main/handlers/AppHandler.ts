import { ipcMain, BrowserWindow } from 'electron'
import { AppService } from '../services/AppService'
import { IPC_CHANNELS } from '../../common/types/IpcChannels'

export class AppHandler {
  constructor(private readonly appService: AppService) {
    this.setupEventListeners()
  }

  setupIpcHandlers(): void {
    ipcMain.handle(IPC_CHANNELS.APPS.GET_ALL, () => this.appService.getAllApps())
    ipcMain.handle(IPC_CHANNELS.APPS.RUN, (_e, appId: string) => this.appService.runApp(appId))
  }

  private setupEventListeners(): void {
    this.appService.on(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, (app: any) => {
      BrowserWindow.getAllWindows().forEach(window => {
        window.webContents.send(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, app)
      })
    })

    this.appService.on(IPC_CHANNELS.APPS.RUN_OUTPUT_STREAM, (data: string) => {
      BrowserWindow.getAllWindows().forEach(window => {
        window.webContents.send(IPC_CHANNELS.APPS.RUN_OUTPUT_STREAM, data)
      })
    })
  }
}
