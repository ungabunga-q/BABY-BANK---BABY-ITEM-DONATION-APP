export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'recipient' | 'charity' | 'admin';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  avatar?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  donor: User;
  status: 'available' | 'reserved' | 'donated';
  urgency: 'low' | 'medium' | 'high';
  ageGroup: string;
  size?: string;
  brand?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  itemId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  item?: Item;
  updatedAt: string;
}