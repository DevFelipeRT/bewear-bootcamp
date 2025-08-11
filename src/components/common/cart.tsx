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
        
        <div className="space-y-4">
          {isLoading ? (
            <p>Carregando...</p>
          ) : cart?.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 rounded border p-4"
              >
                <Image
                  src={item.productVariant.imageUrl}
                  alt={item.productVariant.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">
                    {item.productVariant.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.productVariant.name}
                  </p>
                </div>
              </div>
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
