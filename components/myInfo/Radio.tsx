import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo(props: { gender: string }) {
  return (
    <RadioGroup className="flex" defaultValue={props.gender}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="male" id="r1" />
        <Label htmlFor="r1">男</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="female" id="r2" />
        <Label htmlFor="r2">女</Label>
      </div>
    </RadioGroup>
  );
}
