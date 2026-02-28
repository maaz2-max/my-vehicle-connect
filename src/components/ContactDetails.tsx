import { Phone, MapPin, ShieldOff } from "lucide-react";

interface ContactDetailsProps {
  phoneVisible: boolean;
  locationVisible: boolean;
}

const ContactDetails = ({ phoneVisible, locationVisible }: ContactDetailsProps) => {
  const anyVisible = phoneVisible || locationVisible;

  if (!anyVisible) {
    return (
      <div className="rounded-lg bg-card p-3 flex items-start gap-2.5">
        <ShieldOff className="w-4 h-4 text-warning mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-snug">
          User has turned off contact details. They may be driving or vehicle not in use.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-3 space-y-2">
      {phoneVisible && (
        <>
          <a href="tel:+918951225584" className="flex items-center gap-2.5 text-primary hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Primary</span>
              <span className="text-sm font-medium">+91 89512 25584</span>
            </div>
          </a>
          <a href="tel:+919108167067" className="flex items-center gap-2.5 text-primary hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Alternate</span>
              <span className="text-sm font-medium">+91 91081 67067</span>
            </div>
          </a>
        </>
      )}
      {locationVisible && (
        <div className="flex items-start gap-2.5 text-foreground">
          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span className="text-sm">Amar Layout, Bangalore, Karnataka, 560045</span>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
