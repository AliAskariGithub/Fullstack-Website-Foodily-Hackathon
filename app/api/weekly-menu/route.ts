import { NextResponse } from "next/server";

export const GET = async () => {
  const weeklyMenu = [
    {
      day: "Monday",
      items: [
        { 
          name: "Daal Chawal", 
          price: 300, 
          image: "/weekly-images/daal-chawal.png", 
          description: "A comforting dish of lentils and rice.", 
          rating: 4.2 
        },
        { 
          name: "Chicken Qorma", 
          price: 300, 
          image: "/weekly-images/chicken-qorma.png", 
          description: "Deliciously spiced chicken curry.", 
          rating: 4.5 
        },
        { 
          name: "Mix Sabzi", 
          price: 200, 
          image: "/weekly-images/mix-sabzi.jpg", 
          description: "A mix of seasonal vegetables cooked in spices.", 
          rating: 4.3 
        },
      ],
    },
    {
      day: "Tuesday",
      items: [
        { 
          name: "Aloo Masoor Biryani", 
          price: 250, 
          image: "/weekly-images/aloo-masoor-biryani.jpg", 
          description: "A vegetarian biryani with potatoes and lentils.", 
          rating: 4.4 
        },
        { 
          name: "Aloo Palak", 
          price: 200, 
          image: "/weekly-images/aloo-palak.jpg", 
          description: "Potatoes cooked with spinach and spices.", 
          rating: 4.1 
        },
        { 
          name: "Beef Aloo Gosht", 
          price: 350, 
          image: "/weekly-images/beef-aloo-gosht.jpg", 
          description: "Tender beef and potatoes cooked in rich spices.", 
          rating: 4.6 
        },
      ],
    },
    {
      day: "Wednesday",
      items: [
        { 
          name: "Chicken Karahi", 
          price: 300, 
          image: "/weekly-images/chicken-karahi.jpg", 
          description: "Spicy chicken curry cooked in a wok.", 
          rating: 4.7 
        },
        { 
          name: "Anda Garebi", 
          price: 200, 
          image: "/weekly-images/anda-garebi.jpg", 
          description: "Egg curry cooked with tomatoes and spices.", 
          rating: 4.3 
        },
        { 
          name: "Daal Fry", 
          price: 250, 
          image: "/weekly-images/daal-fry.jpg", 
          description: "Fried lentils cooked in spicy oil.", 
          rating: 4.2 
        },
      ],
    },
    {
      day: "Thursday",
      items: [
        { 
          name: "Anda Gothara", 
          price: 200, 
          image: "/weekly-images/anda-gothara.jpg", 
          description: "A spicy egg curry with rich flavors.", 
          rating: 4.1 
        },
        { 
          name: "Curry Pakora", 
          price: 250, 
          image: "/weekly-images/curry-pakora.jpg", 
          description: "Fried gram flour fritters served with curry.", 
          rating: 4.5 
        },
        { 
          name: "Beef Aloo Qeema", 
          price: 350, 
          image: "/weekly-images/beef-aloo-qeema.jpg", 
          description: "Ground beef cooked with potatoes and spices.", 
          rating: 4.6 
        },
      ],
    },
    {
      day: "Friday",
      items: [
        { 
          name: "Chicken Biryani", 
          price: 350, 
          image: "/weekly-images/chicken-biryani.jpg", 
          description: "A flavorful rice dish with tender chicken pieces.", 
          rating: 4.7 
        },
        { 
          name: "Chicken Handi", 
          price: 400, 
          image: "/weekly-images/chicken-handi.jpg", 
          description: "A rich chicken curry cooked in a clay pot.", 
          rating: 4.8 
        },
        { 
          name: "Kheer", 
          price: 200, 
          image: "/weekly-images/kheer.jpg", 
          description: "A creamy rice pudding dessert.", 
          rating: 4.3 
        },
      ],
    },
    {
      day: "Saturday",
      items: [
        { 
          name: "Palak Chicken", 
          price: 300, 
          image: "/weekly-images/palak-chicken.jpg", 
          description: "Spinach cooked with tender chicken pieces.", 
          rating: 4.5 
        },
        { 
          name: "Chicken Khawsay", 
          price: 350, 
          image: "/weekly-images/chicken-khawsay.jpg", 
          description: "A traditional chicken noodle soup.", 
          rating: 4.6 
        },
        { 
          name: "Curry Pakora", 
          price: 250, 
          image: "/weekly-images/curry-pakora.jpg", 
          description: "Gram flour fritters served with curry.", 
          rating: 4.4 
        },
      ],
    },
    {
      day: "Sunday",
      items: [
        { 
          name: "Chicken Palao", 
          price: 300, 
          image: "/weekly-images/chicken-palao.jpg", 
          description: "Aromatic rice with flavorful chicken pieces.", 
          rating: 4.2 
        },
        { 
          name: "Galawati Qeema", 
          price: 400, 
          image: "/weekly-images/galawati-qeema.jpg", 
          description: "Soft and tender minced meat kebabs.", 
          rating: 4.8 
        },
        { 
          name: "Lab-e-Shireen", 
          price: 300, 
          image: "/weekly-images/lab-e-shireen.jpg", 
          description: "A sweet dessert made with milk and dry fruits.", 
          rating: 4.7 
        },
      ],
    },
  ];
  return NextResponse.json(weeklyMenu);
};
