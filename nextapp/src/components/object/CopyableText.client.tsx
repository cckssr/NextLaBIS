"use client";

import { Group, Text, CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyableTextProps {
  value: string;
}

/**
 * Client component for text with copy-to-clipboard functionality.
 * Uses Mantine's CopyButton which requires client-side state.
 */
export function CopyableText({ value }: CopyableTextProps) {
  return (
    <Group gap="xs" align="center">
      <Text size="sm" style={{ wordBreak: "break-word" }}>
        {value}
      </Text>
      <CopyButton value={value}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied!" : "Copy"}>
            <ActionIcon
              size="xs"
              variant="subtle"
              color={copied ? "teal" : "gray"}
              onClick={copy}
            >
              {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  );
}
