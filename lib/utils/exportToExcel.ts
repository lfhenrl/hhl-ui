export default {
  // Fields should be a array of object with {field: string, type: string, title: string}
  load(jSONData: any, fields: any[], reportTitle: string) {
    // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    const arrData = typeof jSONData !== "object" ? JSON.parse(jSONData) : jSONData;

    let CSV = "sep=;" + "\r\n\n";

    // This generate the Label/Header
    let header = "";

    // This loop will extract the label from 1st index of on array
    fields.forEach((x: any) => {
      header += x.title + ";";
    });

    header = header.slice(0, -1);

    // append Label row with line break
    CSV += header + "\r\n";

    // 1st loop is to extract each row
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrData.length; i++) {
      let row = "";

      // 2nd loop will extract each column and convert it in string comma-seprated
      fields.forEach((x: any) => {
        const typ = x.type || "string";
        const dataField = arrData[i][x.field];

        if (typ === "number") {
          if (dataField) {
            let val = dataField.toString().replace(".", ",");
            val = val === "" ? "0" : val;
            row += val + ";";
          } else {
            row += "0;";
          }
        }
        if (typ === "string") {
          if (dataField) {
            row += '"' + dataField.toString() + '";';
          } else {
            row += ";";
          }
        }
        if (typ === "bool") {
          if (dataField) {
            row += "TRUE;";
          } else if (dataField === false) {
            row += "FALSE;";
          } else {
            row += ";";
          }
        }
        if (typ === "date" || typ === "datetime") {
          if (dataField) {
            const D = new Date(dataField);
            // tslint:disable-next-line:max-line-length
            const DD = `${D.getFullYear()}-${
              D.getMonth() + 1
            }-${D.getDate()} ${D.getHours()}:${D.getMinutes()}:${D.getSeconds()};`;
            row += DD;
          } else {
            row += ";";
          }
        }
      });

      row.slice(0, row.length - 1);

      // add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV === "") {
      alert("Invalid data");
      return;
    }

    // Generate a file name
    let fileName = "MyReport_";
    // this will remove the blank-spaces from the title and replace it with an underscore
    fileName += reportTitle.replace(/ /g, "_");

    // Initialize file format you want csv or xls
    const uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    // this trick will generate a temp <a /> tag
    const link: any = document.createElement("a");
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
