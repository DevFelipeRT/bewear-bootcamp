"use client";

import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import Image from "next/image";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 px-5">
          {isLoading ? (
            <p>Carregando...</p>
          ) : cart?.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                productName={item.productVariant.product.name}
                productVariantName={item.productVariant.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantPriceInCents={item.productVariant.priceInCents}
                quantity={item.quantity}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
