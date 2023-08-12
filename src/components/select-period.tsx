import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useAppContext from "./app-provider";

export function SelectPeriod() {
  const { year, month, setMonth, setYear } = useAppContext();
  return (
    <div className="flex space-x-4">
      <Select value={month} onValueChange={(e) => setMonth(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>
          <SelectItem value="0">January</SelectItem>
          <SelectItem value="1">February</SelectItem>
          <SelectItem value="2">March</SelectItem>
          <SelectItem value="3">April</SelectItem>
          <SelectItem value="4">May</SelectItem>
          <SelectItem value="5">June</SelectItem>
          <SelectItem value="6">July</SelectItem>
          <SelectItem value="7">August</SelectItem>
          <SelectItem value="8">September</SelectItem>
          <SelectItem value="9">October</SelectItem>
          <SelectItem value="10">November</SelectItem>
          <SelectItem value="11">December</SelectItem>
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={(e) => setYear(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
