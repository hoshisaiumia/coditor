import { useTheme } from '@renderer/providers/theme-provider'
import { Button } from './ui/button'
import { ReactElement } from 'react'

export function Homepage(): ReactElement {
  const { toggleTheme, resolvedTheme } = useTheme()
  return (
    <div className="h-dvh flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-2xl">Hello, world!</h1>
      <Button variant="secondary" className="bg-white rounded" onClick={() => toggleTheme()}>
        Change Theme (current theme: {resolvedTheme})
      </Button>
    </div>
  )
}
