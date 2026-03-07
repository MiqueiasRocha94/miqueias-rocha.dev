"use client";

import MDEditor from "@uiw/react-md-editor";
import {useEffect, useState} from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    mode?: "live" | "preview";
}

export default function MarkdownEditor({
                                           value,
                                           onChange,
                                           className,
                                           placeholder,
                                           mode = "preview"

                                       }: Props) {
    const [modoCurrent, setMode] = useState<"live" | "preview">(mode);
    useEffect(() => {
        setMode(mode);
    }, [mode]);

    return (
        <div className={className ?? "flex-1 w-full"}>
            <MDEditor
                value={value}
                onFocus={() => setMode("preview")}
                onChange={(val) => onChange(val ?? "")}
                preview={modoCurrent}
                textareaProps={{
                    placeholder
                }}
                height="100%"
            />
        </div>
    );
}