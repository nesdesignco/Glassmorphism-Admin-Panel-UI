"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
}

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  onRowClick
}: DataTableProps<T>) {
  const actionsColumn = columns.find(c => c.key === 'actions')
  const dataColumns = columns.filter(c => c.key !== 'actions')

  return (
    <>
      <div className="hidden md:block glass-table rounded-xl overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={cn(
                    "text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[var(--text-tertiary)]",
                    index === 0 && "w-[30%]",
                    column.key === "actions" && "w-[80px] sm:w-[100px] text-right",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-t border-[rgba(255,255,255,var(--glass-border-opacity))] transition-colors",
                  onRowClick && "cursor-pointer hover:bg-[rgba(255,255,255,var(--ui-opacity-5))]"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-[var(--text-secondary)]",
                      column.key === "actions" && "text-right",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : (item as Record<string, unknown>)[column.key] as ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onRowClick?.(item)}
            className={cn(
              "glass-card p-4",
              onRowClick && "cursor-pointer"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                {dataColumns[0]?.render
                  ? dataColumns[0].render(item)
                  : (item as Record<string, unknown>)[dataColumns[0]?.key] as ReactNode}
              </div>
              {actionsColumn?.render && (
                <div onClick={(e) => e.stopPropagation()}>
                  {actionsColumn.render(item)}
                </div>
              )}
            </div>

            {dataColumns.length > 1 && (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {dataColumns.slice(1).map((column) => (
                  <div key={column.key}>
                    <span className="text-[var(--text-muted)] text-[10px] sm:text-xs block mb-1">{column.header}</span>
                    <div className="text-xs sm:text-sm">
                      {column.render
                        ? column.render(item)
                        : (item as Record<string, unknown>)[column.key] as ReactNode}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
