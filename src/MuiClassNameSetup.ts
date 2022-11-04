import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

ClassNameGenerator.configure(
  // add prefix to avoid collide with chonky
  // https://github.com/TimboKZ/Chonky/issues/161
  (componentName) => {
    if (componentName.includes("DataGrid")) {
      return componentName
    } else {
      return "my-" + componentName
    }
  }
);
