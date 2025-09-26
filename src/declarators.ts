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
