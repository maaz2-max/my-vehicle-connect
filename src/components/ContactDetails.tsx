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
        <a href="tel:+919876543210" className="flex items-center gap-2.5 text-primary hover:opacity-80 transition-opacity">
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">+91 98765 43210</span>
        </a>
      )}
      {locationVisible && (
        <div className="flex items-center gap-2.5 text-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">Hubli, Karnataka</span>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
