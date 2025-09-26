export type AddDocumentByLinkPayload = {
  sourceType: "knowledment" | "brain";
  link: string;
};

export type AddDocumentByContentPayload = {
  sourceType: "knowledment" | "brain";
  title: string;
  content: string;
};

export type AddDocumentByDocumentPayload = {
  sourceType: "knowledment" | "brain";
  file: File
};
