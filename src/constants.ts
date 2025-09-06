export type Client = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
};

export type ProjectType = "quote" | "item" | "job" | "note";

export type Project = {
  id: number;
  type: ProjectType;
  name: string;
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
  hourPerWeek: number;
  pricePerHour: number;
};

export type Quote = {
  title: string;
  client_id: string;
  status: "no_content" | "pending" | "sent" | "approved" | "refused";
  project_id: string;
  content_id: string;
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
