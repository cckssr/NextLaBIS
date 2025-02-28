// component for rendering masterdata properties of type: boolean
"use client";
import { Checkbox, GridCol } from "@mantine/core";
import { useState } from "react";
import { useDescriptionProps } from "./common_functions";

// type information for the props
interface FormProps {
  code: string;
  name: string;
  description: string;
  pastValue?: boolean;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

// set grid span for the component on different screen sizes
const gridSpan = { base: 12, sm: 6, lg: "content" };

export function BooleanForm({
  code,
  name,
  description,
  pastValue = false,
  editable = true,
  mandatory = false,
  error = null,
}: FormProps) {
  const [checked, setChecked] = useState(pastValue);
  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;
  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <Checkbox
        // size="md"
        // radius="md"
        label={name}
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
        disabled={!editable}
        withAsterisk={mandatory}
        description={description}
        // handle long descriptions with line clamp
        // TODO: remove if description is not long
        descriptionProps={useDescriptionProps()}
        error={error}
      />
    </GridCol>
  );
}

export function BooleanText({ code, name, description }) {
  return None;
}
