import template from 'lodash/template';

export function getMenuItems(config) {
  if (!config || !config.categories || !config.apis) {
    return [];
  }
  const { categories, apis } = config;

  const categorizedAPIs = categories
    .map(cat => cat.items)
    .filter(items => items)
    .reduce((result, items) => [...result, ...items], []);

  const uncategorizedItems = Object.keys(apis)
    .filter(api => !categorizedAPIs.includes(api))
    .map(api => ({
      apiName: api,
      title: apis[api].title,
    }));

  const categorizedItems = categories
    .map(cat => {
      if (!cat || !cat.items) {
        return null;
      }
      const subItems = cat.items
        .map(item => {
          if (!apis || !apis[item]) {
            return null;
          }

          return {
            apiName: item,
            title: apis[item].title,
          };
        })
        .filter(item => item);

      return {
        title: cat.title,
        items: subItems,
      };
    })
    .filter(cat => cat);

  return [...uncategorizedItems, ...categorizedItems];
}

export function injectTemplateData(items, context) {
  if (!items || !context) {
    return items;
  }

  return items.map(item => {
    if (typeof item.defaultValue !== 'string') {
      return item;
    }
    try {
      const compiledTemplate = template(item.defaultValue);
      const defaultValueString = compiledTemplate(context);
      let defaultValue = defaultValueString;

      switch (item.type) {
        case 'Number':
          defaultValue = Number(defaultValueString);
          break;
        case 'Boolean':
          defaultValue = Boolean(defaultValueString);
          break;
        case 'Array':
          defaultValue = new Array(...defaultValueString.split(','));
          break;
        default:
          break;
      }

      return { ...item, defaultValue };
    } catch (error) {
      console.info('Cannot parse template', error);
      return item;
    }
  });
}
