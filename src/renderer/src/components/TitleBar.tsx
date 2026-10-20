import { useTheme } from '@renderer/providers/theme-provider'
import { useEffect } from 'react'
import FileButton from './menu-bar/File'

export function TitleBar({ title = 'Coditor' }: { title?: string }): React.JSX.Element {
  const isMac = window.api?.platform === 'darwin'
  const { isDark } = useTheme()

  useEffect(() => {
    if (isMac) return

    window.api?.setTitleBarColors({
      color: isDark ? '#171717' : '#e5e5e5',
      symbolColor: isDark ? '#e5e5e5' : '#171717'
    })
  }, [isDark, isMac])

  return (
    <header
      className="
    flex h-8.25 shrink-0 items-center w-full
    justify-center
    gap-10
    bg-background-main
    text-top-menu-text
    border-b
    border-border-line
    [-webkit-app-region:drag]
  "
    >
      <div className="[-webkit-app-region:no-drag] text-top-menu-text hover:text-top-menu-text-hover bg-background-main">
        <FileButton />
      </div>
      <div className="w-full flex justify-center">
        <p className="">{title}</p>
      </div>
    </header>
  )
}
