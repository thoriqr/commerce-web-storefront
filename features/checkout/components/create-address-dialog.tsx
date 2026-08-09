import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddressForm from "@/features/shipping/components/address-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onCreated: (addressId: number) => void;
};

export function CreateAddressDialog({ open, onOpenChange, onCreated }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>Enter your shipping details below. This address will be used for delivery.</DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <AddressForm key="create" onCancel={() => onOpenChange(false)} onCreated={onCreated} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
