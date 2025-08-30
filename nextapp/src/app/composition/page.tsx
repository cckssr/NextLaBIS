import { Grid, Container, Title, Divider, Text } from "@mantine/core";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";

import { VarcharForm, VarcharText } from "@/components/masterdata/varchar";
import { BooleanForm, BooleanText } from "@/components/masterdata/boolean";

import placeholderData from "@/../public/placeholder.json";
import componentsData from "@/../public/components.json";
import { DateForm, DateText } from "@/components/masterdata/date";
import { TimestampForm } from "@/components/masterdata/timestamp";

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
            {componentsData.components.Varchar.form.map((component, index) => (
              <VarcharForm key={`varchar-form-${index}`} {...component} />
            ))}
          </Grid>

          <Divider mt="lg" mb="lg" />

          <Text size="md" mb="lg">
            Now the text components.
          </Text>
          <Grid grow={true}>
            {componentsData.components.Varchar.text.map((component, index) => (
              <VarcharText key={`varchar-text-${index}`} {...component} />
            ))}
          </Grid>
        </TabsPanel>

        <TabsPanel value="Boolean">
          <Text size="md" mb={"md"}>
            The following components are examples for the OpenBIS{" "}
            <strong>BOOLEAN</strong> property data type. First the form inputs.
          </Text>
          <Grid grow={true}>
            {componentsData.components.Boolean.form.map((component, index) => (
              <BooleanForm key={`boolean-form-${index}`} {...component} />
            ))}
          </Grid>

          <Divider mt="lg" mb="lg" />

          <Text size="md" mb="lg">
            Now the text components.
          </Text>
          {/* <Grid grow={true}>
            {componentsData.components.Boolean.text.map((component, index) => (
              <BooleanText key={`boolean-text-${index}`} {...component} />
            ))}
          </Grid> */}
        </TabsPanel>

        <TabsPanel value="Date">
          <Text size="md" mb={"md"}>
            The following components are examples for the OpenBIS{" "}
            <strong>DATE</strong> property data type. First the form inputs.
          </Text>
          <Grid grow={true}>
            {componentsData.components.Date.form.map((component, index) => (
              <DateForm key={`date-form-${index}`} {...component} />
            ))}
          </Grid>

          <Divider mt="lg" mb="lg" />

          <Text size="md" mb="lg">
            Now the text components.
          </Text>
          <Grid grow={true}>
            {componentsData.components.Date.text.map((component, index) => (
              <DateText key={`date-text-${index}`} {...component} />
            ))}
          </Grid>
        </TabsPanel>

        <TabsPanel value="Timestamp">
          <Text size="md" mb={"md"}>
            The following components are examples for the OpenBIS{" "}
            <strong>TIMESTAMP</strong> property data type. First the form
            inputs.
          </Text>
          <Grid grow={true}>
            {componentsData.components.Timestamp.form.map(
              (component, index) => (
                <TimestampForm key={`timestamp-form-${index}`} {...component} />
              )
            )}
          </Grid>

          <Divider mt="lg" mb="lg" />

          <Text size="md" mb="lg">
            Now the text components.
          </Text>
          {/* <Grid grow={true}>
            {componentsData.components.Timestamp.text.map((component, index) => (
              <BooleanText key={`boolean-text-${index}`} {...component} />
            ))}
          </Grid> */}
        </TabsPanel>

        <TabsPanel value="other">
          <div>Other</div>
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
