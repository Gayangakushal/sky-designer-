import { useEffect, useState } from "react";
import { Trash2, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  storage_path: string | null;
  sort_order: number;
}

const BUCKET = "portfolio";

const PortfolioManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("portfolio_items").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems((data ?? []) as Item[]);
  };

  useEffect(() => { void load(); }, []);

  const upload = async () => {
    if (!file || !form.title.trim()) {
      toast({ title: "Add a title and pick a file", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600" });
    if (uploadError) {
      setUploading(false);
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      return;
    }
    const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 365);
    const { data, error } = await supabase
      .from("portfolio_items")
      .insert({
        title: form.title.trim(),
        description: form.description.trim() || null,
        media_url: signed?.signedUrl ?? "",
        media_type: file.type.startsWith("video") ? "video" : "image",
        storage_path: path,
        sort_order: items.length + 1,
      })
      .select()
      .single();
    setUploading(false);
    if (error) {
      toast({ title: "Could not save item", description: error.message, variant: "destructive" });
      return;
    }
    setItems((prev) => [data as Item, ...prev]);
    setForm({ title: "", description: "" });
    setFile(null);
    toast({ title: "Portfolio item added" });
  };

  const remove = async (item: Item) => {
    if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
    await supabase.from("portfolio_items").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    toast({ title: "Portfolio item removed" });
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Portfolio Management</h1>

      <div className="glass-card p-6 mb-8 space-y-3">
        <h3 className="text-foreground font-medium flex items-center gap-2"><Upload size={18} /> Upload media</h3>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="bg-secondary border-border text-foreground" />
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)" className="bg-secondary border-border text-foreground" />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
        />
        <Button onClick={upload} disabled={uploading} className="gap-2">
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />} Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="glass-card overflow-hidden">
            <div className="aspect-[4/3] bg-secondary">
              {item.media_type === "video" ? (
                <video src={item.media_url} className="h-full w-full object-cover" muted playsInline controls />
              ) : (
                <img src={item.media_url} alt={item.title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-foreground font-bold">{item.title}</h3>
              {item.description && <p className="text-muted-foreground text-sm mt-1">{item.description}</p>}
              <Button size="sm" variant="ghost" onClick={() => remove(item)} className="mt-3 text-destructive gap-1">
                <Trash2 size={16} /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-muted-foreground py-8">No portfolio items uploaded yet.</p>}
    </div>
  );
};

export default PortfolioManager;
