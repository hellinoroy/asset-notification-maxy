// resources/js/Components/ToggleSwitch.tsx
interface ToggleSwitchProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

export default function ToggleSwitch({ enabled, setEnabled }: ToggleSwitchProps) {
    return (
        <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`}
        >
            <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    );
}
