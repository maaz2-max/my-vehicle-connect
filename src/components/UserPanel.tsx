import { useState, useEffect, useCallback, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, LogOut, X } from "lucide-react";

const CORRECT_PIN = "26112002";
const SESSION_TIMEOUT = 60000; // 60 seconds

interface UserPanelProps {
  phoneVisible: boolean;
  locationVisible: boolean;
  onTogglePhone: (val: boolean) => void;
  onToggleLocation: (val: boolean) => void;
}

const UserPanel = ({ phoneVisible, locationVisible, onTogglePhone, onToggleLocation }: UserPanelProps) => {
  const [showPanel, setShowPanel] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setShowPanel(false);
    setPin("");
    setError(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Auto logout after 60s
  useEffect(() => {
    if (authenticated) {
      timerRef.current = setTimeout(logout, SESSION_TIMEOUT);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [authenticated, logout]);

  // Logout on page visibility change (covers refresh)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && authenticated) logout();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [authenticated, logout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
      >
        User Side – Manage Details
      </button>
    );
  }

  if (!authenticated) {
    return (
      <div className="rounded-lg bg-card p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">Enter PIN</span>
          </div>
          <button onClick={() => { setShowPanel(false); setPin(""); setError(false); }}>
            <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(false); }}
            placeholder="••••••••"
            className="h-8 text-sm bg-secondary border-border"
            autoFocus
          />
          <Button type="submit" size="sm" className="h-8 px-3 text-xs">
            Unlock
          </Button>
        </form>
        {error && <p className="text-[10px] text-emergency">Incorrect PIN</p>}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">Privacy Controls</span>
        <button onClick={logout} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground">
          <LogOut className="w-3 h-3" />
          Logout
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Phone Number</span>
          <Switch checked={phoneVisible} onCheckedChange={onTogglePhone} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Location</span>
          <Switch checked={locationVisible} onCheckedChange={onToggleLocation} />
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground">Auto-logout in 60s</p>
    </div>
  );
};

export default UserPanel;
