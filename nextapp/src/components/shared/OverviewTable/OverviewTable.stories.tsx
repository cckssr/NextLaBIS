import type { Meta, StoryObj } from "@storybook/react";
import { OverviewTable } from "./OverviewTable.client";
import type { ColumnDef } from "./OverviewTable.client";

/**
 * A generic, reusable table component with search and sort capabilities.
 *
 * Features:
 * - Dynamically renders columns based on data structure
 * - Full-text search across all columns (case-insensitive)
 * - Click-to-sort with ascending/descending toggle
 * - Responsive layout with horizontal scroll
 * - Empty state with customizable message
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
 * return <OverviewTable data={users} columns={columns} rowKey="id" />;
 * ```
 */
const meta: Meta<typeof OverviewTable> = {
  title: "Components/OverviewTable",
  component: OverviewTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A generic table component with built-in search and sort functionality. Accepts any data shape with string, number, or boolean values.",
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
 * Basic usage with user data. Demonstrates the table with name, email, and company columns.
 * Try sorting by clicking on column headers or searching by any field.
 */
export const Users: Story = {
  args: {
    data: users,
    columns: userColumns,
    searchPlaceholder: "Search users...",
    emptyMessage: "No users found",
    rowKey: "id",
  },
};

/**
 * Product inventory example. Shows how the table adapts to different data structures.
 * Search for product names, categories, or prices.
 */
export const Products: Story = {
  args: {
    data: products,
    columns: productColumns,
    searchPlaceholder: "Search products...",
    emptyMessage: "No products found",
    rowKey: "productId",
  },
};

/**
 * Project management example. Demonstrates the table with status and team assignment.
 * Sort by project title, status, or team name.
 */
export const Projects: Story = {
  args: {
    data: projects,
    columns: projectColumns,
    searchPlaceholder: "Search projects...",
    emptyMessage: "No projects found",
    rowKey: "code",
  },
};

/**
 * Empty state demonstration. Shows the table when no data matches the search query.
 * All rows are filtered out by default to show the empty message.
 */
export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    searchPlaceholder: "Search users...",
    emptyMessage: "No data available",
    rowKey: "id",
  },
};

/**
 * Single column example. Shows the table with minimal data (one column only).
 * Useful for simple list-like tables.
 */
export const SimpleList: Story = {
  args: {
    data: users,
    columns: [{ key: "name", label: "User Name", sortable: true }],
    searchPlaceholder: "Search names...",
    rowKey: "id",
  },
};
