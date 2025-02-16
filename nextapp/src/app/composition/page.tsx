import { Grid, Container, Title, Divider, Text } from "@mantine/core";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";

import { VarcharForm, VarcharText } from "@/components/masterdata/varchar";

import placeholderData from "@/../public/placeholder.json";

export default function Testcomponents() {
  const demoProps = {
    h: 50,
    mt: "md",
  };

  return (
    <Container {...demoProps} fluid>
      <Title order={2} mb={"md"}>
        Object Property Components
      </Title>
      <Divider mb={"sm"} />
      <Tabs defaultValue="Varchar" orientation="vertical">
        <TabsList mr={"lg"}>
          <TabsTab value="Boolean">Boolean</TabsTab>
          <TabsTab value="Date">Date</TabsTab>
          <TabsTab value="Hyperlink">Hyperlink</TabsTab>
          <TabsTab value="Integer">Integer</TabsTab>
          <TabsTab value="Multiline">Multiline</TabsTab>
          <TabsTab value="Object">Object</TabsTab>
          <TabsTab value="Real">Real</TabsTab>
          <TabsTab value="Timestamp">Timestamp</TabsTab>
          <TabsTab value="Varchar">Varchar</TabsTab>
          <TabsTab value="Vocabulary">Vocabulary</TabsTab>
          <TabsTab value="XML">XML</TabsTab>
        </TabsList>

        <TabsPanel value="Varchar">
          <Text size="md" mb={"md"}>
            The following components are examples for the OpenBIS{" "}
            <strong>VARCHAR</strong> property data type. First the form inputs.
          </Text>
          <Grid grow={true}>
            <VarcharForm
              code="$NAME"
              name="Name (OpenBIS Label)"
              description="Description of the property (OpenBIS Description)"
              editable={true}
            />
            <VarcharForm
              code="$NAME"
              name="Name (pre-filled)" // TODO: controlled value react
              pastValue="Example value in Varchar input" // NOTE: the grid width is according to description length and not the pastValue length
              description="Description of the property"
              editable={true}
            />
            <VarcharForm
              code="$REQUIRED"
              name="Necessary Input"
              description="This field must be filled in before saving (OpenBIS Mandatory = true)"
              editable={true}
              mandatory={true}
            />
            <VarcharForm
              code="$REQUIRED"
              name="Necessary Input"
              description="If the field is empty, an error message is displayed"
              editable={true}
              mandatory={true}
              error="This field is required"
            />
            <VarcharForm
              code="$ERROR"
              name="Field with Error"
              description="Currently not supported by OpenBIS" // NOTE: Maybe useful with entity validation plugin
              editable={true}
              error="Input must be longer than 12 characters"
            />
            <VarcharForm
              code="$DISABLED"
              name="Disabled Input"
              description="The input is disabled (OpenBIS Editable = false)"
              editable={false}
            />
            <VarcharForm
              code="$LONGNAME"
              name="Long Name with more than 100 characters, currently set as the limit for the grid width. The long name should be displayed fully."
              description="A very long name is not clamped"
              editable={true}
            />
            <VarcharForm
              code="$LONGDESC"
              name="Long Description"
              description={placeholderData["lorem"]}
              editable={true}
            />
          </Grid>

          <Divider mt="lg" mb="lg" />

          <Text size="md" mb="lg">
            Now the text components.
          </Text>
          <Grid grow={true}>
            <VarcharText
              code="$NAME"
              name="Name (OpenBIS Label)"
              pastValue="Example value in Varchar text"
              description="The description of the property is rendered as a tooltip"
            />
            <VarcharText
              code="$NODESC"
              name="No Description"
              pastValue="If no description is provided, the tooltip is not displayed"
            />
            <VarcharText
              code="$LONGDESC"
              name="Long Description"
              pastValue="Long descriptions are multiline"
              description={placeholderData["lorem"]}
            />
          </Grid>
        </TabsPanel>

        <TabsPanel value="other">
          <div>Other</div>
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
