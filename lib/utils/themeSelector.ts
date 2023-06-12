import { ref, watch } from "vue";

export function themeSelector() {
  const darkTheme = ref(false);
  const loadTheme = ref(false);

  const storageTheme = localStorage.getItem("hhlThemeDark");
  if (storageTheme) {
    darkTheme.value = storageTheme === "true" ? true : false;
    setTheme();
  }

  watch(darkTheme, () => {
    loadTheme.value=false;
    console.log("LOAD: ", loadTheme.value);
    setTheme();
    setTimeout(() => {
      loadTheme.value=true;
      console.log("LOAD: ", loadTheme.value);
    },2000)
   
  });

  function setTheme() {
    if (darkTheme.value === true) {
      localStorage.setItem("hhlThemeDark", "true");
      document.body.classList.add("darkTheme");
    } else {
      localStorage.setItem("hhlThemeDark", "false");
      document.body.classList.remove("darkTheme");
    }

  }

  return {darkTheme,loadTheme};
}
