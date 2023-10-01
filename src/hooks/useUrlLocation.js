import { useSearchParams } from "react-router-dom";
// using this hook we can get lat and lng values from searchParams
export function useUrlLocation() {
  // getting lat and lng value from search params
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return { lat, lng };
}
