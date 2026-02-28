import { Car } from "lucide-react";

const VehicleInfo = () => {
  return (
    <div className="rounded-lg bg-card p-3 space-y-1.5">
      <div className="flex items-center gap-2">
        <Car className="w-4 h-4 text-primary" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Vehicle Details</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Number</span>
          <span className="font-mono font-semibold text-foreground tracking-wider text-sm">KA 05 MQ 1326</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Model</span>
          <span className="font-medium text-foreground text-sm">Maruti Suzuki Ertiga</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
        Sorry for any inconvenience caused. Thank you for your understanding.
      </p>
    </div>
  );
};

export default VehicleInfo;
