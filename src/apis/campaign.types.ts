export type ImageConfig = {
  iaGenerated: boolean;
  category?: string;
};

export type DayConfig = {
  imagesEnabled: boolean;
  images: ImageConfig | null;
};

export type CampaignPayload = {
  profiles: number[];
  
  title: string;
  needsApprovation: boolean;
  emailToApprove?: string | null;

  monday?: string | null;
  mondayHour?: string | null;
  mondayConfig?: DayConfig | null;

  tuesday?: string | null;
  tuesdayHour?: string | null;
  tuesdayConfig?: DayConfig | null;

  wednesday?: string | null;
  wednesdayHour?: string | null;
  wednesdayConfig?: DayConfig | null;

  thursday?: string | null;
  thursdayHour?: string | null;
  thursdayConfig?: DayConfig | null;

  friday?: string | null;
  fridayHour?: string | null;
  fridayConfig?: DayConfig | null;

  saturday?: string | null;
  saturdayHour?: string | null;
  saturdayConfig?: DayConfig | null;

  sunday?: string | null;
  sundayHour?: string | null;
  sundayConfig?: DayConfig | null;
};