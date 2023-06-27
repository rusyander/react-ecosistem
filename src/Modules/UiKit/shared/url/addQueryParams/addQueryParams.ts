type OptionalRecord<K extends keyof any, T> = {
  [P in keyof T]?: T;
};
export function getQueryParams(params: OptionalRecord<string, string>) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, value]) => {
    if (value) {
      searchParams.set(name, value);
    }
  });
  return `?${searchParams.toString()}`;
}

// Функция добавляет параметры в url
export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params));
}
