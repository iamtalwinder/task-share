import bindClassNames from 'classnames/bind';

const validateClass = (styles, className) => {
  if (!(className in styles)) {
    throw new Error(`Classname ${className} doesn't exist in style file.`);
  }
};

export const styleNames = (styles) => {
  const boundClassNames = bindClassNames.bind(styles);

  if (process.env.NODE_ENV !== 'production') {
    return (...args) => {
      const validate = (arg) => {
        if (typeof arg === 'string') {
          validateClass(styles, arg);
        } else if (typeof arg === 'object' && arg !== null) {
          Object.keys(arg).forEach((key) => validateClass(styles, key));
        }
      };

      args.forEach(validate);

      return boundClassNames(...args);
    };
  }

  return boundClassNames;
};
