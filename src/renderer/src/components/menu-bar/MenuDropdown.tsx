import { Fragment } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export type IMenuDropdownOption = {
  label: string
  shortcut?: string
  action: () => void
}

export type IMenuDropdownSection = IMenuDropdownOption[]

export type IMenuDropdown = {
  label: string
  sections: IMenuDropdownSection[]
}

export function MenuButtonComponent({ label, sections }: IMenuDropdown) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button className="cursor-pointer padding-1 hover:bg-top-menu-button-hover" />}
      >
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background-main rounded-md p-1 w-55 border border-border-line">
        {sections.map((section, i) => (
          <Fragment key={i}>
            {i > 0 && <DropdownMenuSeparator className="bg-border-line mt-1 mb-1" />}
            <DropdownMenuGroup>
              {section.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={option.action}
                  className="text-top-menu-text cursor-pointer bg-top-menu-button hover:bg-top-menu-button-hover hover:text-top-menu-text-hover rounded"
                >
                  {option.label}
                  <DropdownMenuShortcut className="text-shortcut-text">
                    {option.shortcut}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
