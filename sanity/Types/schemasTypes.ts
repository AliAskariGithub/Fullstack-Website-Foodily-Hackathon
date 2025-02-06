export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  mealType: string;
  promotions: Array<{
    promotionTitle: string;
    promotionDetails: string;
    discountPercentage: number;
    validUntil: string;
  }>;
  specialOffers: Array<{
    offerTitle: string;
    offerDescription: string;
    offerValidity: string;
  }>;
};

export interface Chief {
  _id: string;
  name: string;
  bio: string;
  image: { asset: { url: string } };
  experience: number;
  country: string;
  rating: string | null;
}

export interface Category_Food {
  name: string;
  slug: string;
};

export interface Chief_Food  {
  name: string;
  bio: string;
};

export interface Food  {
  _id: string;
  name: string;
  slug: string;
  price: number;
  fakePrice: number,
  image: {
    asset: {
      url: string ;
    };
  };
  description: string;
  category: Category_Food;
  chiefs: Chief_Food;
  tags: string[];
  rating: Array<{ reviewerName: string; reviewText: string; rating: number }>;
  discount: number;
  stockQuantity: number;
  availability: boolean;
};

export interface Order {
  _id: string;
  _type: 'order';
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    food: { _ref: string; _type: 'reference' };
    quantity: number;
    price: number;
    notes?: string;
  }[];
  totalAmount: number;
  discount: number;
  tax: number;
  status: 'pending' | 'in_progress' | 'out_for_delivery' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDetails: {
    deliveryAddress: string;
    deliveryTime: string;
    deliveryStatus: 'preparing' | 'out_for_delivery' | 'delivered' | 'failed';
  };
  paymentDetails: {
    paymentMethod: 'cod' | 'online';
    paymentStatus: 'pending' | 'paid' | 'failed';
    transactionId: string;
  };
}

export interface Recipe {
  _id: string;
  _type: 'recipe';
  title: string;
  ingredients: string[];
  instructions: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  category: { _ref: string; _type: 'reference' };
}

export interface SpecialMenu {
  _id: string;
  _type: 'specialmenu';
  food: string;
  slug: { current: string };
  price: number;
  description?: string;
  image?: { asset: { _ref: string }; hotspot: boolean };
  ratings: 'five-star' | 'four-star' | 'three-star' | 'two-star' | 'one-star';
  chief: { _ref: string; _type: 'reference' };
  inStock: boolean;
}