import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export type HeaderDropdownOption = {
  label: string
  shortcut: string
  action: () => void
}

export function HeaderButton({
  title,
  dropdownOptions
}: {
  title: string
  dropdownOptions: HeaderDropdownOption[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button />}>{title}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {dropdownOptions.map((option, key) => (
            <DropdownMenuItem key={key}>
              {option.label}
              <DropdownMenuShortcut>{option.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
