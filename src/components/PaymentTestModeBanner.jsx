import { getPaddleEnvironment } from "@/lib/paddle";

export function PaymentTestModeBanner() {
  if (getPaddleEnvironment() !== "sandbox") return null;
  return (
    <div className="w-full border-b border-accent/40 bg-accent/15 px-4 py-2 text-center text-sm">
      Vista previa real.
    </div>
  );
}
