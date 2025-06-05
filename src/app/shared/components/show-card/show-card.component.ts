// src/app/shared/components/show-card/show-card.component.ts
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Show } from "../../../models/show.model";
import { RouterModule } from "@angular/router";
import { FALLBACK_IMAGE } from "../../constants/common.constants";

@Component({
  selector: "app-show-card",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./show-card.component.html",
  styleUrls: ["./show-card.component.css"],
})
export class ShowCardComponent {
  @Input() show!: Show;
  readonly fallbackImg = FALLBACK_IMAGE;

  /**
   * Strips HTML tags and returns text preview (safe for card)
   */
  sanitizeSummary(summary: string | null | undefined): string {
    if (!summary) return "No summary available.";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = summary;
    return tempDiv.textContent?.trim() || "No summary available.";
  }
}
