// components/PasswordOptionSwitch.tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface PasswordOptionSwitchProps {
    label: string
    checked: boolean
    onCheckedChange: (value: boolean) => void
    tooltip?: string
}

export function OptionSwitch({ label, checked, onCheckedChange, tooltip }: PasswordOptionSwitchProps) {
    return (
        <div className="flex items-center space-x-2">
            <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
            <Label htmlFor={label} className="flex items-center gap-1">
                {label}
                {tooltip && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </Label>
        </div>
    )
}
