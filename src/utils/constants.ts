const idInLocalStorage =
  typeof window !== "undefined"
    ? (localStorage?.getItem("userId") as string)
    : "";
export const USER_ID =
  idInLocalStorage == "xu8K8qJlo7NnolZEdl9pbdi3vGS2"
    ? "pg04fNCoICxrRKjcfZuH"
    : idInLocalStorage;
