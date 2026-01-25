// component for rendering masterdata properties of type: boolean
"use client";
import { Checkbox, GridCol } from "@mantine/core";
import { useState } from "react";

// type information for the props
interface FormProps {
  name: string;
  description: string;
  pastValue?: boolean;
  editable?: boolean;
}

// set grid span for the component on different screen sizes
const gridSpan = { base: 12, sm: 6, lg: 4 };

export function BooleanForm({
  name,
  description,
  pastValue = false,
  editable = true,
}: FormProps) {
  const [checked, setChecked] = useState(pastValue);
  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;
  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <Checkbox
        label={name}
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
        disabled={!editable}
        description={description}
      />
    </GridCol>
  );
}

export function BooleanText() {
  return null;
}
