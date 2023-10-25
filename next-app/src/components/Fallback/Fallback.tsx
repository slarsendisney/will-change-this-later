import { FaceFrownIcon } from "@heroicons/react/24/solid"

export const Fallback = (): JSX.Element => (
<div className="space-y-4 flex flex-col">
    <FaceFrownIcon className="h-12 w-12 text-gray-400 mx-auto" />
    <p>Sadly we cannot detect the intent of these requests.</p>
    </div>
);