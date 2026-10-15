import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Genre } from "@/types";
import { Label } from "@/components/ui/label";

export function PreferenceChips({data, label}: {data: Genre[], label: string}) {
    
    return (
      <section>
        <Label className="pb-2 pt-2 text-md font-sans">{label}</Label>
        <ToggleGroup variant={"default"} orientation="horizontal" className="flex w-full flex-wrap gap-2" defaultSelectedKeys={["none"]}>
        {
            data.map((item) => (
                <ToggleGroupItem size={"lg"} aria-label="liked-preferences" id={item.id} key={item.id} className="border border-white/30 cursor-pointer hover:text-(--color-brand-teal) hover:border-(--color-brand-teal) active:bg-(--color-brand-teal) active:text-white">
                    <p>{item.name}</p>
                </ToggleGroupItem>
            ))
        };
        </ToggleGroup>
      </section>
    )
}