import { Siren } from "lucide-react";

const contacts = [
  { label: "Police", number: "100" },
  { label: "Ambulance", number: "108" },
  { label: "Fire", number: "101" },
  { label: "Emergency", number: "112" },
];

const EmergencyContacts = () => {
  return (
    <div className="rounded-lg bg-card p-3 space-y-1.5">
      <div className="flex items-center gap-2">
        <Siren className="w-4 h-4 text-emergency" />
        <span className="text-[10px] uppercase tracking-widest text-emergency font-bold">Emergency</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {contacts.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className="flex items-center justify-between rounded-md bg-secondary px-2.5 py-1.5 hover:bg-accent transition-colors"
          >
            <span className="text-xs text-muted-foreground">{c.label}</span>
            <span className="font-mono font-bold text-emergency text-sm">{c.number}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
