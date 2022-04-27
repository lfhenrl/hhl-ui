import { ref, watch } from "vue";

export function themeSelector() {
  const darkTheme = ref(false);

  const storageTheme = localStorage.getItem("hhlThemeDark");
  if (storageTheme) {
    darkTheme.value = storageTheme === "true" ? true : false;
    setTheme();
  }

  watch(darkTheme, () => setTheme());

  function setTheme() {
    if (darkTheme.value === true) {
      localStorage.setItem("hhlThemeDark", "true");
      document.body.classList.add("darkTheme");
    } else {
      localStorage.setItem("hhlThemeDark", "false");
      document.body.classList.remove("darkTheme");
    }
  }

  return darkTheme;
}
