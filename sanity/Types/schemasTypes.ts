export interface Category_Food {
  name: string;
  slug: string;
};

export interface Chief_Food  {
  name: string;
  bio: string;
};



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

export interface Recipe {
  _id: string;
  title: string;
  slug: { current: string };
  image: {
    asset: {
      url: string ;
    };
  };
  about: string;
  chef: Chef;
  category: Category;
  ingredients: { step: number; items: { name: string; quantity: string }[] }[];
  instructions: string[];
}

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

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  eatType: "solid" | "liquid";
  mealType: "breakfast" | "lunch" | "dinner" | "desserts" | "drinks" | "available-anytime";
}

export interface Chef {
  _id: string;
  name: string;
  bio?: string;
  image: {
    asset: {
      url: string ;
    };
  };
  experience: number;
  country: "Pakistan" | "India" | "Afghanistan" | "Turkey" | "Other";
  rating: "⭐⭐⭐⭐⭐" | "⭐⭐⭐⭐" | "⭐⭐⭐" | "⭐⭐" | "⭐";
}
