import { FC, useMemo } from "react";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { Avatar, Card, Flex, Text } from "@mantine/core";
import { IconCalendar, IconThumbUp } from "@tabler/icons-react";
import { useListCampaign } from "@/apis/campaign.api";
import { Campaign } from "@/declarators";
import { NoContentBlock } from "../no-content-block";
import { groupBy } from "lodash";

export const CardWeekStrategy: FC<{}> = ({}) => {
  const { selectedAccount } = useDashboardContext();

  const { data } = useListCampaign({
    accountId: selectedAccount?.id ?? 0,
    params: {},
  });

  const campaigns = data?.pages.flat();

  const groupedCampaigns = useMemo(() => {
    const arrDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    let response: { [key: string]: any } = {};

    arrDays.forEach((weekDay) => {
      const filteredCampaigns = campaigns?.filter(
        (campaign) => campaign[weekDay]
      );

      response[weekDay] = filteredCampaigns;
    });

    return response;
  }, [campaigns]);

  const publicationChannels = useMemo(() => {
    if(!campaigns){
        return [];
    }

    let response = [];

    campaigns?.forEach(campaign => {
        const profiles = campaign.profiles.map((profile) => profile.channel);

        response.push(profiles);
    })
    
    return response.flat();
  }, [campaigns]);

  const groupedChannels = groupBy(publicationChannels, value => value);
  console.log('campaignscampaigns', groupedChannels)

  if (groupedCampaigns["monday"] === undefined) return null;

  return (
    <Flex gap={20} w="100%">
      <Card withBorder={false} radius="sm" flex={1}>
        <Flex justify="space-between" align="center" mb={10}>
          <Flex align="center" gap={10}>
            <IconCalendar />

            <Text fw={500} size="lg">
              Campaign week strategy
            </Text>
          </Flex>
        </Flex>

        <Flex align="start">
          <Flex direction="column" gap={10} my={20} w="170px">
            <RowKpi label="Active campaigns" value={campaigns?.length ?? "-"} />

            <RowKpi label="Total publications" value={publicationChannels?.length ?? '-'} />

            <RowKpi label="Active channels" value={Object.keys(groupedChannels ?? {})?.length ?? '-'} />
          </Flex>

          <Flex
            flex={1}
            gap={10}
            w="100%"
            ml={20}
            align="start"
            pb={10}
            style={{
              overflowX: "auto",
            }}
          >
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((weekKey) => (
              <Card
                withBorder={false}
                flex={1}
                p={10}
                bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))"
                style={{
                  minWidth: "200px",
                }}
                w={200}
              >
                <Flex flex={1} direction="column" gap={10}>
                  <Text fw={600} size="xs">
                    {weekKey}
                  </Text>

                  {groupedCampaigns[weekKey].map(() => (
                    <CardContent />
                  ))}

                  {groupedCampaigns[weekKey].length === 0 && (
                    <NoContentBlock
                      image="/images/calendar.svg"
                      title={`Schedule ${weekKey}`}
                      description="No publication"
                    />
                  )}
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

const CardContent = () => (
  <Card p={10} radius="sm">
    19:00
    <Text fw={500} size="sm">
      test onl
    </Text>
    <Text fw={500} size="xs">
      Images enabled: No
    </Text>
  </Card>
);

const RowKpi: FC<{ label: string; value: string }> = ({ label, value }) => (
  <Flex justify="space-between" align="start">
    <Flex direction="column">
      <Text size="sm" fw={700}>
        {label}
      </Text>

      <Text size="sm">{value}</Text>
    </Flex>

    <Avatar radius="sm" size="sm">
      <IconThumbUp size="16px" />
    </Avatar>
  </Flex>
);
