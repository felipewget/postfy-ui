/**
 * Params: React Hook
 * Payload: Payload dispatched to back-end
 */

export type ListRecordPayload = {
  filters?: Record<string, any>;
  search?: string;
  searchFields?: string; // field1,field2,field3
  lastId?: number;
};

export type CreateRecordPayload = Record<string, any>;

export type UpdateRecordPayload = CreateRecordPayload;