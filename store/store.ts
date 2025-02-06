import { Food } from "@/sanity/Types/schemasTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  food: Food;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (food: Food) => void;
  removeItem: (foodId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (foodId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [] as BasketItem[],

      addItem: (food: Food) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.food?._id === food._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.food?._id === food._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { food, quantity: 1 }],
            };
          }
        }),

      removeItem: (foodId: string) =>
        set((state) => ({
          items: state.items.reduce((acc: BasketItem[], item: BasketItem) => {
            if (item.food?._id === foodId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, []),
        })),

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.food?.price ?? 0) * item.quantity,
          0
        );
      },

      getItemCount: (foodId: string) => {
        const item = get().items.find((item) => item.food?._id === foodId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    }
  )
);

export default useBasketStore;