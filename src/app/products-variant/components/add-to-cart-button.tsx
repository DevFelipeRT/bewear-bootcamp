"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });

  return (
    <Button
      className="rounded-full"
      variant="outline"
      size="lg"
      onClick={() => mutate()}
      disabled={isPending}
    >
        {isPending && (
            <Loader2 className="animate-spin"/>
        )}
      Adicionar ao carrinho
    </Button>
  );
};

export default AddToCartButton;
