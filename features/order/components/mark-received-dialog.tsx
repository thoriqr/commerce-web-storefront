"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useConfirmDeliver } from "../hooks/use-confirm-deliver";
import { toast } from "sonner";
import { QUERY_KEYS } from "../constants";
import { showRequestErrorToast } from "@/shared/lib/show-request-error-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MarkReceivedDialog({ orderCode }: { orderCode: string }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const confirmDeliverMutation = useConfirmDeliver({
    onSuccess: () => {
      toast.success("Thanks! Order marked as received 📦");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, orderCode]
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS]
      });

      setOpen(false);
    },

    onError: (error) => {
      showRequestErrorToast(error);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Mark as Received</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark this order as received?</DialogTitle>

          <DialogDescription>Make sure you have received the package before confirming. This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={confirmDeliverMutation.isPending}>
              Not yet
            </Button>
          </DialogClose>

          <Button size="sm" disabled={confirmDeliverMutation.isPending} onClick={() => confirmDeliverMutation.mutate(orderCode)}>
            {confirmDeliverMutation.isPending ? "Processing..." : "Yes, I've received it"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
