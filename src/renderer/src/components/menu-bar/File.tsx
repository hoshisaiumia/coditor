import { useFileStore } from '@renderer/store/file.store'
import { type IMenuDropdown, MenuButtonComponent } from './MenuDropdown'
const FileDropdownMenu: IMenuDropdown = {
  label: 'File',
  sections: [
    [
      { label: 'New file', shortcut: 'Ctrl+N', action: () => console.log('Create a file!') },
      {
        label: 'New project',
        shortcut: 'Ctrl+Shift+N',
        action: () => console.log('Create a project!')
      }
    ],
    [
      {
        label: 'Open file',
        shortcut: 'Ctrl+O',
        action: async () => {
          const result = await window.api.openFile()
          if (result) useFileStore.getState().loaded(result.filePath, result.content)
        }
      },
      {
        label: 'Open project',
        shortcut: 'Ctrl+Shift+O',
        action: () => console.log('Open a project!')
      }
    ],
    [{ label: 'Quit', action: () => window.api.quit() }]
  ]
}

export default function FileButton(): React.JSX.Element {
  return <MenuButtonComponent {...FileDropdownMenu} />
}
