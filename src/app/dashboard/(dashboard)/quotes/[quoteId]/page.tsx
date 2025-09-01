"use client";
"use client";

import { FC, ReactNode, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Group,
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

interface Field {
  name: string;
  value: string;
}

interface Job {
  title: string;
  hours: string;
  price: string;
  description: string;
  team: string;
}

export default function QuotePage() {
  return (
    <Flex w="100%" align="start">
      <Flex direction="column" py={20}>
        {/* HEADER */}
        <Group justify="space-between" mb="lg" ml={60}>
          <Title order={2}>Quote #1023</Title>
        </Group>

        <Flex align="center" justify="space-between" ml={60} mr={30} mb={20}>
          <Group>
            <Button variant="default">Preview & Send</Button>

            <Button color="green">Approve</Button>
            <Button color="red">Decline</Button>
            <Button variant="light">Download</Button>
          </Group>

          <SegmentedControl
            size="xs"
            data={[
              { label: "Edit", value: "edit" },
              { label: "Preview", value: "preview" },
            ]}
          />
        </Flex>
        <Porposal />
      </Flex>

      <Card w="400px" m={20} pos="sticky" top={20}>
        <Flex direction="column" w="500px" bg="white" gap={10}>
          <Text fw={500} size="lg">
            Display
          </Text>

          <SidebarFieldRow
            title="Currency"
            field={<Select placeholder="BRL" />}
          />

          <SidebarFieldRow
            title="Taxes"
            field={<TextInput placeholder="0%" />}
          />

          <Text fw={500}>Introduction</Text>

          <Flex direction="column">
            {[...Array(3)].map(() => (
              <Flex align="center" gap={10}>
                <Checkbox />

                <Text>asoisd odis dosad so </Text>
              </Flex>
            ))}
          </Flex>

          <Text fw={500}>Items</Text>

          <Flex direction="column">
            {[...Array(3)].map(() => (
              <Flex align="center" gap={10}>
                <Checkbox />

                <Text>asoisd odis dosad so </Text>
              </Flex>
            ))}
          </Flex>

          <Text fw={500}>Footer</Text>

          <Flex direction="column">
            {[...Array(3)].map(() => (
              <Flex align="center" gap={10}>
                <Checkbox />

                <Text>asoisd odis dosad so </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

const SidebarFieldRow: FC<{ title: string; field: ReactNode }> = ({
  title,
  field,
}) => (
  <Flex align="center" gap={10}>
    <Text w="100px">{title}</Text>

    {field}
  </Flex>
);

const Porposal = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const addField = () => setFields([...fields, { name: "", value: "" }]);
  const removeField = (index: number) =>
    setFields(fields.filter((_, i) => i !== index));

  const addJob = (index?: number) => {
    const newJob: Job = {
      title: "",
      hours: "",
      price: "",
      description: "",
      team: "",
    };
    if (index !== undefined) {
      const newJobs = [...jobs];
      newJobs.splice(index, 0, newJob); // adiciona ACIMA do job clicado
      setJobs(newJobs);
    } else {
      setJobs([...jobs, newJob]); // adiciona no final
    }
  };

  const removeJob = (index: number) =>
    setJobs(jobs.filter((_, i) => i !== index));

  const updateField = (index: number, key: keyof Field, value: string) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const updateJob = (index: number, key: keyof Job, value: string) => {
    const newJobs = [...jobs];
    newJobs[index][key] = value;
    setJobs(newJobs);
  };

  const total = jobs.reduce(
    (acc, job) =>
      acc + parseFloat(job.price || "0") * parseFloat(job.hours || "0"),
    0
  );
  const taxes = total * 0.1;

  return (
    <Flex direction="column" w="100%">
      <Text pl={60} fw={500} fz={20}>
        Proposal
      </Text>

      <Flex gap={20} pl={60} pr={30} py={20}>
        <Box w="150px" h="150px" bg="blue" />

        <Flex direction="column" gap={10} flex={1}>
          <Flex direction="column" gap={10}>
            <Text fw={500}>Faosidj asidjsaiod aodsaidiaosdoai</Text>
            <Text fw={300}>Slogan slogan Slogan slogan Slogan slogan</Text>
          </Flex>
          <Text>aDDRES OAISDJ ADaoid aosds aodi, 4039</Text>
        </Flex>

        {/* FIELDS */}
        <Flex direction="column" w="300px" gap={10}>
          {fields.map((field, index) => (
            <Flex gap={10} key={index}>
              <TextInput
                placeholder="Field name"
                value={field.name}
                onChange={(e) => updateField(index, "name", e.target.value)}
              />
              <TextInput
                placeholder="Field value"
                value={field.value}
                onChange={(e) => updateField(index, "value", e.target.value)}
              />
              <Button color="red" onClick={() => removeField(index)}>
                Remove
              </Button>
            </Flex>
          ))}
          <Button variant="outline" onClick={addField}>
            Add field
          </Button>
        </Flex>
      </Flex>

      <Flex pl={60} pr={30} gap={20} mb={10}>
        <Flex align="center" gap={10}>
          <Text>Identifier</Text>
          <TextInput placeholder="Quote number" />
        </Flex>
        <Flex align="center" gap={10}>
          <Text>Date</Text>
          <DateInput />
        </Flex>
      </Flex>

      <Flex w="100%" direction="column" pl={60} pr={30} gap={10}>
        <TextInput placeholder="Title" />
        <Textarea placeholder="Description" autosize minRows={3} />
      </Flex>

      {/* JOBS */}
      {jobs.map((job, index) => (
        <Flex direction="column" w="100%" gap={10} px={30} key={index} pl={60}>
          {/* ADD JOB ACIMA */}
          <Flex align="center" gap={10} mt={5}>
            <Button variant="outline" onClick={() => addJob(index)}>
              Add job above
            </Button>
            <Divider flex={1} />
          </Flex>

          <Flex gap={4} align="flex-end">
            <TextInput
              flex={1}
              placeholder="Title area"
              value={job.title}
              onChange={(e) => updateJob(index, "title", e.target.value)}
            />
            <TextInput
              placeholder="0h"
              value={job.hours}
              onChange={(e) => updateJob(index, "hours", e.target.value)}
            />
            <TextInput
              leftSection="R$"
              placeholder="00.00"
              value={job.price}
              onChange={(e) => updateJob(index, "price", e.target.value)}
            />
            <TextInput
              placeholder="Team"
              value={job.team}
              onChange={(e) => updateJob(index, "team", e.target.value)}
            />
            <Button color="red" onClick={() => removeJob(index)}>
              Remove
            </Button>
          </Flex>
          <Textarea
            autosize
            mr={300}
            minRows={3}
            placeholder="Task descriptions"
            mt={5}
            value={job.description}
            onChange={(e) => updateJob(index, "description", e.target.value)}
          />
        </Flex>
      ))}

      {/* ADD JOB NO FINAL */}
      <Flex align="center" gap={10} px={30} mt={10} pl={60}>
        <Button variant="outline" onClick={() => addJob()}>
          Add job
        </Button>
        <Divider flex={1} />
      </Flex>

      <Card mr={30} ml={60} mt={10}>
        <Flex justify="space-between">
          <Text>Total: R${total.toFixed(2)}</Text>
          <Text>Taxes: R${taxes.toFixed(2)}</Text>
          <Text>Currency: BRL</Text>
          <Text>
            Team on job:{" "}
            {jobs
              .map((j) => j.team)
              .filter(Boolean)
              .join(", ")}
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

// import {
//   Box,
//   Button,
//   Divider,
//   Flex,
//   Text,
//   Textarea,
//   TextInput,
// } from "@mantine/core";
// import { DateInput } from "@mantine/dates";

// export default function QuotePage() {
//   return (
//     <>
//       <Flex direction="column" w="100%">
//         <Text pl={60}>Proposal</Text>

//         <Flex gap={20} pl={60} pr={30} py={20}>
//           <Box w="150px" h="150px" bg="blue" />

//           <Flex direction="column" gap={10} flex={1}>
//             <Flex direction="column" gap={10}>
//               <Text fw={500}>Faosidj asidjsaiod aodsaidiaosdoai</Text>

//               <Text fw={300}>Slogan slogan Slogan slogan Slogan slogan</Text>
//             </Flex>

//             <Text>aDDRES OAISDJ ADaoid aosds aodi, 4039</Text>
//           </Flex>

//           <Flex direction="column" w="300px" gap={10}>
//           <Flex gap={10}>
//             <TextInput placeholder="Field name" />

//             <TextInput placeholder="Field value" />

//             <Button>Remove</Button>
//           </Flex>

//           <Button variant="transparent">Add field</Button>
//           </Flex>
//         </Flex>

//         <Flex pl={60} pr={30} gap={20} mb={10}>
//           <Flex align="center" gap={10}>
//             <Text fw="">Identifier</Text>

//             <TextInput placeholder="Quote number" />
//           </Flex>

//           <Flex align="center" gap={10}>
//             <Text>Date</Text>

//             <DateInput />
//           </Flex>
//         </Flex>

//         <Flex w="100%" direction="column" pl={60} pr={30} gap={10}>
//           <TextInput placeholder="Title" />

//           <Textarea placeholder="Description" autosize minRows={3} />
//         </Flex>

//         {[...Array(3)].map(() => (
//           <Flex direction="column" w="100%" gap={10} px={30}>
//             <Flex align="center" gap={10}>
//               <Button variant="transparent">Add job</Button>

//               <Divider flex={1} />
//             </Flex>

//             <Flex direction="column" w="100%" pl={30}>
//               <Flex gap={4}>
//                 <TextInput flex={1} placeholder="Title area" />

//                 <Flex gap={4}>
//                   <TextInput placeholder="0h" />

//                   <TextInput leftSection="R$" placeholder="00.00" />
//                 </Flex>

//                 <Button>Remove</Button>
//               </Flex>

//               <Textarea
//                 autosize
//                 mr={300}
//                 minRows={3}
//                 placeholder="Task descriptions"
//                 mt={5}
//               />
//             </Flex>
//           </Flex>
//         ))}

//         <Flex align="center" gap={10} px={30}>
//           <Button variant="transparent">Add job</Button>

//           <Divider flex={1} />
//         </Flex>
//       </Flex>
//     </>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   Button,
//   Card,
//   Checkbox,
//   Divider,
//   Group,
//   Stack,
//   Table,
//   Text,
//   Title,
//   TextInput,
//   NumberInput,
//   Container,
// } from "@mantine/core";

// export default function QuotePage() {
//   const [items, setItems] = useState([
//     { id: 1, group: "Planning", name: "Research & Strategy", qty: 5, price: 120 },
//     { id: 2, group: "Artwork", name: "Landing page redesign", qty: 2, price: 800 },
//   ]);

//   const [displaySettings, setDisplaySettings] = useState({
//     quoteNumber: true,
//     companyName: true,
//     lineItems: true,
//     subtotals: true,
//     terms: false,
//   });

//   const handleItemChange = (id: number, field: string, value: any) => {
//     setItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
//     );
//   };

//   const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;

//   return (
//     <Container fluid p="lg">
//       {/* HEADER */}
//       <Group justify="space-between" mb="lg">
//         <Title order={2}>Quote #1023</Title>
//         <Group>
//           <Button variant="default">Preview & Send</Button>
//           <Button variant="default">Merge</Button>
//           <Button variant="default">Reorder</Button>
//           <Button color="green">Approve</Button>
//           <Button color="red">Decline</Button>
//           <Button variant="light">Download</Button>
//         </Group>
//       </Group>

//       <Group align="flex-start" grow>
//         {/* MAIN CONTENT */}
//         <Stack flex={2} gap="lg">
//           <Card shadow="sm" radius="md" p="lg">
//             <Title order={3}>Proposal: New Website</Title>
//             <Text c="dimmed">Prepared for: Acme Inc.</Text>
//             <Divider my="md" />

//             <Table highlightOnHover withColumnBorders>
//               <Table.Thead>
//                 <Table.Tr>
//                   <Table.Th>Group</Table.Th>
//                   <Table.Th>Item</Table.Th>
//                   <Table.Th>Qty</Table.Th>
//                   <Table.Th>Price</Table.Th>
//                   <Table.Th>Total</Table.Th>
//                 </Table.Tr>
//               </Table.Thead>
//               <Table.Tbody>
//                 {items.map((item) => (
//                   <Table.Tr key={item.id}>
//                     <Table.Td>{item.group}</Table.Td>
//                     <Table.Td>
//                       <TextInput
//                         value={item.name}
//                         onChange={(e) =>
//                           handleItemChange(item.id, "name", e.target.value)
//                         }
//                       />
//                     </Table.Td>
//                     <Table.Td>
//                       <NumberInput
//                         value={item.qty}
//                         min={1}
//                         onChange={(val) =>
//                           handleItemChange(item.id, "qty", val || 1)
//                         }
//                       />
//                     </Table.Td>
//                     <Table.Td>
//                       <NumberInput
//                         value={item.price}
//                         min={0}
//                         onChange={(val) =>
//                           handleItemChange(item.id, "price", val || 0)
//                         }
//                       />
//                     </Table.Td>
//                     <Table.Td>${(item.qty * item.price).toFixed(2)}</Table.Td>
//                   </Table.Tr>
//                 ))}
//               </Table.Tbody>
//             </Table>

//             <Divider my="md" />
//             <Stack gap="xs" align="flex-end">
//               <Group>
//                 <Text>Subtotal:</Text>
//                 <Text fw={500}>${subtotal.toFixed(2)}</Text>
//               </Group>
//               <Group>
//                 <Text>Tax (10%):</Text>
//                 <Text fw={500}>${tax.toFixed(2)}</Text>
//               </Group>
//               <Group>
//                 <Text>Total:</Text>
//                 <Text fw={700} size="lg">
//                   ${total.toFixed(2)}
//                 </Text>
//               </Group>
//             </Stack>
//           </Card>
//         </Stack>

//         {/* SIDEBAR */}
//         <Card shadow="sm" radius="md" p="lg" flex={1}>
//           <Title order={4} mb="sm">
//             Display Settings
//           </Title>
//           <Divider mb="md" />
//           <Stack>
//             <Checkbox
//               label="Quote Number"
//               checked={displaySettings.quoteNumber}
//               onChange={(e) =>
//                 setDisplaySettings((s) => ({ ...s, quoteNumber: e.target.checked }))
//               }
//             />
//             <Checkbox
//               label="Company Name"
//               checked={displaySettings.companyName}
//               onChange={(e) =>
//                 setDisplaySettings((s) => ({ ...s, companyName: e.target.checked }))
//               }
//             />
//             <Checkbox
//               label="Line Items"
//               checked={displaySettings.lineItems}
//               onChange={(e) =>
//                 setDisplaySettings((s) => ({ ...s, lineItems: e.target.checked }))
//               }
//             />
//             <Checkbox
//               label="Subtotals"
//               checked={displaySettings.subtotals}
//               onChange={(e) =>
//                 setDisplaySettings((s) => ({ ...s, subtotals: e.target.checked }))
//               }
//             />
//             <Checkbox
//               label="Terms & Conditions"
//               checked={displaySettings.terms}
//               onChange={(e) =>
//                 setDisplaySettings((s) => ({ ...s, terms: e.target.checked }))
//               }
//             />
//           </Stack>
//         </Card>
//       </Group>
//     </Container>
//   );
// }

// import React, { useState } from "react";
// import {
//   Button,
//   TextInput,
//   Textarea,
//   NumberInput,
//   Group,
//   Stack,
//   Title,
//   Divider,
//   Drawer,
//   Checkbox,
//   Table,
//   ActionIcon,
//   Text,
//   Box,
//   Paper,
//   Flex,
// } from "@mantine/core";
// import {
//   IconPlus,
//   IconTrash,
//   IconSend,
//   IconCheck,
//   IconX,
// } from "@tabler/icons-react";
// import { DateInput, DatePicker } from "@mantine/dates";

// // Types
// interface QuoteItem {
//   id: string;
//   description: string;
//   qty: number;
//   unit: number;
// }

// interface Quote {
//   id: string;
//   title: string;
//   clientName: string;
//   clientEmail: string;
//   items: QuoteItem[];
//   notes: string;
//   status: "draft" | "sent" | "approved" | "refused";
// }

// const uid = () => Math.random().toString(36).slice(2, 9);

// export default function QuotePage() {
//   const [quote, setQuote] = useState<Quote>({
//     id: uid(),
//     title: "Nova Proposta",
//     clientName: "",
//     clientEmail: "",
//     items: [
//       { id: uid(), description: "Design inicial", qty: 1, unit: 1000 },
//     ],
//     notes: "",
//     status: "draft",
//   });

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const subtotal = quote.items.reduce((s, it) => s + it.qty * it.unit, 0);
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;

//   const updateItem = (id: string, patch: Partial<QuoteItem>) => {
//     setQuote((q) => ({
//       ...q,
//       items: q.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
//     }));
//   };

//   const addItem = () => {
//     setQuote((q) => ({
//       ...q,
//       items: [...q.items, { id: uid(), description: "Novo item", qty: 1, unit: 0 }],
//     }));
//   };

//   const removeItem = (id: string) => {
//     setQuote((q) => ({ ...q, items: q.items.filter((it) => it.id !== id) }));
//   };

//   return (
//     <Box p="md">
//       <Paper shadow="sm" p="lg" radius="md">
//         <Group position="apart">
//           <Title order={2}>{quote.title}</Title>
//           <Group>
//             <Button leftIcon={<IconCheck size={16} />} color="green" onClick={() => setQuote({ ...quote, status: "approved" })}>Aprovar</Button>
//             <Button leftIcon={<IconX size={16} />} color="red" onClick={() => setQuote({ ...quote, status: "refused" })}>Recusar</Button>
//             <Button leftIcon={<IconSend size={16} />} onClick={() => setQuote({ ...quote, status: "sent" })}>Enviar</Button>
//           </Group>
//         </Group>

//         <Divider my="md" />

//         <Stack spacing="md">
//           <Group grow>
//             <TextInput label="Nome do cliente" value={quote.clientName} onChange={(e) => setQuote({ ...quote, clientName: e.currentTarget.value })} />
//             <TextInput label="E-mail do cliente" value={quote.clientEmail} onChange={(e) => setQuote({ ...quote, clientEmail: e.currentTarget.value })} />
//           </Group>

//           <Title order={4}>Itens</Title>
//           <Table highlightOnHover withBorder>
//             <thead>
//               <tr>
//                 <th>Descrição</th>
//                 <th>Qtd</th>
//                 <th>Valor unitário</th>
//                 <th>Ações</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quote.items.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <TextInput value={item.description} onChange={(e) => updateItem(item.id, { description: e.currentTarget.value })} />
//                   </td>
//                   <td>
//                     <NumberInput value={item.qty} onChange={(v) => updateItem(item.id, { qty: Number(v) })} />
//                   </td>
//                   <td>
//                     <NumberInput value={item.unit} onChange={(v) => updateItem(item.id, { unit: Number(v) })} />
//                   </td>
//                   <td>
//                     <ActionIcon color="red" onClick={() => removeItem(item.id)}>
//                       <IconTrash size={16} />
//                     </ActionIcon>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Button variant="light" leftIcon={<IconPlus size={16} />} onClick={addItem}>Adicionar item</Button>

//           <Textarea label="Notas" value={quote.notes} onChange={(e) => setQuote({ ...quote, notes: e.currentTarget.value })} />

//           <Divider />

//           <Stack spacing="xs">
//             <Text>Subtotal: R$ {subtotal.toFixed(2)}</Text>
//             <Text>Impostos (10%): R$ {tax.toFixed(2)}</Text>
//             <Text weight="bold">Total: R$ {total.toFixed(2)}</Text>
//           </Stack>
//         </Stack>

//         <Divider my="lg" />

//         <Button onClick={() => setDrawerOpen(true)}>Abrir Drawer de opções</Button>
//         <Drawer opened={drawerOpen} onClose={() => setDrawerOpen(false)} title="Opções adicionais" padding="xl" size="md">
//           <Stack>
//             <Checkbox.Group value={selectedOptions} onChange={setSelectedOptions} label="Selecione opções extras">
//               <Checkbox value="urgente" label="Entrega urgente" />
//               <Checkbox value="suporte" label="Suporte extendido" />
//               <Checkbox value="manutencao" label="Manutenção inclusa" />
//             </Checkbox.Group>
//           </Stack>
//         </Drawer>
//       </Paper>
//     </Box>
//   );
// }
