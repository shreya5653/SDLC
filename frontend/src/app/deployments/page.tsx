"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DeploymentPanel } from "@/components/deployment/deployment-panel";

export default function DeploymentsPage() {
  return (
    <AppShell>
      <div className="p-6">
        <DeploymentPanel />
      </div>
    </AppShell>
  );
}
