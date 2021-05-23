export const oEEkodes = {
  LC: { color: "black", state: "Line closed" },
  SD: { color: "black", state: "Scheduled downtime" },
  PM: { color: "yellow", state: "Planned maintenance" },
  CL: { color: "orange", state: "Cleaning" },
  CO: { color: "yellow", state: "Change over" },
  PCL: { color: "#ffcc99", state: "Prolonged cleaning" },
  PCO: { color: "#ffcc99", state: "Prolonged change over" },
  MA: { color: "red", state: "Unplanned Maintenance", batch: "NoBatch" },
  OD: { color: "red", state: "Other downtime", batch: "NoBatch" },
  W: { color: "red", state: "Waiting", batch: "Batch" },
  LF: { color: "red", state: "Line failure", batch: "Batch" },
  EF: { color: "red", state: "Equipment failure", batch: "Batch" },
  OT: { color: "#04e304", state: "Production", batch: "Batch" }
};
