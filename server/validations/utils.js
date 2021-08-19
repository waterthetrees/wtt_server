function validation(objectIn, key, valueIn) {
  const valueOut = typeof valueIn === 'undefined' ? '' : valueIn;
  return Reflect.has(objectIn, key) ? Reflect.get(objectIn, key) : valueOut;
}

function isString(hopeString) {
  return (typeof hopeString === 'string');
}

function iterateOverObjCheckingForString(obj) {
  const removeMe = 'idTree';
  const { [removeMe]: removedKey, ...newObjWithoutId } = obj;
  // eslint-disable-next-line no-unused-vars
  return Object.entries(newObjWithoutId).every(([key, value]) => isString(value));
}

module.exports = {
  validation,
  isString,
  iterateOverObjCheckingForString
}
