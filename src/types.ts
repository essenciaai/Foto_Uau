export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  subscriptionStatus: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface ProcessedImage {
  id: string;
  userId: string;
  originalUrl: string;
  processedUrl: string;
  prompt?: string;
  createdAt: string;
}
