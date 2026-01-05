"use client";
import { useState, useRef } from "react";
import { DateInput } from "@mantine/dates";
import { GridCol, Text, Tooltip, Stack } from "@mantine/core";
import { useDescriptionProps } from "./common_functions";

// type information for the props
interface DateFormProps {
  code: string;
  name: string;
  description: string;
  pastValue?: string;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

// set grid span for the component on different screen sizes
const gridSpan = { base: 12, md: 6, lg: "content" };

export function DateForm({
  code,
  name,
  description,
  pastValue = null,
  editable = true,
  mandatory = false,
  error = null,
}: DateFormProps) {
  // state for the value of the input field
  const [value, setValue] = useState<Date | null>(
    pastValue ? new Date(pastValue) : null
  );

  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;

  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <DateInput
        size="md"
        radius="md"
        label={name}
        value={value}
        onChange={setValue}
        disabled={!editable}
        withAsterisk={mandatory}
        description={description}
        descriptionProps={useDescriptionProps()}
        error={error}
        placeholder={`code: ${code}`}
        valueFormat="YYYY-MM-DD"
      />
    </GridCol>
  );
}

export function DateText({
  code,
  name,
  pastValue = null,
  description = null,
}: DateFormProps) {
  // condition for checking if component should be large
  const largeCondition = description ? description.length > 100 : false;
  const textRef = useRef(null);

  // Format date for display if it exists
  const formattedDate = pastValue
    ? new Date(pastValue).toLocaleDateString()
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
            <Text size="md">{formattedDate}</Text>
          </Stack>
        </div>
      </Tooltip>
    </GridCol>
  );
}

export default DateForm;
