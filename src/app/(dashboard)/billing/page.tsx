import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["Up to 5 affiliate links", "Basic analytics", "Email support"],
    current: true,
  },
  {
    name: "Pro",
    price: 29,
    features: [
      "Unlimited affiliate links",
      "Advanced analytics",
      "Priority support",
      "Custom domains",
      "API access",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: 99,
    features: [
      "Everything in Pro",
      "Custom solutions",
      "Dedicated account manager",
      "SLA",
      "Custom integrations",
    ],
    current: false,
  },
];

export default function Billing() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Billing</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.current ? "border-blue-500" : ""}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>${plan.price}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6">
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
