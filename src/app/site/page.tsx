"use client";

import { Datepicker } from "@/components/dashboard/atoms/datepicker";
import { ButtonFormTask } from "@/components/dashboard/molecules/button-form-task";
import { BoardTodo } from "@/components/dashboard/organisms/board-todo";
import { TextCentralized } from "@/components/site/molecules/text-centralized";
import { TextNextToImage } from "@/components/site/molecules/text-next-to-image";
import {
  Button,
  Card,
  Divider,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

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
        <Flex
          align="center"
          gap={{ base: 30, sm: 50 }}
          py={50}
          direction={{ base: "column", sm: "row" }}
        >
          <Flex
            direction="column"
            w="100%"
            gap={20}
            align={{ base: "center", sm: "start" }}
          >
            <Text size="2xl" fw={500}>
              Team, productivity and workflow management platform
            </Text>

            <Text size="md">
              A way better way of working Balance your workflow: plan, track,
              collaborate, thrive
            </Text>
          </Flex>

          <Flex direction="column" gap={10} w={{ base: "100%", sm: "600px" }}>
            <Text>Start your trial right now</Text>

            <TextInput placeholder="E-mail/login" />

            <PasswordInput placeholder="Password" />

            <TextInput
              placeholder="Subdomain"
              rightSectionWidth={120}
              rightSection={<Text>.teamtime.io</Text>}
            />

            <Button radius="sm" variant="light">
              Comecar agora mesmo
            </Button>

            <Flex w="100%" direction="column" align="center" my={10}>
              <Divider w="100%" />

              <Text mt={-25} mb={-25} bg="white" p={10}>
                ou
              </Text>
            </Flex>

            <Button radius="sm">Agente uma apresentacao</Button>
          </Flex>
        </Flex>

        <Flex gap={20} wrap={{ base: "wrap", md: "initial" }}>
          {cardsAreas.map((card) => (
            <Card
              w={{
                base: "calc(50% - 20px)",
                sm: "calc(33.3% - 20px)",
                md: "250px",
              }}
              withBorder={false}
              shadow="lg"
            >
              <Text fw={800} size="md" mb={20}>
                {card.title}
              </Text>

              <Text size="md" h="100px">
                {card.description}
              </Text>

              <Image
                alt=""
                bg="blue"
                height={400}
                src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
              />

              <Flex>
                <Button
                  size="sm"
                  rightSection={<IconArrowRight />}
                  variant="transparent"
                  m={0}
                  mt={20}
                >
                  See more
                </Button>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>

      <Flex bg="violet.3" py={50} w="100%" justify="center" mt={50}>
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
              descriptionProps={{
                color: "dimmed",
              }}
            />
          </Flex>

          {[...Array(3)].map((_, key) => (
            <TextNextToImage
              contents={[
                {
                  label: "asdasdasdas",
                  title: "doaisjdiasdjioasda",
                  description: "aosidjasiodjasoidas. aisdioas asi sa",
                },
                {
                  description:
                    "aosidjasiodjasoidas asidjasoidjasdio asoi djasiod aosijdoaisdj aos jdaoisd aosidj saoid joaisdj osadjaosidj asoid josijdaosid jasoid jasoidja soidja soida",
                },
              ]}
              justify={key !== 1 ? "row-reverse" : "row"}
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
        <Flex direction="column" w="950px" gap={50} py={50}>
          <TextCentralized
            label="What makes TeamTime special?"
            title="What amke TeamTime special"
            descriptions={[
              "When communities pay for a subscription on Substack, an average of 86% of the revenue goes to the publisher, with the remainder covering our revenue share and Stripe’s payment processing fees. Since we only make money when writers and creators do, our interests are aligned with those of publishers and their subscribers. To date, subscribers have paid writers and creators hundreds of millions of dollars through Substack.",
            ]}
            descriptionProps={{
              color: "dimmed",
            }}
          />

          <Flex gap={20} wrap="wrap" px={20} justify="center">
            {[...Array(3)].map(() => (
              <Card w={{base: "calc(50% - 20px)", md: "calc(33.3% - 20px)"}}>
                <Text size="lg">What amke TeamTime special</Text>

                <Text size="md">
                  A way better way of working Balance your workflow: plan,
                  track, collaborate, thrive
                </Text>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex w="200">
        <Divider flex={1} />
      </Flex>

      <Flex w="100%" align="center" direction="column" py={50}>
        <Flex justify="space-between" gap={100} direction={{base: "column", md: "row"}}>
          <Flex align="center" justify="center" flex={1} display={{base: "none", md: "flex"}}>
            <Button>Schedule a presentation</Button>
          </Flex>

          <Flex gap={20}>
            <Image
            display={{base: "none", sm: "block"}}
              alt="image"
              w={200}
              h={200}
              src="https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp"
            />

            <Flex gap={20} direction="column" w={300} px={20}>
              <Text fw={500} size="lg">
                "We've created one company more fair and with more productivity
                since we've stared with Teamtime and the company grew up 24%
              </Text>

              <Flex direction="column">
                <Text>Jose diniz Novello</Text>

                <Text>CEO, ioasjsaioda</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
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
