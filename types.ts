
export interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  color: string;
  hasGarden?: boolean;
}

export interface SectionData {
  title: string;
  description: string;
  feature: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
