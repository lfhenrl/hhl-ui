import { HHLfetch } from "../utils/HHLfetch";
import { oEEkodes } from "./oeeKodes";
const EventLogs = new HHLfetch("http://localhost:5000/eventlogs");

const oee_cleaning = ["CL", "PCL"];
const oee_ChangeOver = ["CO", "PCO"];
const oee_idle = ["LC", "SD", "PM", "MA", "OD"];
const oee_production = ["W", "LF", "EF", "OT"];

function oeeMainState(kode: any) {
  if (oee_production.includes(kode)) {
    return { name: "Production", color: "#04e304" };
  }

  if (oee_idle.includes(kode)) {
    return { name: "Idle", color: "black" };
  }

  if (oee_ChangeOver.includes(kode)) {
    return { name: "ChangeOver", color: "yellow" };
  }

  if (oee_cleaning.includes(kode)) {
    return { name: "Cleaning", color: "orange" };
  }

  return { name: "Unknown", color: "blueviolet" };
}

export async function getStops(startTime: any, endTime:any) {
  const EventLogsfilter = {
    startTime,
    endTime
  };
  let gData_0 = [];
  let gData_1 = [];

  const endTimeDate = new Date(endTime);
  const startTimeDate = new Date(startTime);

  const def_Batch = {
    name: "Batch",
    start: startTimeDate.valueOf(),
    end: startTimeDate.valueOf()
  };
  gData_0.push(def_Batch);

  const def_State = {
    name: "State",
    start: startTimeDate.valueOf(),
    end: startTimeDate.valueOf()
  };
  gData_1.push(def_State);

  let oldBatchNr = "NA";
  let oldBatchItem: any = {};
  let oldmainState = "NA";
  const D: any = await EventLogs.get("/gantt", EventLogsfilter);
  D.data.forEach((item: any) => {
    const kode = oEEkodes[item.state] || {
      color: "white",
      state: "Unknown"
    };
    let x = new Date(item.event_time).valueOf();
    let x2 = x + item.duration * 1000;

    const endTimeItem = new Date(x2);
    // const startTimeItem = new Date(x);
    x = x.valueOf() < startTimeDate.valueOf() ? startTimeDate.valueOf() : x;
    x2 = x2.valueOf() > endTimeDate.valueOf() ? endTimeDate.valueOf() : x2;

    let line2 = "NA";
    let group = "NA";
    let chosen = "NA";

    group = item.stop_group;
    chosen = item.stop_chosen;

    group = group ?? "NA";
    chosen = chosen ?? "NA";
    if (group !== "NA" || chosen !== "NA") {
      line2 = group + "/" + chosen;
    }

    let batch_id = item.batch_id || "???";
    if (batch_id === "???" && ["CO", "PCO"].includes(item.state)) {
      batch_id = "CO";
    }
    const states = {
      name: "State",
      start: x,
      end: x2,
      color: kode.color,
      batch_id: batch_id,
      headLine: batch_id + "/" + kode.state + " (" + item.state + ")",
      comments: item.stop_comment,
      line2
    };

    gData_1.push(states);

    const mainState = oeeMainState(item.state);
    if ((oldBatchNr !== batch_id && batch_id !== "") || oldBatchNr === "NA" || mainState.name !== oldmainState) {
      let mainState = oeeMainState(item.state);
      oldBatchItem = {
        name: "Batch",
        start: x,
        end: -1,
        batch_id,
        color: mainState.color,
        headLine: batch_id + "/" + mainState.name,
        line2: ""
      };
      oldBatchNr = batch_id;
      // serie 0 Batch
      gData_0.push(oldBatchItem);
    }
    oldmainState = mainState.name;
    oldBatchItem.x2 = x2;
    oldBatchItem.endTime = endTimeItem;
  });
  return { gData_0, gData_1 };
}
