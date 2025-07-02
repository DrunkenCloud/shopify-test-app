import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  TextField,
  InlineGrid,
  Button
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node"; 
import { useLoaderData, Form } from "@remix-run/react";

// import prisma-db
import db from "../db.server"

export async function loader() {

  let settings = await db.settings.findFirst();
  console.log("Settings: ", settings);
  return json(settings);
}

export async function action({request}) {
  let settings =  await request.formData();
  settings = Object.fromEntries(settings)

  await db.settings.upsert({
    where: {
      id: '1'
    },
    create: {
      id: '1',
      name: settings.name,
      description: settings.description
    },
    update: {
      id: '1',
      name: settings.name,
      description: settings.description
    }
  })

  return json( settings );
}

export default function SettingsPage() {
  
  const settings = useLoaderData();
  const [formSaved, setFormSaved] = useState(settings);
  
  return (
    <Page>
      <TitleBar title="Settings page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", sm: "2fr 5fr"}} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="App name" name="name" value={formSaved?.name} onChange={(value) => setFormSaved({ ...formSaved, name:value})} />
                <TextField label="Description" name="description" value={formSaved?.description} onChange={(value) => setFormSaved({ ...formSaved, description:value})} />

                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
