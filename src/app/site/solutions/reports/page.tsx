"use client";

import { useQuoteReport } from "@/api/dashboard/reports.api";
import { TextCentralized } from "@/components/site/molecules/text-centralized";
import { TextNextToImage } from "@/components/site/molecules/text-next-to-image";
import {
  Button,
  Card,
  Flex,
  Image,
  Text,
} from "@mantine/core";

export default function Reports() {
  return (
    <Flex w="100%" direction="column" align="center">
      <Flex
        w={{ base: "100%", md: "950px", lg: "1200px" }}
        px={20}
        justify="space-between"
        gap={40}
        align="center"
        py={20}
      >
        <Flex direction="column">
          <Flex gap={5} align="center">
            <Text px={10} py={5} bg="yellow">
              TeamTime
            </Text>

            <Text>for Reports & Analytics</Text>
          </Flex>

          <Flex direction="column" gap={20} mt={20}>
            <Text size="2xl">
              Unlock strategy and planning for your enterprise
            </Text>

            <Text>
              Align work planning and delivery to strategy across the entire
              enterprise.
            </Text>

            <Flex gap={5}>
              <Button variant="light">Schedule a demo</Button>

              <Button>Start your trial now</Button>
            </Flex>
          </Flex>
        </Flex>

        <Image
          alt=""
          bg="blue"
          width={500}
          height={300}
          src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
        />
      </Flex>

      <Flex justify="center" py={50} bg="violet.5" w="100%">
        <Flex align="center" justify="space-between" w="950px">
          <Flex direction="column" w="600px">
            <Text fw={500} size="2xl">
              Annalytics can aoidasiodas dasjd oisa jdosajd oaisjd oaisjd oasdj
              a
            </Text>

            <Text>
              asdiasuhdua asdasdasd sadsad ash dasodias diosadiosadaosid asoi
              dsaoi d
            </Text>
          </Flex>

          <Image
            alt=""
            bg="blue"
            width={300}
            height={100}
            src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
          />
        </Flex>
      </Flex>

      <Flex direction="column" py={50} w="950px" gap={20}>
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

        <Flex wrap="wrap" gap={"20px"} mt={50}>
          {[...Array(6)].map(() => (
            <Card w="calc(50% - 10px)">
              <Flex direction="column" gap={10}>
                <Text size="2xl">
                  sadoisajd soaidj soaidjosiadj oisadj sajd asoidj asodj as
                </Text>

                <Text size="md">asdoisajdioasjd aisojdaosid osaidjsao i</Text>

                <Image
                  alt=""
                  bg="blue"
                  width={500}
                  height={300}
                  src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
                />
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

      <Flex w="900px">
        <Card w="100%" mt={-30} mb={50}>
          <Flex justify="space-between" align="center">
            <Flex direction="column" gap={5}>
              <Text size="2xl">
                “If you can’t measure it, you can’t manage it.”
              </Text>

              <Text>Marcelo Grassano</Text>

              <Text>CEO, acdis</Text>

              <Flex gap={10} mt={10}>
                <Button>Start your trial now</Button>

                <Button>Book a shceudle</Button>
              </Flex>
            </Flex>

            <Image
              alt=""
              bg="blue"
              width={300}
              height={200}
              src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
            />
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
