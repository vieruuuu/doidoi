import type { Report } from "types/reports";
import { defineRefStore } from "./lib/defineRefStore";
import { fetchRecentReports, fetchTopReports } from "@/lib/firestore";

export const useReportsStore = defineRefStore("reports", () => {
  const recentReports = ref<Report[]>([]);
  const topReports = ref<Report[]>([]);

  const solvedReports = ref<Report[]>();
  const myReports = ref<Report[]>([]);

  async function fetchReports() {
    const [recent, top] = await Promise.all([
      fetchRecentReports(),
      fetchTopReports(),
    ]);

    recentReports.value = recent;
    topReports.value = top;
  }

  return { recentReports, topReports, solvedReports, myReports, fetchReports };
});
