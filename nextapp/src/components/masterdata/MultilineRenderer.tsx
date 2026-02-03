"use client";

import { Text, Textarea, TypographyStylesProvider, Box } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface MultilineRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Basic HTML sanitization - removes dangerous tags/attributes.
 * For Phase 0, this is a simple implementation.
 * TODO(#51): Replace with proper sanitization library (DOMPurify) in Phase 1.
 */
function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

/**
 * Checks if content contains HTML tags.
 */
function containsHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

/**
 * Renderer for MULTILINE_VARCHAR property type.
 * View: Renders sanitized HTML content or plain text.
 * Edit: Textarea for plain text editing.
 *
 * TODO: Replace Textarea with RichTextEditor (@mantine/tiptap) in Phase 1
 * for proper HTML editing support.
 */
export function MultilineRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: MultilineRendererProps) {
  const stringValue = value != null ? String(value) : "";

  if (!isEditing) {
    if (!stringValue) {
      return (
        <div>
          <Text size="sm" c="dimmed" mb={4}>
            {label}
          </Text>
          <Text size="sm" c="dimmed">
            —
          </Text>
        </div>
      );
    }

    // Check if content is HTML and render accordingly
    if (containsHtml(stringValue)) {
      return (
        <div>
          <Text size="sm" c="dimmed" mb={4}>
            {label}
          </Text>
          <TypographyStylesProvider>
            <Box
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(stringValue) }}
              style={{ fontSize: "var(--mantine-font-size-sm)" }}
            />
          </TypographyStylesProvider>
        </div>
      );
    }

    // Plain text - preserve line breaks
    return (
      <div>
        <Text size="sm" c="dimmed" mb={4}>
          {label}
        </Text>
        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
          {stringValue}
        </Text>
      </div>
    );
  }

  // TODO(#38): Replace with RichTextEditor in Phase 1 for proper HTML editing
  return (
    <Textarea
      label={label}
      value={(form?.values[code] as string) ?? ""}
      onChange={(e) => form?.setFieldValue(code, e.currentTarget.value)}
      required={mandatory}
      placeholder={`Enter ${label.toLowerCase()}`}
      minRows={4}
      autosize
      maxRows={12}
    />
  );
}
