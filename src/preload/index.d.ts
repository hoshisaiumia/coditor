declare global {
  interface Window {
    api: {
      platform: NodeJS.Platform
      setTitleBarColors: (colors: { color: string; symbolColor: string }) => void
      quit: () => void
    }
  }
}

export {}
