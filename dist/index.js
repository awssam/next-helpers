"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useRouteQuery: () => useRouteQuery
});
module.exports = __toCommonJS(index_exports);

// src/route/use-route-query.ts
var import_react = require("react");
var import_navigation = require("next/navigation");
function useRouteQuery(key, defaultValue) {
  const searchParams = (0, import_navigation.useSearchParams)();
  const router = (0, import_navigation.useRouter)();
  const pathname = (0, import_navigation.usePathname)();
  const currentValue = searchParams.get(key) ?? defaultValue ?? "";
  const setValue = (0, import_react.useCallback)(
    (newValue) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, key, router, pathname]
  );
  return [currentValue, setValue];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useRouteQuery
});
