import { useEffect, useState } from "react";
import { getShopByUrl } from "../../share/controllers/firestore";
import { getSessionStorage } from "@/share/utils/sessionStorage";
import { Shop } from "@/share/types/shop";

export const useGetShopByUrl = (url?: string) => {
  const [data, setData] = useState<Shop>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      const session: Shop = getSessionStorage("shopData");
      if (session?.url === url) return setData(session);
      getShopByUrl(url)
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
};
