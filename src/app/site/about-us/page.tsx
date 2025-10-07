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
import { IconDiamond, IconEye } from "@tabler/icons-react";
import Link from "next/link";

export default function AboutUs() {
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
        <Flex w="100%" gap={80}>
          <Flex direction="column" gap={20} justify="center">
            <Text size="40px" fw={700}>
              We help companies to have voice and presence online
            </Text>

            <Flex direction="column" gap={20}>
              <Text size="20px">
                Behind every great human achievement, there is a team.
              </Text>

              <Text size="20px">
                From medicine and space travel, to disaster response and pizza
                deliveries, our products help teams all over the planet advance
                humanity through the power of software.
              </Text>

              <Text size="20px">
                Our mission is to help unleash the potential of every team
                through open work.
              </Text>
            </Flex>
          </Flex>

          <Image w="50%" src="images/header1.png" />
        </Flex>
      </Flex>

      <Flex justify="space-between" w={{ base: "100%", md: "950px" }}>
        {[...Array(5)].map(() => (
          <Image
            w="100px"
            src="https://www.vhv.rs/dpng/d/561-5613230_azure-logo-png-transparent-png.png"
          />
        ))}
      </Flex>

      <Flex justify="center" w="100%" display={{ base: "none", sm: "flex" }}>
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          gap="80px"
          justify="center"
          align="center"
          py={50}
        >
          <Flex w="50%" justify="center">
            <Image
              w="500px"
              src="https://cdn-front.freepik.com/landing-about-us/who/who-01-v3.png?w=1200&h=1920&q=90"
            />
          </Flex>

          <Flex w="50%" justify="center">
            <Flex
              direction="column"
              gap={20}
              style={{
                maxWidth: "400px",
              }}
            >
              <Text size="20px">Who we are</Text>

              <Text size="30px" fw={600}>
                We are cool
              </Text>

              <Text>
                We gather talent and inspiration from creatives all around the
                world –all in one place– and looove it when we help you make
                your great ideas happen.
              </Text>

              <Text>
                We believe in the power of good design and community. Our spirit
                is restless, and our inner joyful rebel says: Don't follow all
                the conventions; rewrite them.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/*  */}
      <Flex
        justify="center"
        w="100%"
        display={{ base: "none", sm: "flex" }}
        bg="violet.1"
      >
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          gap="80px"
          justify="center"
          align="center"
          py={50}
        >
          <Flex w="50%" justify="center">
            <Flex
              direction="column"
              gap={20}
              style={{
                maxWidth: "400px",
              }}
            >
              <Text size="20px">Who we are</Text>

              <Text size="30px" fw={600}>
                We are cool
              </Text>

              <Text>
                We gather talent and inspiration from creatives all around the
                world –all in one place– and looove it when we help you make
                your great ideas happen.
              </Text>

              <Text>
                We believe in the power of good design and community. Our spirit
                is restless, and our inner joyful rebel says: Don't follow all
                the conventions; rewrite them.
              </Text>
            </Flex>
          </Flex>

          <Flex w="50%" justify="center">
            <Image
              w="500px"
              src="https://cdn-front.freepik.com/landing-about-us/what/what-01.png?w=1200&h=1920&q=90"
            />
          </Flex>
        </Flex>
      </Flex>

      {/*  */}
      <Flex direction="column" gap={20} py={50}>
        <Text ta="center" size="20px">
          Who we are
        </Text>

        <Text ta="center" size="30px" fw={600}>
          We are cool
        </Text>

        <Text
          ta="center"
          style={{
            maxWidth: "700px",
          }}
        >
          Yeah, that’s right. We talk to each other openly and honestly. Why?
          Because we care about working in an environment where everyone
          communicates directly and respectfully.
        </Text>
      </Flex>

      <Flex gap={50} justify="center">
        {[...Array(4)].map(() => (
          <Flex direction="column" gap={20} w="230px">
            <Image
              src="https://cdn-front.freepik.com/landing-about-us/values/value-action.png?w=256&h=1920&q=100"
              w="80px"
              mb={10}
            />

            <Text fw={700}>We walk and then we run</Text>

            <Text>
              We like to take it one step at a time. We explore our playground,
              own it, and then expand it to meet new challenges. Each goal sets
              the stage for the next.
            </Text>
          </Flex>
        ))}
      </Flex>

      <Card
        w={{
          md: "950px",
          sm: "100%",
          base: "500px",
        }}
        shadow="lg"
        withBorder={false}
        mb={30}
        mt={70}
        mx={20}
      >
        <Flex justify="space-between" align="center" gap={20}>
          <Flex direction="column" align="center" gap={5}>
            <Text size="2xl" fw={700}>
              “If you can’t measure it, you can’t manage it.”
            </Text>

            <Text>Marcelo Grassano - CEO, acdis</Text>

          </Flex>
            <Flex gap={10} mt={10}>
              <Button radius="sm" size="xs" variant="outline">Start your trial now</Button>

              <Button radius="sm" size="xs">Book a shceudle</Button>
            </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
