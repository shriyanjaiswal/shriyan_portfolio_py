import { Toaster as Sonner, toast } from "sonner"
import { useEffect, useState } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')

    useEffect(() => {
        // Simple theme detection
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(isDark ? 'dark' : 'dark') // Force dark theme since we want dark UI
    }, [])

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-gray-900/95 group-[.toaster]:text-white group-[.toaster]:border-purple-500/30 group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-xl",
                    description: "group-[.toast]:text-gray-300",
                    actionButton:
                        "group-[.toast]:bg-purple-600 group-[.toast]:text-white group-[.toast]:hover:bg-purple-700",
                    cancelButton:
                        "group-[.toast]:bg-gray-700 group-[.toast]:text-gray-300 group-[.toast]:hover:bg-gray-600",
                    success: "group-[.toast]:bg-green-900/90 group-[.toast]:text-green-100 group-[.toast]:border-green-500/30",
                    error: "group-[.toast]:bg-red-900/90 group-[.toast]:text-red-100 group-[.toast]:border-red-500/30",
                    warning: "group-[.toast]:bg-yellow-900/90 group-[.toast]:text-yellow-100 group-[.toast]:border-yellow-500/30",
                    info: "group-[.toast]:bg-blue-900/90 group-[.toast]:text-blue-100 group-[.toast]:border-blue-500/30",
                },
            }}
            {...props}
        />
    )
}

export { Toaster, toast }