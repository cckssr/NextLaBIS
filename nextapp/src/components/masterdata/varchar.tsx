// component for rendering masterdata properties of type: varchar
"use client";
import { useState, useRef } from "react";
import { TextInput, GridCol, Text, Tooltip, Stack } from "@mantine/core";
import { useDescriptionProps } from "./common_functions";

// type information for the props
interface VarcharFormProps {
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

// TODO: using mantina form maybe?
export function VarcharForm({
  code,
  name,
  description,
  pastValue = null,
  editable = true,
  mandatory = false,
  error = null,
}: VarcharFormProps) {
  // state for the value of the input field
  const [formValue, setValue] = useState(pastValue ?? "");
  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;

  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <TextInput
        size="md"
        radius="md"
        label={name}
        value={formValue}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        disabled={!editable}
        withAsterisk={mandatory}
        description={description}
        // handle long descriptions with line clamp
        // TODO: remove if description is not long
        descriptionProps={useDescriptionProps()}
        error={error}
        placeholder={"code: " + code}
      />
    </GridCol>
  );
}

export function VarcharText({
  code,
  name,
  pastValue = null,
  description = null,
}) {
  // condition for checking if component should be large
  const largeCondition = description ? description.length > 100 : false;
  const textRef = useRef(null);

  // TODO: maybe code in description tooltip?
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
            <Text size="md">{pastValue}</Text>
          </Stack>
        </div>
      </Tooltip>
    </GridCol>
  );
}
