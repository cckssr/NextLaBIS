import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SortableTable, type ColumnDef } from "./Table.client";
import { TextInput, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

/**
 * A generic, reusable table component with search and sort capabilities.
 *
 * Features:
 * - Dynamically renders columns based on data structure
 * - Full-text search across all columns (case-insensitive)
 * - Click-to-sort with ascending/descending toggle
 * - Responsive layout with horizontal scroll
 * - Empty state with customizable message
 * - Flexible search input: built-in, custom component, or external
 *
 * ## Usage
 *
 * ```tsx
 * const users = [
 *   { id: 1, name: 'John', email: 'john@example.com' },
 *   { id: 2, name: 'Jane', email: 'jane@example.com' },
 * ];
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 * ];
 * return <SortableTable data={users} columns={columns} rowKey="id" />;
 * ```
 */
const meta: Meta<typeof SortableTable> = {
  title: "Components/SortableTable",
  component: SortableTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A generic table component with built-in search and sort functionality. Customize the search input position or provide your own.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Example Data
// ============================================================================

const users = [
  {
    id: 1,
    name: "Athena Weissnat",
    email: "elouise@yahoo.com",
    company: "Little - Rippin",
  },
  {
    id: 2,
    name: "Deangelo Runolfsson",
    email: "kadin@yahoo.com",
    company: "Greenfelder",
  },
  {
    id: 3,
    name: "Danny Carter",
    email: "marina@hotmail.com",
    company: "Kohler and Sons",
  },
  {
    id: 4,
    name: "Trace Tremblay",
    email: "antonina@yahoo.com",
    company: "Crona, Aufderhar",
  },
  {
    id: 5,
    name: "Derek Dibbert",
    email: "abagail@hotmail.com",
    company: "Gottlieb LLC",
  },
];

const userColumns: ColumnDef[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "company", label: "Company", sortable: true },
];

const products = [
  {
    productId: 1,
    productName: "Laptop",
    category: "Electronics",
    price: "999.99",
  },
  {
    productId: 2,
    productName: "Mouse",
    category: "Accessories",
    price: "29.99",
  },
  {
    productId: 3,
    productName: "Keyboard",
    category: "Accessories",
    price: "79.99",
  },
  {
    productId: 4,
    productName: "Monitor",
    category: "Electronics",
    price: "349.99",
  },
  {
    productId: 5,
    productName: "USB Cable",
    category: "Accessories",
    price: "9.99",
  },
];

const productColumns: ColumnDef[] = [
  { key: "productName", label: "Product Name", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "price", label: "Price", sortable: true },
];

const projects = [
  {
    code: "PROJ001",
    title: "Web Redesign",
    status: "In Progress",
    team: "Frontend Team",
  },
  {
    code: "PROJ002",
    title: "API Integration",
    status: "Planning",
    team: "Backend Team",
  },
  {
    code: "PROJ003",
    title: "Database Migration",
    status: "Completed",
    team: "DevOps Team",
  },
  {
    code: "PROJ004",
    title: "Performance Optimization",
    status: "In Progress",
    team: "Backend Team",
  },
  {
    code: "PROJ005",
    title: "Mobile App Prototype",
    status: "Planning",
    team: "Mobile Team",
  },
];

const projectColumns: ColumnDef[] = [
  { key: "title", label: "Project Title", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "team", label: "Team", sortable: true },
];

// ============================================================================
// Stories
// ============================================================================

/**
 * Default story with built-in search input positioned inside the table.
 */
export const Default: Story = {
  args: {
    data: users,
    columns: userColumns,
    searchPlaceholder: "Search users...",
    rowKey: "id",
  },
};

/**
 * Table without any search input visible.
 * Use this when you want to provide search from an external component.
 */
export const NoSearch: Story = {
  args: {
    data: users,
    columns: userColumns,
    showSearch: false,
    rowKey: "id",
  },
};

/**
 * Table with a custom search input positioned above the table in a separate Stack.
 * This demonstrates how to control the search input placement independently.
 */
export const CustomSearchPosition: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");

    // You would need to filter the data based on search state here
    // For this story, we're just showing the positioning

    return (
      <Stack gap="md">
        <TextInput
          placeholder="Search anywhere above the table..."
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <SortableTable
          {...args}
          showSearch={false}
          data={users}
          columns={userColumns}
          rowKey="id"
        />
      </Stack>
    );
  },
};

/**
 * Table with a custom search input component passed as a prop.
 * The search input is rendered inside the table's ScrollArea.
 */
export const CustomSearchComponent: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");

    const customSearchInput = (
      <TextInput
        placeholder="Custom search with icon..."
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        style={{ borderColor: "var(--mantine-color-blue-5)" }}
      />
    );

    return (
      <SortableTable
        {...args}
        data={users}
        columns={userColumns}
        searchInput={customSearchInput}
        rowKey="id"
      />
    );
  },
};

/**
 * Empty state demonstration.
 */
export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: "No users found",
    rowKey: "id",
  },
};
