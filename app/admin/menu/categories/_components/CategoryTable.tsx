"use client"

import { Edit, Trash2, Check, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Input } from "@/components/ui/input"

type Category = {
  id: string
  name: string
  itemCount: number
}

type CategoryTableProps = {
  categories: Category[]
  editingId: string | null
  editingName: string
  onEdit: (category: Category) => void
  onSave: () => void
  onCancel: () => void
  onDelete: (id: string) => void
  setEditingName: (name: string) => void
}

export const CategoryTable = ({
  categories,
  editingId,
  editingName,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  setEditingName,
}: CategoryTableProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white">
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-muted/10">
          <div className="p-4 rounded-full bg-muted/20 mb-4">
            <FileText className="h-8 w-8 text-muted-foreground opacity-70" />
          </div>
          <h3 className="text-lg font-medium mb-1">No categories yet</h3>
          <p className="text-muted-foreground max-w-md">
            Create your first category to start organizing your menu items
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-left py-3.5 px-6 font-medium text-sm text-muted-foreground">
                    Category Name
                  </th>
                  <th className="text-right py-3.5 px-6 font-medium text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className={`hover:bg-muted/5 transition-colors ${
                      editingId === category.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      {editingId === category.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="max-w-sm border-primary/30 focus-visible:ring-primary"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") onSave()
                              if (e.key === "Escape") onCancel()
                            }}
                          />
                        </div>
                      ) : (
                        <span className="font-medium">{category.name}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === category.id ? (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                              onClick={onSave}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Save</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={onCancel}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-muted-foreground hover:text-foreground"
                              onClick={() => onEdit(category)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <ConfirmDialog
                              title="Delete Category"
                              description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
                              variant="destructive"
                              actionLabel="Delete"
                              onConfirm={() => onDelete(category.id)}
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              }
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}