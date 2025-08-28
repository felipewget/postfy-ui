export type Timeline = {
  id: number;
  name: string;
  avatar?: string;
  tasks: { id: number; date: string }[];
};

export type MemberTaskTimelineProps = {
  timeline: Timeline[];
  period: {
    initial: Date;
    final: Date;
  }
};

export type UserTimeline = Timeline & { expanded: boolean };