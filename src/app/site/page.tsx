"use client";

import { Datepicker } from "@/components/dashboard/atoms/datepicker";
import { ButtonFormTask } from "@/components/dashboard/molecules/button-form-task";
import { BoardTodo } from "@/components/dashboard/organisms/board-todo";
import { TextCentralized } from "@/components/site/molecules/text-centralized";
import { TextNextToImage } from "@/components/site/molecules/text-next-to-image";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconRobot,
  IconRobotFace,
  IconStar,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <Flex direction="column" align="center">
      {/* Hero header */}
      <Flex
        direction="column"
        w={{ base: "100%", md: "950px", lg: "1200px" }}
        gap={20}
        px={20}
      >
        <Flex justify="center" gap={50} py={50}>
          {[...Array(4)].map(() => (
            <Flex direction="column" gap={10}>
              <Flex gap={10} align="center">
                <Image src="#" w="30px" h="30px" />

                <Flex direction="column">
                  <Text size="md" fw={500}>
                    Title asiodsdoi sdiosd js
                  </Text>

                  <Text size="sm" c="dimmed">
                    Facebook
                  </Text>
                </Flex>
              </Flex>

              <Flex>
                {[...Array(5)].map(() => (
                  <IconStar size="13px" />
                ))}
              </Flex>

              <Text>"Amazing social media scheduler"</Text>
            </Flex>
          ))}
        </Flex>

        <Flex direction="column" gap={20} align="center">
          <Badge radius="sm" size="sm" variant="light" py={10}>
            <Flex align="center" gap={5}>
              <IconRobotFace size={15} /> Automação com IA
            </Flex>
          </Badge>

          <Text ta="center" size="40px" fw={700}>
            Sua presença online rodando no automático
          </Text>

          <Text ta="center" size="20px" fw={500}>
            Postfy cria, agenda e publica conteudo pra você nas redes sociais
          </Text>

          <Text
            ta="center"
            size="sm"
            style={{
              maxWidth: "500px",
            }}
          >
            Postfy, a inteligência artificial que entende sua marca, se ajusta
            ao seu estilo e produz conteúdo que engaja o público em todas as
            redes sociais.
          </Text>

          <Button radius="sm">Criar minha conta e começar agora mesmo</Button>
        </Flex>

        <Flex justify="center" gap={10} mt={50}>
          <Flex
            w="1200px"
            h="400px"
            bg="violet"
            style={{
              borderRadius: "5px",
            }}
          />
        </Flex>
      </Flex>

      <Flex
        bg="violet"
        py={50}
        w="100%"
        justify="center"
        mt={-10}
        style={{
          boxShadow: "0px 0px 5px violet",
        }}
      >
        <Flex direction="column" gap={50} py={20} align="center">
          <Flex
            justify="center"
            w={{ base: "calc(100% - 100px)", md: "100%" }}
            mb={{ base: "20px", md: "0px" }}
          >
            <TextCentralized
              label="What makes TeamTime special?"
              title="What amke TeamTime special"
              descriptions={[
                "When communities pay for a subscription on Substack, an average of 86% of the revenue goes to the publisher, with the remainder covering our revenue share and Stripe’s payment processing fees. Since we only make money when writers and creators do, our interests are aligned with those of publishers and their subscribers. To date, subscribers have paid writers and creators hundreds of millions of dollars through Substack.",
              ]}
              textProps={{
                c: "white",
              }}
              descriptionProps={{
                color: "#CCC",
              }}
            />
          </Flex>

          {[...Array(4)].map((_, key) => (
            <TextNextToImage
              contents={[
                {
                  label: "1. Brain AI",
                  title:
                    "Uma camada de inteligência em crescimento que sabe o que funciona, onde e por quê — e treina a IA para escrever de acordo.",
                  description:
                    "Aprende com o sucesso específico da plataforma, atualiza com mudanças de algoritmo e otimiza cada post com dados reais",
                },
              ]}
              textProps={{
                c: "white",
              }}
              descriptionProps={{
                c: "white",
              }}
              justify={key !== 1 && key !== 3 ? "row-reverse" : "row"}
              imageSize={{
                lg: "600px",
                md: "390px",
                sm: "220px",
                base: "100%",
              }}
              image="https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp"
            />
          ))}
        </Flex>
      </Flex>

      <Flex w="100%" justify="center">
        <Flex direction="column" w="1200px" gap={50} py={50}>
          <TextCentralized
            label="Publique todos os dias"
            title="Como sua presença online poderia ser"
            descriptions={[
              "Conteúdo estratégico e designs impactantes, adaptados para cada rede social diariamente.",
            ]}
            descriptionProps={{
              color: "dimmed",
            }}
          />

          <Flex gap={20} w="100%">
            {[...Array(2)].map(() => (
              <Flex direction="column" gap={20} flex={1}>
                <Card p={0} withBorder={false}>
                  <Image src="https://miro.medium.com/v2/resize:fit:1002/1*BCw5I1J5mIYutcgVDcAhnw.png" />
                </Card>

                <Card p={0} withBorder={false}>
                  <Image src="https://miro.medium.com/v2/resize:fit:1002/1*BCw5I1J5mIYutcgVDcAhnw.png" />
                </Card>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" w="1200px" py={50}>
        <TextCentralized
            title="Plans"
            descriptions={[
              "Impacte e alcance novos publicos com a Postfy",
            ]}
            descriptionProps={{
              color: "dimmed",
            }}
          />

        <Grid w="100%" mt={50}>
          {plans.map((plan) => (
            <Grid.Col span={4} key={plan.name}>
              <Card
                withBorder
                shadow={plan.highlighted ? "md" : "sm"}
                radius="md"
                padding="lg"
                style={{
                  borderColor: plan.highlighted ? "#7A4DFF" : undefined,
                }}
              >
                <Stack>
                  <Flex direction="column">
                    <Title order={3}>{plan.name}</Title>

                    <Text c="dimmed">Perfect for growing businesses</Text>
                  </Flex>

                  <Text size="xl" fw={700}>
                    {plan.price}
                  </Text>

                  <Stack gap="xs">
                    {plan.features.map((feature) => (
                      <Text key={feature} size="sm" c="dimmed">
                        • {feature}
                      </Text>
                    ))}
                  </Stack>

                  <Group justify="center" mt="md">
                    <Button
                      fullWidth
                      radius="md"
                      variant={plan.highlighted ? "filled" : "light"}
                      color="violet"
                    >
                      {plan.highlighted ? "Get started" : "Choose"}
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}

const cardsAreas = [
  {
    title: "Jobs & Projects",
    description:
      "Criação, organização e acompanhamento de jobs e tarefas da equipe",
  },
  {
    title: "Team & Timesheets",
    description:
      "Controle de horas trabalhadas por cada membro, alocação de tarefas",
  },
  {
    title: "Budget & Profit",
    description: "Cálculo de custo vs. preço, lucro de cada job",
  },
  {
    title: "Cliente management & proposal",
    description: "Dados e informações do cliente ligados a cada job",
  },
  {
    title: "Reports & Analytics",
    description:
      "Relatórios de performance, tempo gasto e lucros por projeto ou equipe",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 project", "Community support", "Basic analytics"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: ["Unlimited projects", "Priority support", "Advanced analytics"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Dedicated manager", "Custom features", "24/7 support"],
    highlighted: false,
  },
];
