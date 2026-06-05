// Maps the prototype's internal `go(view, params)` targets to real URLs.
export function hrefFor(
  view: string,
  params?: { id?: string; filter?: string },
): string {
  if (view.startsWith("ratgeber-")) {
    return `/ratgeber/${view.slice("ratgeber-".length)}`;
  }
  switch (view) {
    case "home":
      return "/";
    case "vergleich":
      return params?.filter ? `/vergleich?filter=${params.filter}` : "/vergleich";
    case "banken":
      return "/steckbriefe";
    case "steckbrief":
      return params?.id ? `/steckbrief/${params.id}` : "/steckbriefe";
    case "ratgeber":
      return "/ratgeber";
    case "transparenz":
      return "/transparenz";
    case "ueber-uns":
      return "/ueber-uns";
    default:
      return "/";
  }
}
