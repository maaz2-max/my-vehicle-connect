import { Phone, MapPin, ShieldOff, MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ContactDetailsProps {
  phoneVisible: boolean;
  locationVisible: boolean;
}

const ContactDetails = ({ phoneVisible, locationVisible }: ContactDetailsProps) => {
  const [showWarning, setShowWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'call' | 'whatsapp'; number: string } | null>(null);

  const primaryPhone = "+918951225584";
  const alternatePhone = "+919108167067";
  const maskedPrimary = "+91 89512XXXXX";
  const maskedAlternate = "+91 91081XXXXX";

  const anyVisible = phoneVisible || locationVisible;

  const handleContactClick = (e: React.MouseEvent, type: 'call' | 'whatsapp', number: string) => {
    e.preventDefault();
    setPendingAction({ type, number });
    setShowWarning(true);
  };

  const handleContinue = () => {
    if (pendingAction) {
      if (pendingAction.type === 'call') {
        window.location.href = `tel:${pendingAction.number}`;
      } else if (pendingAction.type === 'whatsapp') {
        const message = encodeURIComponent("Hi, I am contacting you regarding your vehicle after seeing your details on the Reach.mme display");
        window.location.href = `https://wa.me/${pendingAction.number}?text=${message}`;
      }
    }
    setShowWarning(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setShowWarning(false);
    setPendingAction(null);
  };

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
    <>
      <div className="rounded-lg bg-card p-3 space-y-2">
        {phoneVisible && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Primary</span>
                  <span className="text-sm font-medium text-foreground">{maskedPrimary}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => handleContactClick(e, 'call', primaryPhone)}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground hover:opacity-80 transition-opacity"
                  aria-label="Call primary number"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleContactClick(e, 'whatsapp', primaryPhone)}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-success text-white hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp primary number"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Alternate</span>
                  <span className="text-sm font-medium text-foreground">{maskedAlternate}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => handleContactClick(e, 'call', alternatePhone)}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground hover:opacity-80 transition-opacity"
                  aria-label="Call alternate number"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleContactClick(e, 'whatsapp', alternatePhone)}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-success text-white hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp alternate number"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
        {locationVisible && (
          <button
            onClick={() => {
              const lat = "13.0827";
              const lng = "77.6112";
              window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank");
            }}
            className="w-full text-left flex items-start gap-2.5 text-primary hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-sm">Amar Layout, Bangalore, Karnataka, 560045</span>
          </button>
        )}
      </div>

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Important Notice</AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed">
              Please do not harass, spam, or misuse this contact. Any illegal activities may lead to legal action. Use this number only for genuine work-related purposes. Thank you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContactDetails;
