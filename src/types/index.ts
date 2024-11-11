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
