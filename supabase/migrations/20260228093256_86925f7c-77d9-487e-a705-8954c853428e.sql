-- Simple table to store toggle preferences (no auth needed, public access)
CREATE TABLE public.toggle_settings (
  id TEXT NOT NULL DEFAULT 'default' PRIMARY KEY,
  phone_visible BOOLEAN NOT NULL DEFAULT false,
  location_visible BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.toggle_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (QR code scanners)
CREATE POLICY "Anyone can read toggle settings" ON public.toggle_settings
  FOR SELECT USING (true);

-- Allow anyone to update (PIN-protected in app)
CREATE POLICY "Anyone can update toggle settings" ON public.toggle_settings
  FOR UPDATE USING (true);

-- Insert default row
INSERT INTO public.toggle_settings (id, phone_visible, location_visible) 
VALUES ('default', false, false);