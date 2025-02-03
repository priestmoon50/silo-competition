export interface Silo {
  id: number;
  title: string;
  location: string;
  status: "free" | "reserved";
  remaining_time: number;
}

export const mockSilos: Silo[] = [
  {
    id: 1,
    title: "سیلوی تهران",
    location: "Tehran",
    status: "free",
    remaining_time: 2,
  },
  {
    id: 2,
    title: "سیلوی اصفهان",
    location: "Isfahan",
    status: "free",
    remaining_time: 2,
  },
  {
    id: 3,
    title: "سیلوی شیراز",
    location: "Shiraz",
    status: "reserved",
    remaining_time: 2,
  },
];