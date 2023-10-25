import { FaceFrownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const recognizedIntents = [
  "PRODUCT_SEARCH",
  "CUSTOMER_SUPPORT",
  "PRESS",
  "SERVICE",
  "NAVIGATION",
  "FALLBACK",
];

const BadgeTypesAndLabels: any = {
  PRODUCT_SEARCH: {
    className: "badge-success",
    label: "Product Search",
    Icon: MagnifyingGlassIcon,
  },
  CUSTOMER_SUPPORT: {
    className: "badge-warning",
    label: "Customer Support",
    Icon: MagnifyingGlassIcon,
  },
  PRESS: {
    className: "badge-accent",
    label: "Press",
    Icon: MagnifyingGlassIcon,
  },
  SERVICE: {
    className: "badge-info",
    label: "Service",
    Icon: MagnifyingGlassIcon,
  },
  NAVIGATION: {
    className: "badge-primary",
    label: "Navigation",
    Icon: MagnifyingGlassIcon,
  },
  FALLBACK: {
    className: "badge-error",
    label: "Fallback",
    Icon: FaceFrownIcon,
  },
};

export const IntentBadge = ({ intent }: { intent: string }): JSX.Element => {
  if (!recognizedIntents.includes(intent)) {
    return <div />;
  }
  const Icon = BadgeTypesAndLabels[intent].Icon;
  return (
    <div className={`badge badge-outline px-2 badge-lg rounded-full mx-auto flex items-center ${BadgeTypesAndLabels[intent].className}`}>
      <Icon className="h-4 w-4 mr-1" />
      {BadgeTypesAndLabels[intent].label}
    </div>
  );
};
