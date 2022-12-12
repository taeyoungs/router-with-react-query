interface IRequiredContact {
  id: string;
  favorite: boolean;
  createdAt: number;
}

interface IOptionalContact {
  first: string;
  last: string;
  notes: string;
  twitter: string;
}

interface IContact extends IRequiredContact, Partial<IOptionalContact> {}

export type { IContact };
