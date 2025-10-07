"use client";

import { TextNextToImage } from "@/components/site/molecules/text-next-to-image";
import {
  Button,
  Card,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import { IconDiamond } from "@tabler/icons-react";

export default function ContentAutomation() {
  return (
    <Flex direction="column" align="center">
      <Flex
        justify="center"
        align="center"
        w={{ base: "100%", md: "950px", lg: "1200px" }}
        gap={40}
        py={50}
        px={20}
        direction={{ base: "column", md: "row" }}
      >
        <Flex direction="column" gap={20}>
          <Text>Who we are</Text>

          <Text fw={500} size="2xl">
            We help teams and companies to change the world
          </Text>

          <Flex direction="column">
            <Text>We help teams and companies to change the world</Text>

            <Text>
              We help teams and companies to change the worlda doisajdosiajd
              saoij dsioajdiosad jsa
            </Text>

            <Text>
              We help teams and companies to change the worlda doisajdosiajd
              saoij dsioajdiosad jsa
            </Text>
          </Flex>
        </Flex>

        <Image
          alt=""
          bg="blue"
          width={500}
          src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
        />
      </Flex>

      <Flex justify="center" w="100%" display={{ base: "none", sm: "flex" }}>
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          gap="10px"
          wrap="wrap"
          justify="center"
        >
          {[...Array(3)].map(() => (
            <Flex
              gap={20}
              align="center"
              w="calc(33.3% - 10px)"
              justify="center"
            >
              <IconDiamond />

              <Text fw={500} size="lg">
                Inovacao sempre
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex
        w="100%"
        bg="violet.5"
        py={{ base: 0, md: 50 }}
        mt={50}
        justify="center"
        align="center"
      >
        <Flex w={{ base: "100%", md: "950px", lg: "1200px" }}>
          <Flex w="700px" bg="white" direction="column" gap={10} p={40}>
            <Text size="2xl">Brief history</Text>

            {[...Array(3)].map(() => (
              <Text>
                osdjasdoijsaiod jsoidjsa diosaiodsa jiodasijod ajsod ajsio sd
                sdsadsadsadsad asosdjasdoijsaiod jsoidjsa diosaiodsa jiodasijod
                ajsod ajsio sd sdsadsadsadsad asosdjasdoijsaiod jsoidjsa
                diosaiodsa jiodasijod ajsod ajsio sd sdsadsadsadsad
                asosdjasdoijsaiod jsoidjsa diosaiodsa jiodasijod ajsod ajsio sd
                sdsadsadsadsad as
              </Text>
            ))}
          </Flex>

          <Flex>
            <Image
              alt=""
              bg="blue"
              width={300}
              src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex bg="violet.1" w="100%" justify="center" pb={30}>
        <Flex direction="column" gap={40} py={50}>
          <TextNextToImage
            contents={[
              {
                label: "asdasdasdas",
                title: "doaisjdiasdjioasda",
                description: "aosidjasiodjasoidas. aisdioas asi sa",
              },
            ]}
            imageSize={{
              lg: "600px",
              md: "390px",
              sm: "220px",
              base: "500px",
            }}
            image="https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp"
          />

          <TextNextToImage
            contents={[
              {
                label: "asdasdasdas",
                title: "doaisjdiasdjioasda",
                description: "aosidjasiodjasoidas. aisdioas asi sa",
              },
            ]}
            imageSize={{
              lg: "600px",
              md: "390px",
              sm: "220px",
              base: "500px",
            }}
            image="https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp"
          />

          <TextNextToImage
            contents={[
              {
                label: "asdasdasdas",
                title: "doaisjdiasdjioasda",
                description: "aosidjasiodjasoidas. aisdioas asi sa",
              },
            ]}
            imageSize={{
              lg: "600px",
              md: "390px",
              sm: "220px",
              base: "500px",
            }}
            image="https://dam-cdn.atl.orangelogic.com/AssetLink/737g80fw6ml20lr326ccpphj50d7xex2.webp"
          />
        </Flex>
      </Flex>

      <Card
        w={{
          md: "950px",
          sm: "100%",
          base: "500px",
        }}
        withBorder={false}
        mb={30}
        mt={-40}
        mx={20}
      >
        <Flex justify="space-between" align="center" gap={20}>
          <Flex direction="column" gap={5}>
            <Text size="2xl">
              “If you can’t measure it, you can’t manage it.”
            </Text>

            <Text>Marcelo Grassano</Text>

            <Text>CEO, acdis</Text>

            <Flex gap={10} mt={10}>
              <Button variant="outline">Start your trial now</Button>

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
  );
}
