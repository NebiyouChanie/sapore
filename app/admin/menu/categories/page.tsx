"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LayoutGrid, Plus, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"; // Import Shadcn Skeleton
import { CategoryTable } from "./_components/CategoryTable"

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
})

type FormValues = z.infer<typeof formSchema>

type Category = {
  id: string
  name: string
  itemCount: number
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // Fetch categories on component mount
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

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.log("error:", error)
        toast.error("Failed to fetch categories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to add category")
      }

      const newCategory = await response.json()
      setCategories((prev) => [...prev, newCategory])

      form.reset()
      toast.success("Category added successfully")
    } catch (error) {
      console.log("error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  const startEditing = (category: Category) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingName("")
  }

  const saveEditing = async () => {
    try {
      const response = await fetch(`/api/categories/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editingName }),
      })

      if (!response.ok) {
        throw new Error("Failed to update category")
      }

      const updatedCategory = await response.json()
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingId ? { ...cat, name: updatedCategory.name } : cat))
      )
      setEditingId(null)
      setEditingName("")
      toast.success("Category updated successfully")
    } catch (error) {
      console.log("error:", error)
      toast.error("Failed to update category")
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error("Failed to delete category");
        }
      }
  
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully");
    } catch (error: unknown) {  
      const errorMessage = error instanceof Error ? error.message : "Something Went Wrong";
      toast.error(errorMessage);
    }
    
  };

  return (
    <div className="container py-10 max-w-5xl">
      {/* Add Category Section */}
      <div className="bg-primary/5 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Add New Category</h2>
        </div>

        <div className="max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        className="bg-white/80 border-0 focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="whitespace-nowrap bg-primary hover:bg-primary/90"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-1 h-4 w-4" /> Add Category
                  </>
                )}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-muted-foreground mt-3">
            Categories help organize your menu items and make it easier for customers to find what they are looking
            for.
          </p>
        </div>
      </div>

      {/* Categories List Section */}
      <div className="mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-full">
            <LayoutGrid className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Manage Categories</h2>
          <div className="ml-auto">
            <Badge variant="outline" className="bg-muted/50">
              {categories.length} {categories.length === 1 ? "category" : "categories"}
            </Badge>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <CategoryTable
            categories={categories}
            editingId={editingId}
            editingName={editingName}
            onEdit={startEditing}
            onSave={saveEditing}
            onCancel={cancelEditing}
            onDelete={deleteCategory}
            setEditingName={setEditingName}
          />
        )}

        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Tag className="h-4 w-4 mr-2" />
          <p>Categories can only be deleted if they contain no menu items.</p>
         </div>
      </div>
    </div>
  )
}