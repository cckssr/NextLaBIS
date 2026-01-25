"use client";

import { useMemo, ReactNode } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

/**
 * Props for the AdvancedTable component
 *
 * @template T - Type of the data records
 * @param data - Array of data records to display in the table
 * @param columns - Column definitions for the table
 * @param searchPlaceholder - Placeholder text for the global search input
 * @param onRowAction - Function to render row action menu items
 * @param onRowActionClick - Optional callback when a row action is clicked
 * @param enableFiltering - Enable column filtering (default: true)
 * @param enableColumnOrdering - Enable column ordering (default: true)
 */
export interface AdvancedTableProps<T extends Record<string, any>> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  searchPlaceholder?: string;
  onRowAction?: () => ReactNode;
  onRowActionClick?: (row: T) => void;
  enableFiltering?: boolean;
  enableColumnOrdering?: boolean;
  enableRowSelection?: boolean;
  enableRowActions?: boolean;
  enableColumnPinning?: boolean;
  initialState?: any;
}

/**
 * Generic, feature-rich table component built with MantineReactTable
 * Supports filtering, sorting, column ordering, row selection, row actions, and more
 */
function AdvancedTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search",
  onRowAction,
  onRowActionClick,
  enableFiltering = true,
  enableColumnOrdering = true,
  enableRowSelection = true,
  enableRowActions = true,
  enableColumnPinning = true,
}: AdvancedTableProps<T>) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const table = useMantineReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    enableColumnFilterModes: enableFiltering,
    enableColumnOrdering,
    enableFacetedValues: enableFiltering,
    enableColumnPinning,
    enableRowActions,
    enableRowSelection,
    initialState: {
      showColumnFilters: enableFiltering,
      showGlobalFilter: enableFiltering,
      columnPinning: {
        left: enableRowSelection ? ["mrt-row-expand", "mrt-row-select"] : [],
        right: enableRowActions ? ["mrt-row-actions"] : [],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineSearchTextInputProps: {
      placeholder: searchPlaceholder,
    },
    ...(onRowAction && {
      renderRowActionMenuItems: () => onRowAction(),
    }),
  });

  return <MantineReactTable table={table} />;
}

export default AdvancedTable;
