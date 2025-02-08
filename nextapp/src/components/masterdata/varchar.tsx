// component for rendering masterdata properties of type: varchar
"use client";
import { useState } from "react";
import { TextInput, GridCol } from "@mantine/core";

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

const gridSpan = { base: 12, md: 6, lg: "content" };

export default function VarcharForm({
  code,
  name,
  description,
  pastValue = null,
  editable = true,
  mandatory = false,
  error = null,
}: VarcharFormProps) {
  const [value, setValue] = useState("");
  // condition for checking if component should be large
  const largeCondition = description.length > 100 || name.length > 100;

  return (
    <GridCol span={largeCondition ? 12 : gridSpan}>
      <TextInput
        size="md"
        radius="md"
        label={name}
        value={pastValue} // TODO: controlled value react
        onChange={(event) => setValue(event.currentTarget.value)}
        disabled={!editable}
        withAsterisk={mandatory}
        description={description}
        error={error}
        placeholder={"code: " + code}
      />
    </GridCol>
  );
}
