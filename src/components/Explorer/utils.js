import shortid from 'shortid';
import axios from 'axios';
import UrlPattern from 'url-pattern';

import { METHOD_COLORS, ALLOWED_TYPES } from './constants';

function getDefaultValue(type) {
  switch (type) {
    case 'String':
      return '';
    case 'Number':
      return 0;
    case 'Boolean':
      return false;
    case 'Array':
      return [];
    default:
      return null;
  }
}

function arrayToObject(array) {
  return array.reduce((result, item) => ({ ...result, [item.key]: item.value }), {});
}

export function getColorByMethod(method) {
  return METHOD_COLORS[method && method.toUpperCase()] || '#78909c';
}

export function initBody(bodyConfig) {
  if (!bodyConfig || !bodyConfig.length) {
    return '';
  }

  const body = bodyConfig
    .filter(config => ALLOWED_TYPES.includes(config.type))
    .reduce(
      (result, config) => ({
        ...result,
        [config.key]: config.defaultValue || getDefaultValue(config.type),
      }),
      {}
    );

  return JSON.stringify(body, null, 2);
}

export function initKeyValueItems(items) {
  return items.map(item => ({
    id: shortid.generate(),
    key: item.key,
    value: item.defaultValue,
    description: item.description,
    selected: true,
  }));
}

export function buildRequest({ baseURL, endpoint, method, params, headers, body }) {
  const urlPattern = new UrlPattern(endpoint);
  const parsedHeaders = headers && arrayToObject(headers.filter(header => header.selected));
  const parsedParams =
    params &&
    arrayToObject(params.filter(param => param.selected && !urlPattern.names.includes(param.key)));
  const urlParams =
    params &&
    arrayToObject(params.filter(param => param.selected && urlPattern.names.includes(param.key)));
  const missingNames = urlPattern.names.filter(
    param => !urlParams || !Object.keys(urlParams).includes(param)
  );

  if (missingNames.length) {
    throw new Error(
      `Missing required URL param${missingNames.length > 1 ? 's' : ''}: ${missingNames.join(', ')}`
    );
  }

  const url = urlPattern.stringify(urlParams);

  return () => {
    return axios({
      url,
      baseURL,
      method,
      headers: parsedHeaders,
      params: parsedParams,
      data: body,
    });
  };
}
