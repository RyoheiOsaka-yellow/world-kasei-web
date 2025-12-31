import React from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  imagePlaceholder: string;
  specs?: {
    cpu: string;
    os: string;
    screen: string;
  };
}

export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum SectionId {
  HERO = 'hero',
  USP = 'usp',
  COMPARISON = 'comparison',
  PRODUCTS = 'products',
  CUSTOMERS = 'customers',
  CTA = 'cta'
}