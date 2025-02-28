"use client";
import { useState, useRef } from "react";
import {
  DateInput,
  TimeInput,
  GridCol,
  Text,
  Tooltip,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import { useDescriptionProps } from "./common_functions";

// type information for the props
interface TimestampFormProps {
  code: string;
  name: string;
  description: string;
  pastValue?: string; // ISO format date string
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

// set grid span for the component on different screen sizes
const gridSpan = { base: 12, md: 6, lg: "content" };

export function TimestampForm({
  code,
  name,
  description,
  pastValue = null,
  editable = true,
  mandatory = false,
  error = null,
}: TimestampFormProps) {
  // Initialize date and time from pastValue if available
  const initialDate = pastValue ? new Date(pastValue) : null;

  // state for the values of the input fields
  const [dateValue, setDateValue] = useState(initialDate);
  const [timeValue, setTimeValue] = useState(
    initialDate
      ? `${initialDate.getHours().toString().padStart(2, "0")}:${initialDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : ""
  );

  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;

  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <Box>
        <Text fw={500} size="sm">
          {name}
          {mandatory && (
            <Text span c="red" inheritFontFamily>
              *
            </Text>
          )}
        </Text>
        <Text
          size="xs"
          c="dimmed"
          mb={5}
          sx={(theme) => ({
            lineClamp: 2,
            "&:hover": {
              lineClamp: "unset",
            },
          })}
        >
          {description}
        </Text>
        <Group grow>
          <DateInput
            size="md"
            radius="md"
            value={dateValue}
            onChange={setDateValue}
            disabled={!editable}
            error={error}
            placeholder="Select date"
            valueFormat="YYYY-MM-DD"
            clearable
          />
          <TimeInput
            size="md"
            radius="md"
            value={timeValue}
            onChange={(val) => setTimeValue(val)}
            disabled={!editable}
            error={error}
            placeholder="Select time"
            withSeconds
          />
        </Group>
        <Text size="xs" c="dimmed" mt={5}>
          code: {code}
        </Text>
      </Box>
    </GridCol>
  );
}

export function TimestampText({
  code,
  name,
  pastValue = null,
  description = null,
}: TimestampFormProps) {
  // condition for checking if component should be large
  const largeCondition = description ? description.length > 100 : false;
  const textRef = useRef(null);

  // Format timestamp for display if it exists
  const formattedTimestamp = pastValue
    ? new Date(pastValue).toLocaleString()
    : null;

  return (
    <GridCol span={gridSpan}>
      <Tooltip
        label={description}
        disabled={!description}
        multiline={largeCondition}
        w={largeCondition ? "90%" : "auto"}
      >
        <div>
          <Stack ref={textRef} align="flex-start" justify="flex-start" gap={0}>
            <Text size="md" fw={500}>
              {name}:
            </Text>
            <Text size="md">{formattedTimestamp}</Text>
          </Stack>
        </div>
      </Tooltip>
    </GridCol>
  );
}

export default TimestampForm;
