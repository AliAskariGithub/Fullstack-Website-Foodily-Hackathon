interface itemsType {
    day: string,
    items: [
      { 
        name: string, 
        price: number, 
        image: string, 
        description: string, 
        rating: number,
        popular: string
      }
    ]
}

interface weeklyMenu{
    day: string;
    items: itemsType[];
}

interface MenuItem {
  id: number;
  food: string;
  price: string;
  description: string;
  image_url: string;
  popular: string;
  ratings: number;
}

interface SpecialMenu {
  id: number;
  food: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  popular: string;
  image_url: string;
}

export { itemsType, weeklyMenu, MenuItem, SpecialMenu };
