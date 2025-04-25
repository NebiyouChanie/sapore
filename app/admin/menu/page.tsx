"use client"

import { Search, Settings2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category, MenuItem } from "@/types"
import Loading from "./loading"
import Image from "next/image"

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("1")  
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [menuSettings, setMenuSettings] = useState({
    showPrice: true,
    showDescription: true
  })
  const router = useRouter()

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }

        const data: Category[] = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu-items?admin=true", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch menu items")
        }

        const data: MenuItem[] = await response.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Fetch menu settings
  useEffect(() => {
    const fetchMenuSettings = async () => {
      try {
        const response = await fetch("/api/menu-settings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch menu settings")
        }

        const data = await response.json()
        setMenuSettings(data)
      } catch (error) {
        console.error("Error fetching menu settings:", error)
      }
    }

    fetchMenuSettings()
  }, [])

  // Update menu settings
  const handleSettingChange = async (setting: 'showPrice' | 'showDescription', value: boolean) => {
    try {
      const newSettings = {...menuSettings, [setting]: value}
      setMenuSettings(newSettings)
      
      const response = await fetch("/api/menu-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings)
      })

      if (!response.ok) {
        throw new Error("Failed to update settings")
      }
    } catch (error) {
      console.error("Error updating settings:", error)
      // Revert on error
      setMenuSettings(prev => ({...prev, [setting]: !value}))
    }
  }

  // Filter menu items based on selected category and search query
  const filteredMenuItems = menuItems?.filter(
    (item) =>
      (selectedCategory === "1" || item.category.id === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search menu items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-price" 
                checked={menuSettings?.showPrice}
                onCheckedChange={(checked) => handleSettingChange('showPrice', checked)}
              />
              <Label htmlFor="show-price">Show Prices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-description" 
                checked={menuSettings?.showDescription}
                onCheckedChange={(checked) => handleSettingChange('showDescription', checked)}
              />
              <Label htmlFor="show-description">Show Descriptions</Label>
            </div>
          </div>
          <Button variant="outline" className="flex gap-2" onClick={() => router.push("/admin/menu/categories")}>
            <Settings2 className="h-4 w-4" />
            Manage Categories
          </Button>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="1">All</TabsTrigger>
          {categories?.map((category) => (
            <TabsTrigger
              key={category?.id}
              value={category?.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category?.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Separator className="mb-8" />

      {filteredMenuItems?.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No menu items found</h3>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenuItems?.map((item) => (
            <Link key={item.id} href={`/admin/menu/${item.id}/update`} className="block h-full">
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    fill
                  />
                </div>
                <CardContent className="">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{item?.name}</h3>
                    </div>
                      <Badge variant="outline" className="mt-1">
                        {item?.category?.name}
                      </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2 min-h-[40px]">{item?.description}</p>
                </CardContent>
                <CardFooter className="pt-0 px-4">
                  <p className="font-semibold text-lg">ETB {item?.price?.toFixed(2)}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}