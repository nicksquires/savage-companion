"use client";

import { useRef } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";

export default function DraftHydrator({
  initialData,
  children,
}: {
  initialData: any;
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    // Inject server-fetched data into the store immediately
    useCharacterBuilder.getState().initializeDraft(initialData);
    initialized.current = true;
  }

  return <>{children}</>;
}
