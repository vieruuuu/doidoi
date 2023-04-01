import type { Report } from "types/reports";
import { defineRefStore } from "./lib/defineRefStore";
import { fetchRecentReports } from "@/lib/firestore";

export const useReportsStore = defineRefStore("reports", () => {
  const recentReports = ref<Report[]>([]);
  const topReports = ref<Report[]>([]);

  const solvedReports = ref<Report[]>();
  const myReports = ref<Report[]>([]);

  async function fetchReports() {
    recentReports.value = await fetchRecentReports();
  }

  return { recentReports, topReports, solvedReports, myReports, fetchReports };
});
