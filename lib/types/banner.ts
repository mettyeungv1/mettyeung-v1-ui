// Define the banner interface matching your API response
export interface Banner {
    id: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    media: {
      id: string;
      url: string;
      altText?: string | null;
    };
  }