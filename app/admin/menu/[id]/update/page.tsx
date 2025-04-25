"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Check,
  ChefHat,
  DollarSign,
  Eye,
  FileText,
  ImagePlus,
  Sparkles,
  Tag,
  Trash,
  Utensils
} from "lucide-react"

import ImageUpload from "@/components/image-upload"
import { Category, MenuItem } from "@/types"
import Loading from "./loading"
import Image from "next/image"

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Price must be a number" })
      .min(0, "Price must be a positive number")
      .max(100000, "Price seems too high")
  ),
  categoryId: z.string().trim().min(1, "Category is required"),
  isSpecial: z.boolean().default(false),
  isMainMenu: z.boolean().default(false),
  isInStock: z.boolean().default(true),
  itemType: z.enum(["starter", "maindish", "dessert"]).default("maindish"),
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
})

export default function UpdateMenuItemPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      categoryId: "",
      isSpecial: false,
      isMainMenu: false,
      isInStock: true,
      itemType: "maindish",
      imageUrl: "",
    },
  })

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
        console.log(" ~ fetchCategories ~ error:", error)
        toast.error("Failed to fetch categories")
      }
    }

    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`/api/menu-items/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch menu item")
        }

        const data: MenuItem = await response.json()
        form.reset({
          name: data.name,
          description: data.description,
          price: data.price,
          categoryId: data.category.id,
          isSpecial: data.isSpecial,
          isMainMenu: data.isMainMenu,
          itemType: data.itemType,
          imageUrl: data.imageUrl,
        })
      } catch (error) {
        console.log("error:", error)
        toast.error("Failed to fetch menu item")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
    fetchMenuItem()
  }, [params.id, form])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      const response = await fetch(`/api/menu-items/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update menu item")
      }

      toast.success("Menu item updated successfully")
      router.push("/admin/menu")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/menu-items/${params.id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete menu item")
      }

      toast.success("Menu item deleted successfully")
      router.push("/admin/menu")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchIsSpecial = form.watch("isSpecial")
  const watchName = form.watch("name")
  const watchPrice = form.watch("price")
  const watchImageUrl = form.watch("imageUrl")
  const watchItemType = form.watch("itemType")
  const watchIsMainMenu = form.watch("isMainMenu")

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="text-3xl font-bold">Edit Menu Item</h1>
            <p className="text-muted-foreground">Update an existing menu item</p>
          </div>
        </div>
        <Button
          onClick={onDelete}
          disabled={isSubmitting}
          variant="destructive"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Deleting...
            </>
          ) : (
            <>
              <Trash className="h-4 w-4 mr-2" /> Delete Item
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information Section */}
          <div className="bg-primary/5 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-full">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {/* Item Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cheese Burger"
                          {...field}
                          className="bg-white/80 border-0 focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormDescription>The name as it will appear on the menu</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/80 border-0 focus:ring-primary">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Group similar items together</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (ETB) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="685.50"
                            className="pl-10 bg-white/80 border-0 focus-visible:ring-primary"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Set the price in Ethiopian Birr</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Item Type Dropdown */}
                <FormField
                  control={form.control}
                  name="itemType"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/80">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <ChefHat className="h-4 w-4 mr-2 text-primary" />
                          <FormLabel className="text-base">Item Type</FormLabel>
                        </div>
                        <FormDescription>Select the type of item</FormDescription>
                      </div>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-white/80 border-0 focus:ring-primary">
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter">Starter</SelectItem>
                            <SelectItem value="maindish">Main Dish</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gradient-to-br from-muted/20 to-muted/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-muted/30 rounded-full">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Description</h2>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description of the item..."
                      className="min-h-[150px] text-base resize-none bg-white/80 border-0 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the ingredients, taste, and preparation method.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Menu Placement Section */}
          <div className="bg-gradient-to-br from-muted/20 to-muted/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-muted/30 rounded-full">
                <Tag className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Menu Placement</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* isSpecial Switch */}
              <FormField
                control={form.control}
                name="isSpecial"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/80">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                        <FormLabel className="text-base">Special</FormLabel>
                      </div>
                      <FormDescription>Highlight this as a special or featured item</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* isMainMenu Switch */}
              <FormField
                control={form.control}
                name="isMainMenu"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/80">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <ChefHat className="h-4 w-4 mr-2 text-primary" />
                        <FormLabel className="text-base">Main Menu</FormLabel>
                      </div>
                      <FormDescription>Show this item in the main menu section</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ImagePlus className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Item Image</h2>
              </div>

              {/* Image Upload */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload onUpload={(url) => field.onChange(url)} value={field.value} />
                    </FormControl>
                    <FormDescription className="text-center mt-4">
                      Upload a high-quality image of your menu item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl p-6 border border-muted/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-muted/20 rounded-full">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">Preview</h2>
              </div>

              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="bg-muted/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{watchName || "Item Name"}</h3>
                      <div className="flex gap-2">
                        {watchIsSpecial && (
                          <Badge className="bg-amber-100 border-amber-500  text-amber-800">
                            <Sparkles className="h-3 w-3 mr-1" /> Special
                          </Badge>
                        )}
                          <Badge
                            variant="outline"
                            className={"bg-green-50 text-green-700 border-green-200"}
                          >
                            Main Menu
                          </Badge>
                        {watchIsMainMenu && (
                          <Badge className="bg-primary hover:bg-primary/80">
                            Main Menu
                          </Badge>
                        )}
                        <Badge variant="outline">{watchItemType.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                        {watchImageUrl ? (
                          <Image
                            src={watchImageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            height={30}
                            width={30}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {form.watch("description") || "Item description will appear here"}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold">{watchPrice ? `${watchPrice} ETB` : "Price"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}