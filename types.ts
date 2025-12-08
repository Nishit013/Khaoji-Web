import { LucideIcon } from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureDetail {
  name: string;
  description: string;
  benefits: string[];
}

export interface DetailedFeature {
  category: string;
  items: FeatureDetail[];
  icon: LucideIcon;
}

export interface OutletType {
  name: string;
  image: string;
}