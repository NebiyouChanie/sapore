"use client"
import Image from "next/image"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { data } from '@/constants/sidebar-links'
import Link from "next/link"
import { NavMain } from "./nav-main"
import { Separator } from "./ui/separator"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[0px] h-[100svh]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mt-2 p-2" >
            <Link href='/admin'>
              <div className="flex items-center space-x-2 ">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <div className="rounded-full">
                    <Image
                      src="/sapore-logo.svg"
                      alt="Sapore Logo"
                      width={40}
                      height={40}
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-[20px]">Sapore</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
              </div>
            </div>
            </Link>
          </SidebarMenuItem>
          <Separator   className="mt-4 h-[1.5px]"/>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}


