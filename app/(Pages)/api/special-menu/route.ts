import { NextResponse } from "next/server";

export const GET = async () => {
  const specialmenu = [
    {
      id: 1,
      food: "Chicken Biryani",
      price: "2000 kg",
      category: "Rice",
      description:
        "An authentic Chicken Biryani recipe with simple, easy-to-follow instructions (no curveballs!) and mouthwatering.",
      image_url:
        "https://media.istockphoto.com/id/501150349/photo/chicken-biryani-11.jpg?s=612x612&w=0&k=20&c=w6mDnUx8MnH3rnP9bR0VfWRwrODcbTz-6U07o3Zrs4o=",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 2,
      food: "Chicken Pulao",
      price: "2000 kg",
      category: "Rice",
      description:
        "A classic Yakhni Chicken Pulao recipe that's truly hard to mess up. This recipe promises deep flavor, tender chicken, and fluffy rice.",
      image_url:
        "https://stewwithsaba.com/wp-content/uploads/2022/12/IMG_0176.jpg",
      rating: 4,
      popular: "Popular",
    },
    {
      id: 3,
      food: "Chicken Qorma",
      price: "1500 kg",
      category: "Curry",
      description:
        "A korma is a meat-based curry dish made using a base of fried onions crushed and yogurt.",
      image_url:
        "https://therecipespk.com/wp-content/uploads/2016/03/pakistani-chicken-korma-recipe.png",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 4,
      food: "Chicken Karahi",
      price: "2200 kg",
      category: "Curry",
      description:
        "Pakistani Chicken Karahi recipe that can be prepared quickly and easily with no finicky steps.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgHU3yJxZcrPgiQBXJlhJkS6sJyi84S741vQ&s",
      rating: 4,
      popular: "Popular",
    },
    {
      id: 5,
      food: "Aloo Masoor Biryani",
      price: "1200 kg",
      category: "Rice",
      description:
        "Masoor ki Biryani is a new way to make biryani at home. It tastes uniquely delicious, and you'll love having it!",
      image_url:
        "https://www.naushkitchenroutine.com/wp-content/uploads/2020/04/IMG_2859.jpg",
      rating: 4,
      popular: "Popular",
    },
    {
      id: 6,
      food: "Beef Aloo Qeema",
      price: "1600 kg",
      category: "Curry",
      description:
        "An authentic Pakistani-style Aloo Keema - Ground Beef and Potato curry. This is an easy, one-pot recipe that's tasty and comforting.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVjGx1uSurM-q2bskUl9TPAQ4NMF6c5Dy7g&s",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 7,
      food: "Galawati Qeema",
      price: "2200 kg",
      category: "Curry",
      description:
        "Dum Keema or Galawat Keema is a simple recipe that includes minced meat marinated in roasted spices. Perfect for anyone craving subtle flavours.",
      image_url: "https://i.ytimg.com/vi/hrWPGOZYWQY/sddefault.jpg",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 8,
      food: "Katte Aloo",
      price: "800 kg",
      category: "Vegetarian",
      description:
        "Khatte Aloo are tangy, spicy potatoes cooked in a mixture of tamarind, coconut, curry leaves, and whole chillies. It's packed with SO much flavour.",
      image_url:
        "https://fatimacooks.net/wp-content/uploads/2019/05/Aloo-Ki-Bhujia-With-Tomatoes-480x270.jpg",
      rating: 3,
      popular: "Popular",
    },
    {
      id: 9,
      food: "Chicken Shami Kabab",
      price: "800 Dozen",
      category: "Snacks",
      description:
        "A Shami Kebab is a patty made out of meat and lentils. Chicken, lamb, mutton, beef - you can make a Shami Kebab out of any meat.",
      image_url:
        "https://i.ndtvimg.com/i/2017-12/chicken-shami-kebab_620x350_51513671464.jpg",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 10,
      food: "Beef Shami Kabab",
      price: "1000 kg",
      category: "Snacks",
      description:
        "A Shami Kebab is a patty made out of meat and lentils. Chicken, lamb, mutton, beef - you can make a Shami Kebab out of any meat.",
      image_url: "https://i.ytimg.com/vi/Ya_nw6qH0U0/maxresdefault.jpg",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 11,
      food: "Kheer",
      price: "1200 kg",
      category: "Dessert",
      description:
        "This sweet Pakistani rice pudding is creamy, aromatic and sure to satisfy your sweet tooth.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgVND2oEXlXhpxCvOxRGt8vD_UXwmxaD6IbA&s",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 12,
      food: "Chicken Handi",
      price: "2200 kg",
      category: "Curry",
      description:
        "Boneless chicken cooked with South Asian spices, in a spicy gravy made with onions, tomato and yogurt, topped with cream.",
      image_url:
        "https://tiffinandteaofficial.com/wp-content/uploads/2020/10/Untitled-1-1.jpg",
      rating: 4,
      popular: "Popular",
    },
    {
      id: 13,
      food: "Chicken Mandi Platter (serves 2-3 persons)",
      price: "1200 kg",
      category: "Rice",
      description:
        "This is a traditional Yemeni dish that serves up spiced succulent chicken with perfectly seasoned yellow rice.",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT__pi98Ri3VX1sm4w7kYkZlc5_iOy_H4MV2Q&s",
      rating: 5,
      popular: "Popular",
    },
    {
      id: 14,
      food: "Chicken Shawarma",
      price: "3000 kg",
      category: "Snacks",
      description:
        "A Lebanese-style chicken shawarma. It is the chicken that's marinated in a yogurt-based sauce and roasted on skewers.",
      image_url: "/special-images/shawarma.png",
      rating: 3,
      popular: "Popular",
    },
  ];

  return NextResponse.json(specialmenu);
};
