import { useEffect } from "react";

const dynamicTitle = (title) => {
  useEffect(() => {
    document.title = `WonderKin | ${title}`;
  }, [title]);
};

export default dynamicTitle;
