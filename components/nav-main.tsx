"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Manage your restaurant</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem
                className={`relative py-[2px] px-4 rounded-[10px] transition-all ease-in-out duration-200 ${
                  isActive
                    ? "text-primary bg-secondary font-semibold border-l-[1px] border-primary"
                    : "hover:text-primary hover:bg-secondary hover:font-semibold hover:border-l-[1px] hover:border-primary"
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <SidebarMenuButton size="lg" asChild tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-2 flex-1">
                      <item.icon />
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <CollapsibleTrigger asChild>
                      <button
                        className="ml-auto p-1 rounded hover:bg-gray-200 transition-colors"
                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                      >
                        <ChevronRight className="data-[state=open]:rotate-90" />
                      </button>
                    </CollapsibleTrigger>
                  ) : null}
                </div>
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              size="md"
                              asChild
                              className={`text-base ps-2 transition-all ${
                                isSubActive
                                  ? "text-primary bg-secondary font-semibold"
                                  : "text-gray-600 hover:text-primary hover:bg-secondary"
                              }`}
                            >
                              <Link href={subItem.url}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}