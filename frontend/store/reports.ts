import type { Report } from "types/reports";
import { defineRefStore } from "./lib/defineRefStore";
import {
  fetchRecentReports,
  fetchSolvedReports,
  fetchTopReports,
  fetchUnsolvedReports,
  fetchUserReports,
} from "@/lib/firestore";

export const useReportsStore = defineRefStore("reports", () => {
  const recentReports = ref<Report[]>([]);
  const topReports = ref<Report[]>([]);

  const solvedReports = ref<Report[]>();
  const unsolvedReports = ref<Report[]>();
  const myReports = ref<Report[]>([]);

  async function fetchReports(userId: string) {
    const [recent, top, my, solved, unsolved] = await Promise.all([
      fetchRecentReports(),
      fetchTopReports(),
      fetchUserReports(userId),
      fetchSolvedReports(),
      fetchUnsolvedReports(),
    ]);

    recentReports.value = recent;
    topReports.value = top;
    myReports.value = my;
    solvedReports.value = solved;
    unsolvedReports.value = unsolved;
  }

  return {
    recentReports,
    topReports,
    solvedReports,
    unsolvedReports,
    myReports,
    fetchReports,
  };
});
