export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: number;
}

export type LinkFormMode = 'create' | 'edit';

export type LinkFormSubmitHandler = (
  link: Omit<LinkItem, 'id' | 'createdAt'> | LinkItem
) => void;