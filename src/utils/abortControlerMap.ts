const abortControllerMap =  {} as Record<string, AbortController>;

export const addController = (fileId: string, controller : AbortController) => {
  abortControllerMap[fileId] = controller;
};

export const removeController = (fileId: string) => {
  delete abortControllerMap[fileId];
};

export const abortController = (fileId: string) => {
  const controller = abortControllerMap[fileId];
  if (controller) {
    controller.abort();
    removeController(fileId);
  }
};

export default abortControllerMap;