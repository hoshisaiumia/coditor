import { useTheme } from '@renderer/providers/theme-provider'
import { useEffect } from 'react'
import { HeaderDropdownOption } from './HeaderDropdownOption'

type HeaderOption = {
  label: string
  dropdown: HeaderDropdownOption
}

export function TitleBar({ title = 'Coditor' }) {
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
    flex h-8.25 shrink-0 items-center w-full pl-2
    justify-center
    gap-10
    bg-background
    text-header-text
    border-b
    border-border-line
    [-webkit-app-region:drag]
  "
    >
      <div className="w-full flex justify-center">
        <p className="">{title}</p>
        <div></div>
      </div>
    </header>
  )
}
