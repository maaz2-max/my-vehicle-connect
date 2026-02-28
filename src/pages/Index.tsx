import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import VehicleInfo from "@/components/VehicleInfo";
import ContactDetails from "@/components/ContactDetails";
import EmergencyContacts from "@/components/EmergencyContacts";
import UserPanel from "@/components/UserPanel";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);

  // Fetch toggle state on load
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("toggle_settings")
        .select("phone_visible, location_visible")
        .eq("id", "default")
        .single();
      if (data) {
        setPhoneVisible(data.phone_visible);
        setLocationVisible(data.location_visible);
      }
    };
    fetchSettings();

    // Realtime subscription
    const channel = supabase
      .channel("toggle-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "toggle_settings" },
        (payload) => {
          const d = payload.new as { phone_visible: boolean; location_visible: boolean };
          setPhoneVisible(d.phone_visible);
          setLocationVisible(d.location_visible);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateToggle = async (field: "phone_visible" | "location_visible", value: boolean) => {
    if (field === "phone_visible") setPhoneVisible(value);
    else setLocationVisible(value);

    await supabase
      .from("toggle_settings")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", "default");
  };

  return (
    <div className="h-full flex flex-col px-4 py-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2">
        <img src={logo} alt="REACH.MME Logo" className="h-8 w-auto" />
        <h1 className="text-sm font-bold text-foreground leading-tight">
          Vehicle Contact<br />Information
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2.5 min-h-0">
        <VehicleInfo />
        <ContactDetails phoneVisible={phoneVisible} locationVisible={locationVisible} />
        <EmergencyContacts />
      </div>

      {/* Footer */}
      <div className="pt-2 text-center">
        <UserPanel
          phoneVisible={phoneVisible}
          locationVisible={locationVisible}
          onTogglePhone={(v) => updateToggle("phone_visible", v)}
          onToggleLocation={(v) => updateToggle("location_visible", v)}
        />
      </div>
    </div>
  );
};

export default Index;
