export type Media = {
  description?: string;
  filename: string;
  mimetype: string;
  tags: string[];
  url: string;
}

export type SocialProfile = {
  id: number;
  channel: string;
  profileId: string;
  profileTitle: string;
  secretToken?: string;
  type: string;
};

export type Account = {
  id: number;
  accountName: string;
  additionalInstructions?: string;
  audience?: string;
  description?: string;
  industry: string;
  language: string;
  useEmoji: boolean;
  toneOfVoice?: string;
  createdAt: string;
};

export type Ticket = {
  category: string;
  subject: string;
  message: string;
  status: "opened" | "closed";
  response?: string;
};

////////////////

export type Client = {
  accountId: number;
  id: number;
  name: string;
  phones?: string[];
  emails?: string[];
  websites?: string[];
  status: "active" | "inactive";
  notes?: string;
  projects?: any[];
};

export type ProjectType = "quote" | "item" | "job" | "note";

export type Project = {
  id: number;
  type: ProjectType;
  title: string;
  description?: string;
  notes?: string;
  client?: Client;
};

export type Category = {
  id: number;
  projectId: number;
  title: string;
};

export type Task = {
  id: number;
  categoryId: number;
  title: string;
  description?: string;
  time: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  photo?: string;
  role: string;
  pricePerHour: number;
};

type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type Config = {
  weekBusinessDays: WeekDay[];
  hoursPerDay: number;
};

export type Quote = {
  title: string;
  client_id: string;
  status: "no_content" | "pending" | "sent" | "approved" | "refused";
  project_id: string;
  content_id: string;
};

type ContentType =
  | "Tips & Tricks"
  | "Industry Insight"
  | "Article / Blog Summary"
  | "Quote / Inspiration"
  | "Behind the Scenes"
  | "Poll"
  | "Client Story"
  | "Stats & Data"
  | "Listicle"
  | "Founder's Note";

export type Campaign = {
  id: number;

  createdAt: Date;
  updatedAt: Date;

  enabled: boolean;
  title: string;
  needsApprovation: boolean;
  emailToApprove?: string | null;

  monday?: ContentType | null;
  mondayHour?: string | null;
  mondayConfig?: any;

  tuesday?: ContentType | null;
  tuesdayHour?: string | null;
  tuesdayConfig?: any;

  wednesday?: ContentType | null;
  wednesdayHour?: string | null;
  wednesdayConfig?: any;

  thursday?: ContentType | null;
  thursayHour?: string | null;
  thursayConfig?: any;

  friday?: ContentType | null;
  fridayHour?: string | null;
  fridayConfig?: any;

  saturday?: ContentType | null;
  saturdayHour?: string | null;
  saturdayConfig?: any;

  sunday?: ContentType | null;
  sundayHour?: string | null;
  sundayConfig?: any;

  profiles: number[]; // ou Profiles[], se quiser tipar o objeto inteiro
  accountId: number; // simplificado para id da conta
};

export type CampaignWithProfile = Campaign & {
  profiles: SocialProfile[];
}