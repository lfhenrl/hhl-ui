const mainRoutes = [
  { path: "/introduction", id: "introduction", name: "Introduction" },
  { path: "/styles", id: "styles", name: "Styles" },
  { path: "/components", id: "components", name: "Components" },
  { path: "/sandbox", id: "sandbox", name: "Sandbox" }
];

const routeLinks: any = {};

function jsUcfirst(string: string) {
  let str = string.charAt(0).toUpperCase() + string.slice(1);
  return str.replaceAll("_", " ");
}

export function makeRouteList(router: any) {
  const list = router.getRoutes();
  list.forEach((item: any) => {
    const linkArr = item.name.split("-");
    const del1 = linkArr[0];
    const del2 = linkArr[1] || "na";
    if (!routeLinks[del1]) {
      routeLinks[del1] = {
        name: jsUcfirst(del1),
        path: "",
        children: []
      };
    }
    if (del2 === "na") {
      routeLinks[del1].path = item.path;
    } else {
      const child = {
        name: jsUcfirst(del2),
        path: item.path
      };
      routeLinks[del1].children.push(child);
    }
  });
}

export function getRouteData() {
  return {
    mainRoutes,
    routeLinks
  };
}
