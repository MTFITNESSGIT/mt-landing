export interface TButton {
  background: string;
  text: string;
  textColor: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface TParagraph {
  title: string;
  texts: string[];
  list?: string[];
  Switch: boolean;
}

export interface TPlan {
  background: number;
  title: string;
  price?: number;
  quantity?: number;
  level?: string;
  type?: string;
  category?: string;
}

export interface TVideo {
  experience?: boolean;
  source: string;
  height: string;
  width: string;
  mutedVideo: boolean;
}

export interface TAccordion {
  title: string;
  content: string;
}

type Value = {
  approved: boolean;
  text: string;
};

type Include = {
  approved: boolean;
  text: string;
};

type MuscleOrFat = {
  title: string;
  newPrice: string;
  oldPrice?: string;
  values: Value[];
  includes: Include[];
};

export type TProgram = {
  title: string;
  premium: boolean;
  customized: boolean;
  discount?: string;
  muscle: MuscleOrFat;
  fat: MuscleOrFat;
};

export interface IDownloadFilesButtonProps {
  pathFile: string;
  download: number;
  paymentId: string;
  onProgress: (progress: number) => void;
  progress: number;
}
